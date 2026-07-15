package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Booking;
import com.example.coffeeshopproject.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    boolean existsByDateAndTimeAndSlot(LocalDate date, LocalTime time, String slot);
    Optional<Booking>findTopByCustomer_IdOrderByDateDesc(Long customerId);
    long countByCustomer(Customer customer);


}
