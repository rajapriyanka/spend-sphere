const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Finance Records Maintenance Backend Running');
});

// Routes (to be created later)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const transactionsRoutes = require('./routes/transactionsRoutes');
app.use('/api/finance', transactionsRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const reportsRoutes = require('./routes/reportsRoutes');
app.use('/api/reports', reportsRoutes);

const excelRoutes = require('./routes/excelRoutes');
app.use('/api/excel', excelRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
