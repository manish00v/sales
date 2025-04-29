const salesPersonService = require('../services/salesPersonService');

exports.createSalesPerson = async (req, res) => {
  try {
    const salesPerson = await salesPersonService.createSalesPerson(req.body);
    res.status(201).json(salesPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSalesPersons = async (req, res) => {
  try {
    const salesPersons = await salesPersonService.getAllSalesPersons();
    res.json(salesPersons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalesPersonById = async (req, res) => {
  try {
    const salesPerson = await salesPersonService.getSalesPersonById(req.params.SalesPersonId);
    res.json(salesPerson);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateSalesPerson = async (req, res) => {
  try {
    const salesPerson = await salesPersonService.updateSalesPerson(req.params.SalesPersonId, req.body);
    res.json(salesPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSalesPerson = async (req, res) => {
  try {
    await salesPersonService.deleteSalesPerson(req.params.SalesPersonId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};