package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Dto.CustomerProfileDto;
import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class CustomerServices {

    @Autowired
    private CustomerRepo customerRepo;

    // ✅ Register a new customer
    public String registerCustomer(Customer customer) {
        customer.setPassword(new BCryptPasswordEncoder().encode(customer.getPassword()));
        customerRepo.save(customer);
        return "Customer registered successfully";
    }

    // ✅ Login validation
    public boolean loginCustomer(String email, String rawPassword) {
        Optional<Customer> customerOpt = customerRepo.findByEmail(email);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            return new BCryptPasswordEncoder().matches(rawPassword, customer.getPassword());
        }
        return false;
    }

   // ✅ Get customer profile by ID
    public Customer getCustomerById(Long id) {
        return customerRepo.findById(id).orElse(null);
    }
//you added this
public Customer getCustomerByEmail(String email) {
    return customerRepo.findByEmail(email).orElse(null);
}




    // ✅ Update customer profile
    public String updateCustomerProfile(Long id, CustomerProfileDto dto) {
        Optional<Customer> customerOpt = customerRepo.findById(id);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            customer.setName(dto.getName());
            customer.setEmail(dto.getEmail());
            customer.setPhone(dto.getPhone());
            customerRepo.save(customer);
            return "Profile updated successfully";
        }
        return "Customer not found";
    }

    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    public void deleteCustomer(Long id) {
        customerRepo.deleteById(id);
    }

    public void saveCustomer(Customer customer) {
        customerRepo.save(customer);
    }

}
