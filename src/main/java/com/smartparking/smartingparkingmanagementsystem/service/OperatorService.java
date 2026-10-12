package com.smartparking.smartingparkingmanagementsystem.service;

import com.smartparking.smartingparkingmanagementsystem.entity.Operator;
import com.smartparking.smartingparkingmanagementsystem.repository.OperatorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperatorService {

    private final OperatorRepository operatorRepository;

    public OperatorService(OperatorRepository operatorRepository) {
        this.operatorRepository = operatorRepository;
    }

    public List<Operator> getAllOperators() {
        return operatorRepository.findAll();
    }

    public Operator createOperator(Operator operator) {
        return operatorRepository.save(operator);
    }
}
