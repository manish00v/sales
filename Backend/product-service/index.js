import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import discountRoutes from './routes/discountRoutes.js';
import discountRulesRoutes from './routes/discountRulesRoutes.js';
import pricingRulesRoutes from './routes/pricingRulesRoutes.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies

 app.use(express.json());

// Enable CORS for all routes

app.use(cors());

// Use the product routes
app.use('/api', productRoutes);
app.use('/api', discountRoutes);
app.use('/api', discountRulesRoutes);
app.use('/api', pricingRulesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});