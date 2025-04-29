require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/client');
const partnerRoutes = require('./routes/partnerRoutes');
const basicDataRoutes = require('./routes/basicDataRoutes');
const addressRoutes = require('./routes/addressRoutes');
const bankDetailRoutes = require('./routes/bankDetailRoutes');
const accountRoutes = require('./routes/accountRoutes');
const relatedRoutes = require('./routes/relatedPartyRoutes');



const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/partners', partnerRoutes);
app.use('/api/basic-data', basicDataRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/bank-details', bankDetailRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/related-party', relatedRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Partner Management API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message.includes('not found')) {
    return res.status(404).json({ message: err.message });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection and server start
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();