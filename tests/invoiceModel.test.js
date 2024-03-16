// tests/invoiceModel.test.js

const db = require('../services/database');
const invoiceModel = require('../models/invoiceModel');

describe('Invoice Model', () => {
   // Test case for creating a new invoice
   it('should create a new invoice', async () => {
    const invoiceData = {
      customerId: 1,
      items: [{ item_name: 'Item 1', quantity: 2, unit_price: 10 }]
    };
    const newInvoice = await invoiceModel.createInvoice(invoiceData);
    expect(newInvoice).toHaveProperty('invoice_id');
  });

  // Test case for retrieving details of a specific invoice
  it('should retrieve details of a specific invoice', async () => {
    // Assuming there's an existing invoice with ID 1
    const invoice = await invoiceModel.getInvoiceById(1);
    expect(invoice).toHaveProperty('invoice_id');
  });

  // Test case for updating the status of an invoice
  it('should update the status of an invoice', async () => {
    // Assuming there's an existing invoice with ID 1
    const updatedInvoice = await invoiceModel.updateInvoiceStatus(1, 'Paid');
    expect(updatedInvoice).toHaveProperty('status', 'Paid');
  });

  // Test case for listing all invoices for a specific customer
  it('should list all invoices for a specific customer', async () => {
    // Assuming there's an existing customer with ID 1
    const invoices = await invoiceModel.getInvoicesByCustomer(1);
    expect(Array.isArray(invoices)).toBe(true);
  });

  // Test case for calculating total sales per customer
  it('should calculate total sales per customer', async () => {
    const sales = await invoiceModel.calculateTotalSalesPerCustomer();
    expect(Array.isArray(sales)).toBe(true);
    // Add more specific assertions based on your expected response
  });
});
