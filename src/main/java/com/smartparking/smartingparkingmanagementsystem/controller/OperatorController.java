package com.smartparking.smartingparkingmanagementsystem.controller;

import com.smartparking.smartingparkingmanagementsystem.entity.Operator;
import com.smartparking.smartingparkingmanagementsystem.service.OperatorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operators")
public class OperatorController {

    private final OperatorService operatorService;

    public OperatorController(OperatorService operatorService) {
        this.operatorService = operatorService;
    }

    @GetMapping
    public List<Operator> getAllOperators() {
        return operatorService.getAllOperators();
    }

    @PostMapping
    public Operator createOperator(@RequestBody Operator operator) {
        return operatorService.createOperator(operator);
    }
}