const express = require('express');
const router = express.Router();
const salesPersonController = require('../controllers/salesPersonController');

router.post('/', salesPersonController.createSalesPerson);
router.get('/', salesPersonController.getAllSalesPersons);
router.get('/:SalesPersonId', salesPersonController.getSalesPersonById);
router.put('/:SalesPersonId', salesPersonController.updateSalesPerson);
router.delete('/:SalesPersonId', salesPersonController.deleteSalesPerson);

module.exports = router;