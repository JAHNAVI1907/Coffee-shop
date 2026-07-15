package com.example.coffeeshopproject.Service;


import com.example.coffeeshopproject.Entity.*;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ChefRepo chefRepo;

    @Autowired
    private WaiterRepo waiterRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OrderRepo orderRepo;


    public Object login(String email, String password) {
        Optional<Customer> customerOpt = customerRepo.findByEmail(email);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            if (passwordEncoder.matches(password, customer.getPassword())) {
                customer.setRole("CUSTOMER");

                Order cart = orderRepo.findByCustomer_IdAndStatus(customer.getId(), OrderStatus.CART);
                if (cart != null && cart.getItems() != null) {
                    cart.getItems().clear();
                    orderRepo.save(cart);
                }


                return customer;
            }
        }

        // Try Chef
        Optional<Chef> chefOpt = chefRepo.findByEmail(email);
        if (chefOpt.isPresent()) {
            Chef chef = chefOpt.get();
            if (passwordEncoder.matches(password, chef.getPassword())) {
                chef.setRole("CHEF");
                return chef;
            }
        }

// Try Waiter
        Optional<Waiter> waiterOpt = waiterRepo.findByEmail(email);
        if (waiterOpt.isPresent()) {
            Waiter waiter = waiterOpt.get();
            if (passwordEncoder.matches(password, waiter.getPassword())) {
                waiter.setRole("WAITER");
                return waiter;
            }
        }



        return null;
    }
}

