package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.Waiter;
import com.example.coffeeshopproject.Repository.WaiterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private WaiterRepo waiterRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Waiter waiter = waiterRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Waiter not found"));

        return new org.springframework.security.core.userdetails.User(
                waiter.getEmail(),
                waiter.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_WAITER"))
        );
    }
}
