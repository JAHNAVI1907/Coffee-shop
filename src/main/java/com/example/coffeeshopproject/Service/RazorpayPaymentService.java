package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Entity.OrderItem;
import com.example.coffeeshopproject.Entity.Payment;
import com.example.coffeeshopproject.Enum.PaymentStatus;
import com.example.coffeeshopproject.Repository.CustomerRepo;
import com.example.coffeeshopproject.Repository.OrderItemRepo;
import com.example.coffeeshopproject.Repository.PaymentRepo;
import com.example.coffeeshopproject.Dto.PaymentInitiateRequest;
import com.example.coffeeshopproject.Dto.PaymentInitiateResponse;
import com.example.coffeeshopproject.Dto.PaymentVerifyRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RazorpayPaymentService {

    private final PaymentRepo repo;

    @Value("${payments.razorpay.keySecret}")
    private String keySecret;

    @Autowired
    private EmailServices emailService;

    @Autowired
    private CustomerRepo customerRepo;

    @Value("${payments.razorpay.keyId}")
    private String keyId;

    @Autowired
    private OrderItemRepo orderItemRepo;

    public RazorpayPaymentService(PaymentRepo repo) {
        this.repo = repo;
    }

    public double totalAmountSpent(Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return repo.sumAmountByCustomer(customer);
    }


    @Transactional
    public PaymentInitiateResponse initiate(PaymentInitiateRequest req) {
        try {
            RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", req.getAmount().multiply(BigDecimal.valueOf(100))); // amount in paise
            orderRequest.put("currency", req.getCurrency() != null ? req.getCurrency() : "INR");

            String receipt = "rcpt_" + UUID.randomUUID().toString().substring(0, 8);
            orderRequest.put("receipt", receipt);

            Order order = razorpay.orders.create(orderRequest);
            String gatewayOrderId = order.get("id");

            Payment payment = new Payment();
            payment.setOrderId(req.getOrderId());
            payment.setBookingId(req.getBookingId());
            payment.setAmount(req.getAmount());
            payment.setCurrency(orderRequest.getString("currency"));
            payment.setGateway("RAZORPAY");
            payment.setReceipt(receipt);
            payment.setStatus(PaymentStatus.INITIATED);
            payment.setCreatedAt(OffsetDateTime.now());
            payment.setUpdatedAt(OffsetDateTime.now());
            payment.setGatewayOrderId(gatewayOrderId);
            payment.setCustomer(customerRepo.findById(req.getCustomerId())
                    .orElseThrow(() -> new IllegalArgumentException("Customer not found")));

            repo.save(payment);

            PaymentInitiateResponse resp = new PaymentInitiateResponse();
            resp.setGatewayOrderId(gatewayOrderId);
            resp.setCurrency(payment.getCurrency());
            resp.setAmountInPaise(orderRequest.getLong("amount"));
            resp.setReceipt(receipt);
            return resp;

        } catch (Exception e) {
            throw new RuntimeException("Error creating Razorpay order", e);
        }
    }

    @Transactional
    public Payment verifyAndUpdate(PaymentVerifyRequest req) {
        String payload = req.getGatewayOrderId() + "|" + req.getGatewayPaymentId();
        String expectedSignature = hmacSha256(payload, keySecret);

        Payment payment = repo.findByOrderIdAndGatewayOrderId(req.getOrderId(), req.getGatewayOrderId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "No matching payment record found for orderId=" + req.getOrderId() +
                                " and gatewayOrderId=" + req.getGatewayOrderId()
                ));

        System.out.println("Expected: " + expectedSignature);
        System.out.println("Received: " + req.getSignature());
        System.out.println("Data used: " + payload);

        if (expectedSignature.equals(req.getSignature())) {
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setPaymentId(req.getGatewayPaymentId());

            // ✅ Generate PDF invoice and send email
            List<OrderItem> orderItems = orderItemRepo.findByOrderId(payment.getOrderId());
            byte[] pdfBytes = InvoicePdfGenerator.generateInvoicePdf(payment, orderItems);
            if (payment.getCustomer() != null) {
                emailService.sendEmailWithAttachment(
                        payment.getCustomer().getEmail(),
                        "Payment Invoice - Coffee Coop",
                        "Please find your invoice attached.",
                        "invoice.pdf",
                        pdfBytes
                );
            }
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }

        payment.setUpdatedAt(OffsetDateTime.now());
        return repo.save(payment);
    }

    private String hmacSha256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec =
                    new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error generating HMAC SHA256 signature", e);
        }
    }
}
