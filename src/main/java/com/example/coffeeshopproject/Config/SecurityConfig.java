package com.example.coffeeshopproject.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity   // ✅ ensures your config overrides Spring Boot defaults
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())              // disable CSRF for APIs
                .cors(Customizer.withDefaults())           // enable CORS rules from WebMvcConfigurer
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ stateless API
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(
                                "/api/user/login",
                                "/api/customer/register",
                                "/api/customer/login",
                                "/api/customer/profile/**",
                                "/api/customer/update/**",
                                "/api/chef/register",
                                "/api/chef/login",
                                "/api/chef/profile/**",
                                "/api/chef/update/**",
                                "/api/waiter/register",
                                "/api/waiter/login",
                                "/api/waiter/profile/**",
                                "/api/waiter/update/**",
                                "/api/admin/login",
                                "/api/booking/book",
                                "/api/booking/customer/**",
                                "/api/admin/customers",
                                "/api/admin/chefs",
                                "/api/admin/waiters",
                                "/api/admin/bookings",
                                "/api/admin/booking/**",
                                "/api/customer/delete/**",
                                "/api/admin/**",
                                "/api/chef/delete/**",
                                "/api/waiter/delete/**",
                                "/api/booking/delete/**",
                                "/api/booking/**",
                                "/api/menu/**",
                                "/api/orders/**",
                                "/api/waiter/orders",
                                "/api/admin/orders/**",
                                "/api/orders/admin/orders/**",
                                "/api/chef/orders/all",
                                "/api/chef/orders/**",
                                "/api/waiter/orders/**",
                                "/api/customer/cart/**",
                                "/api/orders/place",
                                "/api/payments/**",// ✅ payments endpoints allowed
                                "/api/email/send",
                                "/api/customer/*/stats",
                                "/uploads/**",
                                "/api/chat/**"
                        ).permitAll()
                        .requestMatchers("/error").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    // ✅ Global CORS configuration
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")   // allow Postman + frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
