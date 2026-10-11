package com.smartparking.smartingparkingmanagementsystem.repository;

import com.smartparking.smartingparkingmanagementsystem.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}