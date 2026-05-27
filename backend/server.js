const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const connectCloudinary = require('./config/cloudinary')

// swagger imports
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

// initialize cloudinary 
connectCloudinary();

const app = express();

app.use(cors());
app.use(express.json());

// Mount Swagger UI dashboard
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/course',courseRoutes)
app.use('/api/category',categoryRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});