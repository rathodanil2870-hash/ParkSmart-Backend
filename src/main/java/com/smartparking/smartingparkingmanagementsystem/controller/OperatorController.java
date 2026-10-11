package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.Operator;
import com.smartparking.smartingparkingmanagementsystem.repository.OperatorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operators")
public class OperatorController {

    private final OperatorRepository operatorRepository;

    public OperatorController(OperatorRepository operatorRepository) {
        this.operatorRepository = operatorRepository;
    }

    @GetMapping
    public List<Operator> getAllOperators() {
        return operatorRepository.findAll();
    }

    @PostMapping
    public Operator createOperator(@RequestBody Operator operator) {
        return operatorRepository.save(operator);
    }
}