package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
    Optional<Payment> findByPaymentId(String paymentId);
    List<Payment> findByOrderId(Long orderId);
    Optional<Payment> findByOrderIdAndGatewayOrderId(Long orderId, String gatewayOrderId);
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.customer = :customer")
    double sumAmountByCustomer(@Param("customer") Customer customer);
}
