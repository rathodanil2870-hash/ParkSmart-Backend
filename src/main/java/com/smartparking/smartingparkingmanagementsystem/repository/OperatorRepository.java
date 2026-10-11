package com.smartparking.smartingparkingmanagementsystem.repository;

import com.smartparking.smartingparkingmanagementsystem.entity.Operator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperatorRepository extends JpaRepository<Operator, Long> {
}