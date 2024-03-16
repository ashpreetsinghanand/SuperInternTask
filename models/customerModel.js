// models/customerModel.js

const db = require('../services/database');

const CustomerModel = {
  // Create a new customer
  async createCustomer(customerData) {
    try {
      const { name, email } = customerData;
      const query = 'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *';
      const { rows } = await db.query(query, [name, email]);
      return rows[0];
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },
  
  // Retrieve details of a specific customer by ID
  async getCustomerById(customerId) {
    try {
      const query = 'SELECT * FROM customers WHERE customer_id = $1';
      const { rows } = await db.query(query, [customerId]);
      return rows[0];
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },
  
  // Update details of a specific customer
  async updateCustomer(customerId, name, email) {
    try {
      const query = 'UPDATE customers SET name = $1, email = $2 WHERE customer_id = $3 RETURNING *';
      const { rows } = await db.query(query, [name, email, customerId]);
      return rows[0];
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },
  
  // Delete a specific customer
  async deleteCustomer(customerId) {
    try {
      const query = 'DELETE FROM customers WHERE customer_id = $1';
      await db.query(query, [customerId]);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
};

module.exports = CustomerModel;
