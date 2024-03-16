// routes/invoices.js

const express = require('express');
const router = express.Router();
const db = require('../services/database');
const invoiceModel = require('../models/invoiceModel');

// Create a new invoice
router.post('/', async (req, res) => {
    try {
        const newInvoice = await invoiceModel.createInvoice(req.body);
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve details of a specific invoice
router.get('/:invoiceId', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const invoice = await invoiceModel.getInvoiceById(invoiceId);
        res.json(invoice);
    } catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update the status of an invoice
router.patch('/:invoiceId', async (req, res) => {
    const { invoiceId } = req.params;
    const { status } = req.body;
    try {
        const updatedInvoice = await invoiceModel.updateInvoiceStatus(invoiceId, status);
        res.json(updatedInvoice);
    } catch (error) {
        console.error('Error updating invoice status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// List all invoices for a specific customer
router.get('/customer/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const invoices = await invoiceModel.getInvoicesByCustomer(customerId);
        res.json(invoices);
    } catch (error) {
        console.error('Error fetching invoices for customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Calculate total sales per customer
router.get('/sales', async (req, res) => {
    try {
        const sales = await invoiceModel.calculateTotalSalesPerCustomer();
        res.json(sales);
    } catch (error) {
        console.error('Error calculating total sales per customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
