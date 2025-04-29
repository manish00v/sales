import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesOrderRoutes from './routes/salesOrderRoutes.js';
import customerRoutes from './routes/customerRoutes.js'
import lineItemsRoutes   from './routes/lineItemsRoutes.js'
import salesPersonRoutes  from './routes/salesPersonRoutes.js'
import returnOrderRoutes from './routes/returnOrderRoutes.js';
import returnLineItemRoutes from './routes/returnLineItemsRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Use the sales order routes with the base path /api
app.use('/api', salesOrderRoutes);
app.use('/api', customerRoutes);
app.use('/api', lineItemsRoutes);
app.use('/api', salesPersonRoutes)
app.use('/api', returnOrderRoutes);
app.use('/api', returnLineItemRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});