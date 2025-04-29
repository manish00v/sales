const express = require('express');
const BusinessEntityController = require('../controllers/businessEntityController');

const router = express.Router();

// Create a new Business Entity
router.post('/', BusinessEntityController.createBusinessEntity);

// Get all Business Entities
router.get('/', BusinessEntityController.getAllBusinessEntities);

// Get a single Business Entity by Code
router.get('/:code', BusinessEntityController.getBusinessEntityByCode);

// Update a Business Entity by Code
router.put('/:code', BusinessEntityController.updateBusinessEntityByCode);

// Delete a Business Entity by Code
router.delete('/:code', BusinessEntityController.deleteBusinessEntityByCode);

module.exports = router;