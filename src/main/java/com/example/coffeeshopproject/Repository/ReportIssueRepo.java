package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.ReportIssue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportIssueRepo extends JpaRepository<ReportIssue, Long> {
    long count();
}
