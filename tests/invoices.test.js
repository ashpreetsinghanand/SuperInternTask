// tests/invoices.test.js

const request = require('supertest');
const app = require('../index');

describe('Invoices API', () => {
  // Test case for creating a new invoice
  it('should create a new invoice', async () => {
    const res = await request(app)
      .post('/api/invoices')
      .send({
        customerId: 1,
        items: [
          { item_name: 'Item 1', quantity: 2, unit_price: 10 },
          { item_name: 'Item 2', quantity: 1, unit_price: 20 }
        ]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('invoice_id');
  });

  // Test case for retrieving details of a specific invoice
  it('should retrieve details of a specific invoice', async () => {
    // Assuming there's an existing invoice with ID 1
    const res = await request(app).get('/api/invoices/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('invoice_id');
  });

  // Test case for updating the status of an invoice
  it('should update the status of an invoice', async () => {
    const res = await request(app)
      .patch('/api/invoices/1')
      .send({ status: 'Paid' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'Paid');
  });

  
  it('should list all invoices for a specific customer', async () => {
    const res = await request(app).get('/api/invoices/customer/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test case for calculating total sales per customer
  it('should calculate total sales per customer', async () => {
    const res = await request(app).get('/api/invoices/sales');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  
});
