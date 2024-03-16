// routes/customers.js

const express = require('express');
const router = express.Router();
const db = require('../services/database');
const customerModel = require('../models/customerModel');

// Create a new customer
router.post('/', async (req, res) => {
    try {
        const newCustomer = await customerModel.createCustomer(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve details of a specific customer
router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const customer = await customerModel.getCustomerById(customerId);
        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update details of a specific customer
router.put('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const { name, email } = req.body;
    try {
        const updatedCustomer = await customerModel.updateCustomer(customerId, name, email);
        res.json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a specific customer
router.delete('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        await customerModel.deleteCustomer(customerId);
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
