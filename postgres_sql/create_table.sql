-- Create the customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Create the invoices table
CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    status VARCHAR(50) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

-- Create the invoice_items table
CREATE TABLE invoice_items (
    item_id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES invoices(invoice_id),
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL
);
