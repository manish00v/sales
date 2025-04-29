const express = require('express');
const DeliveryLocationController = require('../controllers/deliveryLocationController');

const router = express.Router();

router.post('/', DeliveryLocationController.createDeliveryLocation);
router.get('/', DeliveryLocationController.getAllDeliveryLocations);
router.get('/:id', DeliveryLocationController.getDeliveryLocationById);
router.put('/:id', DeliveryLocationController.updateDeliveryLocation);
router.delete('/:id', DeliveryLocationController.deleteDeliveryLocation);

module.exports = router;