const bankDetailService = require('../services/bankDetailService');

exports.getAllBankDetails = async (req, res) => {
  try {
    const result = await bankDetailService.getAllBankDetails(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBankDetail = async (req, res) => {
  try {
    const bankDetail = await bankDetailService.getBankDetailById(parseInt(req.params.id));
    if (!bankDetail) return res.status(404).json({ message: 'Bank detail not found' });
    res.json(bankDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBankDetail = async (req, res) => {
  try {
    const newBankDetail = await bankDetailService.createBankDetail(req.body);
    res.status(201).json(newBankDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBankDetail = async (req, res) => {
  try {
    const updatedBankDetail = await bankDetailService.updateBankDetail(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedBankDetail);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBankDetail = async (req, res) => {
  try {
    await bankDetailService.deleteBankDetail(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountTypes = async (req, res) => {
  try {
    const types = await bankDetailService.getAccountTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};