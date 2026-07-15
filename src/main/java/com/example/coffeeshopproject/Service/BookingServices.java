package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.Booking;
import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Repository.BookingRepo;
import com.example.coffeeshopproject.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServices {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private CustomerRepo customerRepo;

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }


    public long countBookingsByCustomer(Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return bookingRepo.countByCustomer(customer);
    }

}
