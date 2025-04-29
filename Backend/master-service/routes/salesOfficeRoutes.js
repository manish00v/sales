const express = require('express');
const SalesOfficeController = require('../controllers/salesOfficeController');

const router = express.Router();

router.post('/', SalesOfficeController.createSalesOffice);
router.get('/', SalesOfficeController.getAllSalesOffices);
router.get('/:id', SalesOfficeController.getSalesOfficeById);
router.put('/:id', SalesOfficeController.updateSalesOffice);
router.delete('/:id', SalesOfficeController.deleteSalesOffice);

module.exports = router;