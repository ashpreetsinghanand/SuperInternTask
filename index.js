const express = require('express');
const port = 3000;
const { pool } = require("./services/database");
const invoicesRouter = require('./routes/invoices');
const customersRouter = require('./routes/customer');
const app = express();
app.use(express.json());

// Routes
app.use('/api/invoices', invoicesRouter);
app.use('/api/customers', customersRouter);
// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Invoice Management System API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.get('/', (req, res) => res.send('Testing Node.js app'));
app.listen(port, () =>  console.log(`Server is running on port ${port}`));
console.log(pool)