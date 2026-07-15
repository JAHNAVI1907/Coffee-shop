package com.example.coffeeshopproject.Entity;

import com.example.coffeeshopproject.Enum.OrderStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private LocalDateTime orderTime;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "chef_id")
    private Chef chef;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<OrderItem> items;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    // ✅ NEW: relation to Customer (fix for setCustomer error)
    @ManyToOne
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "waiter_id")
    private Waiter waiter;

    private double totalAmount;

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }


    public Chef getChef() {
        return chef;
    }

    public void setChef(Chef chef) {
        this.chef = chef;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    // ✅ NEW: Getter & Setter for Customer
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
        // optional: also keep customerName in sync
        if (customer != null) {
            this.customerName = customer.getName();
        }
    }


}
