package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Entity.*;

import com.example.coffeeshopproject.Repository.*;
import com.example.coffeeshopproject.Service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")

public class AdminController {

    @Autowired private AdminServices adminService;
    @Autowired private CustomerServices customerService;
    @Autowired private ChefServices chefService;
    @Autowired private WaiterServices waiterService;
    @Autowired private BookingServices bookingService;
    @Autowired private AdminRepo adminRepo;
    @Autowired private OrderServices orderservice;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ChefRepo chefRepo;

    @Autowired
    private WaiterRepo waiterRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private EmailServices emailService;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private ReportIssueRepo issueRepo;



    // 🔐 Admin login
   /* @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        boolean success = adminService.loginAdmin(admin.getEmail(), admin.getPassword());
        return success
                ? ResponseEntity.ok("Admin login successful")
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }*/

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        Admin loggedIn = adminService.findByEmailAndPassword(admin.getEmail(), admin.getPassword());
        if (loggedIn != null) {
            return ResponseEntity.ok(loggedIn);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }



    // 👥 Get all users by role
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/chefs")
    public ResponseEntity<List<Chef>> getAllChefs() {
        return ResponseEntity.ok(chefService.getAllChefs());
    }

    @GetMapping("/waiters")
    public ResponseEntity<List<Waiter>> getAllWaiters() {
        return ResponseEntity.ok(waiterService.getAllWaiters());
    }

    @GetMapping("/users")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // 📅 Bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @DeleteMapping("/booking/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted");
    }

    // ➕ Add user to correct table
    @PostMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestBody Admin admin) {
        String role = admin.getRole().toUpperCase();

        // keep raw password for email
        String rawPassword = admin.getPassword();

        switch (role) {

            case "CHEF":
                Chef chef = new Chef();
                chef.setName(admin.getName());
                chef.setEmail(admin.getEmail());
                chef.setPhone(admin.getPhone());
                chef.setRole("CHEF");
                // ✅ store encrypted password
                chef.setPassword(adminService.getPasswordEncoder().encode(rawPassword));
                chefService.saveChef(chef);

                // ✅ send raw password in email
                emailService.sendEmail(
                        chef.getEmail(),
                        "Your Coffee Coop Chef Account",
                        "Hello " + chef.getName() + ",\n\n" +
                                "Your account has been created.\n" +
                                "Username: " + chef.getEmail() + "\n" +
                                "Password: " + rawPassword + "\n\n" +
                                "Please login at: http://localhost:3000/chef/login"
                );

                return ResponseEntity.ok("Chef added successfully");

            case "WAITER":
                Waiter waiter = new Waiter();
                waiter.setName(admin.getName());
                waiter.setEmail(admin.getEmail());
                waiter.setPhone(admin.getPhone());
                waiter.setRole("WAITER");

                // ✅ store encrypted password
                waiter.setPassword(adminService.getPasswordEncoder().encode(rawPassword));
                waiterService.saveWaiter(waiter);

                // ✅ send raw password in email
                emailService.sendEmail(
                        waiter.getEmail(),
                        "Your Coffee Coop Waiter Account",
                        "Hello " + waiter.getName() + ",\n\n" +
                                "Your account has been created.\n" +
                                "Username: " + waiter.getEmail() + "\n" +
                                "Password: " + rawPassword + "\n\n" +
                                "Please login at: http://localhost:3000/waiter/login"
                );

                return ResponseEntity.ok("Waiter added successfully");

            case "ADMIN":
                adminRepo.save(admin);
                return ResponseEntity.ok("Admin added successfully");

            default:
                return ResponseEntity.badRequest().body("Invalid role");
        }
    }

    // 🗑️ Delete user by role
    @DeleteMapping("/delete-customer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @DeleteMapping("/delete-chef/{id}")
    public ResponseEntity<String> deleteChef(@PathVariable Long id) {
        chefService.deleteChef(id);
        return ResponseEntity.ok("Chef deleted successfully");
    }

    @DeleteMapping("/delete-waiter/{id}")
    public ResponseEntity<String> deleteWaiter(@PathVariable Long id) {
        waiterService.deleteWaiter(id);
        return ResponseEntity.ok("Waiter deleted successfully");
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        adminRepo.deleteById(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }

    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("customers", customerRepo.count());
        stats.put("chefs", chefRepo.count());
        stats.put("waiters", waiterRepo.count());
        stats.put("bookings", bookingRepo.count());
        stats.put("orders",orderRepo.count());
        stats.put("feedbackCount", feedbackRepo.count());   // ✅ NEW
        stats.put("issueCount", issueRepo.count());
        return stats;
    }
    @GetMapping("/earnings")
    public ResponseEntity<Double> getTotalEarnings() {
        double earnings = orderservice.calculateTotalEarnings();
        return ResponseEntity.ok(earnings);
    }

    @GetMapping("/customers/count")
    public ResponseEntity<Long> getCustomerCount() {
        return ResponseEntity.ok(customerRepo.count());
    }

    @GetMapping("/chefs/count")
    public ResponseEntity<Long> getChefCount() {
        return ResponseEntity.ok(chefRepo.count());
    }

    @GetMapping("/waiters/count")
    public ResponseEntity<Long> getWaiterCount() {
        return ResponseEntity.ok(waiterRepo.count());
    }

    @GetMapping("/bookings/count")
    public ResponseEntity<Long> getBookingCount() {
        return ResponseEntity.ok(bookingRepo.count());
    }

    @GetMapping("/orders/count")
    public ResponseEntity<Long> getOrderCount() {
        return ResponseEntity.ok(orderRepo.count());
    }

    @GetMapping("/feedbacks")
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @PostMapping("/feedbacks")
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @GetMapping("/issues")
    public List<ReportIssue> getAllIssues() {
        return issueRepo.findAll();
    }

    @PostMapping("/issues")
    public ReportIssue submitIssue(@RequestBody ReportIssue issue) {
        issue.setTimestamp(LocalDateTime.now());
        return issueRepo.save(issue);
    }

}
