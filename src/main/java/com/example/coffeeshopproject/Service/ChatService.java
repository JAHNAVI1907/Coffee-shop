package com.example.coffeeshopproject.Service;

import okhttp3.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
public class ChatService {

    public String askBot(String userMessage) {
            String lower = userMessage == null ? "" : userMessage.toLowerCase().trim();

            // Brand voice intro (system tone baked-in)
            String coffeeGreeting = "☕ CoffeeCoop Assistant: ";

            // 1) Registration flow
            if (containsAny(lower, "register", "sign up", "create account", "new account")) {
                return coffeeGreeting +
                        "To register, click ‘Register’ on the landing page. Fill your name, email, phone, and password. " +
                        "Submit to be redirected to the login page. After login, you’ll land on your role-based dashboard.";
            }

            // 2) Login flow (general)
            if (containsAny(lower, "login", "sign in", "log in")) {
                return coffeeGreeting +
                        "Click ‘Login’ on the landing page, enter your registered email and password, and you’ll be redirected " +
                        "to your dashboard. If login fails, check your credentials or refresh the page.";
            }

            // 3) Role-based dashboards
            if (containsAny(lower, "admin dashboard", "admin panel", "admin")) {
                return coffeeGreeting +
                        "Admins manage staff, menu, bookings, orders, payments/earnings, feedback, and issues. " +
                        "Use the sidebar to navigate: Dashboard, Add New Staff, Add New Item, Managing, View Menu, Feedback, Report Issues.";
            }
            if (containsAny(lower, "customer dashboard", "customer")) {
                return coffeeGreeting +
                        "Customers can view menu, book a table, see their bookings, checkout, give feedback, and report issues. " +
                        "Navigate via the left sidebar labels (icon + name).";
            }
            if (containsAny(lower, "chef dashboard", "chef")) {
                return coffeeGreeting +
                        "Chefs can view assigned orders, update completion, and track prep metrics. The sidebar includes Dashboard, Profile, and View Assigned Orders.";
            }
            if (containsAny(lower, "waiter dashboard", "waiter")) {
                return coffeeGreeting +
                        "Waiters see assigned tables, orders served, average serve time, and feedback score. The sidebar includes Dashboard, Profile, and View Assigned Tables.";
            }

            // 4) Book a table
            if (containsAny(lower, "book a table", "booking", "reserve", "reservation")) {
                return coffeeGreeting +
                        "You can book a table from the customer dashboard: select ‘Book a Table’, choose date/time and party size, and submit. " +
                        "You’ll see your bookings under ‘View My Bookings’.";
            }

            // 5) Menu help
            if (containsAny(lower, "menu", "view menu", "coffee", "drinks", "items")) {
                return coffeeGreeting +
                        "We serve espresso, cappuccino, latte, cold brew, and seasonal specials, plus pastries. " +
                        "From Admin, use ‘View Menu’ to manage items. Customers can browse the menu and add items to checkout.";
            }

            // 6) Checkout / orders
            if (containsAny(lower, "checkout", "order", "place order")) {
                return coffeeGreeting +
                        "Add items from the menu to your cart and proceed to checkout. After payment, your order is visible to the kitchen and tracked by the chef/waiter.";
            }

            // 7) Feedback flow
            if (containsAny(lower, "feedback", "review", "rating")) {
                return coffeeGreeting +
                        "Open ‘Feedback’ from your dashboard, write your comments and rating, and submit. " +
                        "Admins can view aggregated feedback in the admin ‘Feedback’ section.";
            }

            // 8) Issue reporting
            if (containsAny(lower, "issue", "report", "problem", "bug")) {
                return coffeeGreeting +
                        "Use ‘Report Issue’ from your dashboard. Describe the problem and submit. " +
                        "Admins can triage reports in the ‘Report Issues’ section.";
            }

            // 9) Login troubleshooting
            if (containsAny(lower, "can't login", "cannot login", "login not working", "invalid")) {
                return coffeeGreeting +
                        "Please verify your email and password, and ensure you registered first. Try refreshing the page. " +
                        "If the issue persists, contact admin support.";
            }

            // 10) Earnings / payments (admin)
            if (containsAny(lower, "earnings", "payments", "revenue")) {
                return coffeeGreeting +
                        "Admins can view ‘Payments / Earnings’ under MANAGING. Earnings are aggregated from completed orders. " +
                        "If you see NaN, check your backend returns a numeric value.";
            }
            if (containsAny(lower,"thanks","thank you","great to hear")){
                return coffeeGreeting+
                        "thank you for visiting and revisit again for your refreshness";
            }

            // Default friendly fallback
            return coffeeGreeting +
                    "How can I help you today? Ask me about the site";
        }

        private boolean containsAny(String text, String... keywords) {
            for (String k : keywords) {
                if (text.contains(k)) return true;
            }
            return false;
        }
    }

