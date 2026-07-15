package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Chef;
import com.example.coffeeshopproject.Entity.Customer;
import com.example.coffeeshopproject.Entity.Order;
import com.example.coffeeshopproject.Entity.Waiter;
import com.example.coffeeshopproject.Enum.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByStatusIn(List<OrderStatus> statuses);
    Optional<Order> findByCustomerAndStatus(Customer customer, OrderStatus status);
    long countByCustomer(Customer customer);
    List<Order> findByChefId(Long chefId);
    long countByChef(Chef chef);
    List<Order> findByWaiterId(Long waiterId);
    long countByWaiter(Waiter waiter);
    Order findByCustomer_IdAndStatus(Long customerId, OrderStatus status);



}
