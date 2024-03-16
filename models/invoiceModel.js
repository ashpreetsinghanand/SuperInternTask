// models/invoiceModel.js

const db = require('../services/database');

const InvoiceModel = {
  // Create a new invoice
  async createInvoice(invoiceData) {
    try {
      const { customerId, items } = invoiceData;
      
      // Begin transaction
      const client = await db.connect();
      await client.query('BEGIN');
      
      // Insert invoice
      const invoiceQuery = 'INSERT INTO invoices (customer_id, status) VALUES ($1, $2) RETURNING *';
      const invoiceValues = [customerId, 'Pending']; // Assuming initial status is 'Pending'
      const { rows: [invoice] } = await client.query(invoiceQuery, invoiceValues);
      
      // Insert invoice items
      for (const item of items) {
        const itemQuery = 'INSERT INTO invoice_items (invoice_id, item_name, quantity, unit_price) VALUES ($1, $2, $3, $4)';
        const itemValues = [invoice.invoice_id, item.item_name, item.quantity, item.unit_price];
        await client.query(itemQuery, itemValues);
      }
      
      // Commit transaction
      await client.query('COMMIT');
      return invoice;
    } catch (error) {
      // Rollback transaction on error
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release client
      client.release();
    }
  },
  
  // Retrieve details of a specific invoice
  async getInvoiceById(invoiceId) {
    const query = `
      SELECT 
        invoices.invoice_id, invoices.customer_id, invoices.status,
        invoice_items.item_name, invoice_items.quantity, invoice_items.unit_price
      FROM invoices
      INNER JOIN invoice_items ON invoices.invoice_id = invoice_items.invoice_id
      WHERE invoices.invoice_id = $1
    `;
    const { rows } = await db.query(query, [invoiceId]);
    return rows;
  },
  
  // Update the status of an invoice
  async updateInvoiceStatus(invoiceId, status) {
    const query = 'UPDATE invoices SET status = $1 WHERE invoice_id = $2 RETURNING *';
    const { rows: [invoice] } = await db.query(query, [status, invoiceId]);
    return invoice;
  },
  
  // List all invoices for a specific customer
  async getInvoicesByCustomer(customerId) {
    const query = 'SELECT * FROM invoices WHERE customer_id = $1';
    const { rows } = await db.query(query, [customerId]);
    return rows;
  },
  
  // Calculate total sales per customer
  async calculateTotalSalesPerCustomer() {
    const query = `
      SELECT 
        invoices.customer_id, customers.name, 
        SUM(invoice_items.quantity * invoice_items.unit_price) AS total_sales
      FROM invoices
      INNER JOIN customers ON invoices.customer_id = customers.customer_id
      INNER JOIN invoice_items ON invoices.invoice_id = invoice_items.invoice_id
      GROUP BY invoices.customer_id, customers.name
    `;
    const { rows } = await db.query(query);
    return rows;
  }
};

module.exports = InvoiceModel;
