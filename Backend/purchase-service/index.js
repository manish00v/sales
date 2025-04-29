require('dotenv').config();
const express = require('express');
const cors = require('cors');
const inventoryUnitRoutes = require('./routes/inventoryUnitRoutes');
const inventoryBayRoutes = require('./routes/inventoryBayRoutes');
const sourcingTeamRoutes = require('./routes/sourcingTeamRoutes');
const sourcingUnitRoutes = require('./routes/sourcingUnitRoutes');
const contactPersonRoutes = require('./routes/contactPersonRoutes');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/inventory-units', inventoryUnitRoutes);
app.use('/api/inventory-bays', inventoryBayRoutes);
app.use('/api/sourcing-teams', sourcingTeamRoutes);
app.use('/api/sourcing-units', sourcingUnitRoutes);
app.use('/api/contact-persons', contactPersonRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});