package com.example.coffeeshopproject.Dto;

import com.example.coffeeshopproject.Entity.OrderItem;
import java.util.List;

public class OrderRequest {
    private Long customerId;
    private Long bookingId;
    private List<OrderItem> items;

    // --- Getters and Setters ---
    public Long getCustomerId() {
        return customerId;
    }
    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getBookingId() {
        return bookingId;
    }
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public List<OrderItem> getItems() {
        return items;
    }
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
