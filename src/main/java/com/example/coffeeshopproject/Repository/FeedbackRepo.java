package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    long count();
}
