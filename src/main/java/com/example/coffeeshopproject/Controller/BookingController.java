package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.BookingDto;
import com.example.coffeeshopproject.Entity.Booking;
import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Repository.BookingRepo;
import com.example.coffeeshopproject.Repository.CustomerRepo;
import com.example.coffeeshopproject.Service.BookingServices;
import com.example.coffeeshopproject.Service.EmailServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private BookingServices bookingService;

    @Autowired
    private EmailServices emailService;



    @PostMapping("/book")
    public ResponseEntity<?> createBooking(@RequestBody BookingDto dto) {
        Optional<Customer> customerOpt = customerRepo.findById(dto.getCustomerId());
        if (customerOpt.isPresent()) {
            boolean slotTaken = bookingRepo.existsByDateAndTimeAndSlot(dto.getDate(), dto.getTime(), dto.getSlot());
            if (slotTaken) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Slot already booked");
            }

            Booking booking = new Booking();
            booking.setDate(dto.getDate());
            booking.setTime(dto.getTime());
            booking.setSlot(dto.getSlot());
            booking.setCustomer(customerOpt.get());
            bookingRepo.save(booking);

            // ✅ Send booking confirmation email
            emailService.sendEmail(
                    customerOpt.get().getEmail(),
                    "Booking Confirmation - Coffee Coop",
                    "Hello " + customerOpt.get().getName() +
                            ", your booking is confirmed for " + dto.getDate() +
                            " at " + dto.getTime() + " in slot " + dto.getSlot() + "."
            );

            return ResponseEntity.ok("Booking successful");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
    }


    @GetMapping("/customer/{id}")
    public ResponseEntity<?> getBookings(@PathVariable Long id) {
        List<Booking> bookings = bookingRepo.findByCustomerId(id);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted");
    }

}
