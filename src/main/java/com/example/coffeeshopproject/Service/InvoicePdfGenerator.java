package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.Payment;
import com.example.coffeeshopproject.Entity.OrderItem; // assume you have this
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import java.io.ByteArrayOutputStream;
import java.util.List;

public class InvoicePdfGenerator {

    public static byte[] generateInvoicePdf(Payment payment, List<OrderItem> items) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Header
            document.add(new Paragraph("☕ Coffee Coop Invoice")
                    .setBold()
                    .setFontSize(20));

            document.add(new Paragraph("Order ID: " + payment.getOrderId()));
            document.add(new Paragraph("Booking ID: " + payment.getBookingId()));
            document.add(new Paragraph("Payment ID: " + payment.getPaymentId()));
            document.add(new Paragraph("Receipt: " + payment.getReceipt()));
            document.add(new Paragraph("Status: " + payment.getStatus()));
            document.add(new Paragraph("\n"));

            // Items Table (no UnitValue)
            Table table = new Table(new float[]{4, 2, 2, 2});
            table.useAllAvailableWidth();

            table.addHeaderCell("Item Name");
            table.addHeaderCell("Qty");
            table.addHeaderCell("Price");
            table.addHeaderCell("Total");

            for (OrderItem item : items) {
                table.addCell(item.getMenuItem().getName());
                table.addCell(String.valueOf(item.getQuantity()));
                table.addCell("₹" + item.getMenuItem().getPrice());
                table.addCell("₹" + (item.getMenuItem().getPrice() * item.getQuantity()));
            }

            document.add(table);

            // Summary
            double subtotal = items.stream()
                    .mapToDouble(i -> i.getMenuItem().getPrice() * i.getQuantity())
                    .sum();
            document.add(new Paragraph("\nSubtotal: ₹" + subtotal));
            document.add(new Paragraph("Taxes: ₹10")); // example
            document.add(new Paragraph("Grand Total: ₹" + payment.getAmount() + " " + payment.getCurrency()));

            // Footer
            document.add(new Paragraph("\nThank you for your order!").setBold());

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating invoice PDF", e);
        }
    }
}
