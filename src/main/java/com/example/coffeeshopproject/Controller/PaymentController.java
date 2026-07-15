package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Entity.Booking;
import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Entity.OrderItem;
import com.example.coffeeshopproject.Entity.Payment;
import com.example.coffeeshopproject.Dto.PaymentInitiateRequest;
import com.example.coffeeshopproject.Dto.PaymentInitiateResponse;
import com.example.coffeeshopproject.Dto.PaymentVerifyRequest;
import com.example.coffeeshopproject.Enum.PaymentStatus;
import com.example.coffeeshopproject.Repository.BookingRepo;
import com.example.coffeeshopproject.Repository.OrderItemRepo;
import com.example.coffeeshopproject.Repository.PaymentRepo;
import com.example.coffeeshopproject.Service.EmailServices;
import com.example.coffeeshopproject.Service.InvoicePdfGenerator;
import com.example.coffeeshopproject.Service.RazorpayPaymentService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private EmailServices emailService;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private PaymentRepo repo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    private final RazorpayPaymentService paymentService;

    public PaymentController(RazorpayPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/initiate")
    public PaymentInitiateResponse initiate(@RequestBody PaymentInitiateRequest req) {
        return paymentService.initiate(req);
    }

    @PostMapping("/verify")
    public Payment verify(@RequestBody PaymentVerifyRequest req) {
        Payment payment = paymentService.verifyAndUpdate(req);

        // ✅ Fetch booking using bookingId
        if (payment.getBookingId() != null) {
            Booking booking = bookingRepo.findById(payment.getBookingId()).orElse(null);
            if (booking != null && booking.getCustomer() != null) {
                Customer customer = booking.getCustomer();

                if (payment.getStatus() == PaymentStatus.SUCCESS) {
                    emailService.sendEmail(
                            customer.getEmail(),
                            "Payment Receipt - Coffee Coop",
                            "Hello " + customer.getName() +
                                    ", your payment of ₹" + payment.getAmount() +
                                    " was successful for booking #" + booking.getId() + "."
                    );
                } else {
                    emailService.sendEmail(
                            customer.getEmail(),
                            "Payment Failed - Coffee Coop",
                            "Hello " + customer.getName() +
                                    ", unfortunately your payment attempt for booking #" +
                                    booking.getId() + " has failed. Please try again."
                    );
                }
            }
        }

        return payment;
    }

    @GetMapping("/invoice/{paymentId}")
    public ResponseEntity<ByteArrayResource> downloadInvoice(@PathVariable Long paymentId) {
        Payment payment = repo.findById(paymentId).orElseThrow();
        List<OrderItem> orderItems = orderItemRepo.findByOrderId(payment.getOrderId());
        byte[] pdfBytes = InvoicePdfGenerator.generateInvoicePdf(payment, orderItems);


        ByteArrayResource resource = new ByteArrayResource(pdfBytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdfBytes.length)
                .body(resource);
    }





    @GetMapping("/ping")
    public String ping() {
        return "ok";
    }
}
