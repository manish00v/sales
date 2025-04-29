const express = require('express');
const SalesChannelController = require('../controllers/salesChannelController');

const router = express.Router();

router.post('/', SalesChannelController.createSalesChannel);
router.get('/', SalesChannelController.getAllSalesChannels);
router.get('/:salesChannelId', SalesChannelController.getSalesChannelById);
router.put('/:salesChannelId', SalesChannelController.updateSalesChannelById);
router.delete('/:salesChannelId', SalesChannelController.deleteSalesChannelById);

module.exports = router;