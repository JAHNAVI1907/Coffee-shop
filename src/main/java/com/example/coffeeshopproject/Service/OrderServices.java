package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.*;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class OrderServices {

    @Autowired
    private OrderRepo repo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ChefRepo chefRepo;

    @Autowired
    private WaiterRepo waiterRepo;


    /*public Order placeOrder(Order order) {
        order.setOrderTime(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        // ✅ Attach latest booking for this customer
        Booking latestBooking = bookingRepo.findTopByCustomerNameOrderByDateDescTimeDesc(order.getCustomerName());
        order.setBooking(latestBooking);

        return repo.save(order);
    }*/


    public List<Order> getAllOrders() {
        return repo.findAll();
    }

    public Order getOrderById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public long countOrdersByCustomer(Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return repo.countByCustomer(customer);
    }


   /* @Transactional
    public Order updateOrderStatus(Long id, OrderStatus newStatus) {
        Order order = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (newStatus == OrderStatus.SERVED) {
            if (order.getStatus() != OrderStatus.FINISHED) {
                throw new IllegalStateException("Only finished orders can be marked as served.");
            }
        }

        order.setStatus(newStatus);
        return repo.save(order);
    }*/



    /*public List<Order> getOrdersByStatus(OrderStatus status) {
        return repo.findByStatus(status);
    }*/

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return repo.findByStatus(status);
    }

    public List<Order> getChefOrders() {
        return repo.findByStatusIn(List.of(OrderStatus.PENDING, OrderStatus.IN_PROGRESS));
    }

    public List<Order> getWaiterOrders() {
        return repo.findByStatus(OrderStatus.FINISHED);
    }

    public Order updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = repo.findById(orderId).orElseThrow();
        order.setStatus(newStatus);
        return repo.save(order);
    }

    public Order saveOrder(Order order) {
        // ✅ Ensure each item knows its parent order
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        return repo.save(order);
    }

    public Order placeOrder(Long customerId, Long bookingId, List<OrderItem> items) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Order order = new Order();
        order.setCustomer(customer);        // ✅ attach full Customer entity
        order.setCustomerName(customer.getName()); // optional if you keep a name field
        order.setBooking(booking);          // ✅ attach Booking entity
        order.setStatus(OrderStatus.PENDING);
        order.setOrderTime(LocalDateTime.now());

        for (OrderItem item : items) {
            item.setOrder(order);           // ✅ link items to parent order
        }
        order.setItems(items);

        return repo.save(order);
    }

    // ✅ Get all orders assigned to a specific chef
        public List<Order> getOrdersByChef(Long chefId) {
            return repo.findByChefId(chefId);
        }

        // ✅ Count orders assigned to a chef
        public long countOrdersByChef(Long chefId) {
            Chef chef = chefRepo.findById(chefId)
                    .orElseThrow(() -> new RuntimeException("Chef not found"));
            return repo.countByChef(chef);
        }

        // ✅ Update order status controlled by chef
        public Order updateChefOrderStatus(Long orderId, OrderStatus newStatus) {
            Order order = repo.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            // enforce valid transitions
            if (newStatus == OrderStatus.IN_PROGRESS && order.getStatus() == OrderStatus.PENDING) {
                order.setStatus(OrderStatus.IN_PROGRESS);
            } else if (newStatus == OrderStatus.FINISHED && order.getStatus() == OrderStatus.IN_PROGRESS) {
                order.setStatus(OrderStatus.FINISHED);
            } else {
                throw new IllegalStateException("Invalid status transition for chef");
            }

            return repo.save(order);
        }

    public List<Order> getOrdersByWaiter(Long waiterId) {
        return repo.findByWaiterId(waiterId);
    }

    public long countOrdersByWaiter(Long waiterId) {
        Waiter waiter = waiterRepo.findById(waiterId)
                .orElseThrow(() -> new RuntimeException("Waiter not found"));
        return repo.countByWaiter(waiter);
    }




    public double calculateTotalEarnings() {
        return repo.findAll()
                .stream()
                .filter(order -> order.getStatus().equals("FINISHED"))
                .mapToDouble(Order::getTotalAmount)
                .sum();
    }



}










