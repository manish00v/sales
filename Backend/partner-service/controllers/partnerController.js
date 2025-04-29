const partnerService = require('../services/partnerService');

exports.getAllPartners = async (req, res) => {
  try {
    const result = await partnerService.getAllPartners(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPartner = async (req, res) => {
  try {
    const partner = await partnerService.getPartnerById(parseInt(req.params.id));
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    const newPartner = await partnerService.createPartner(req.body);
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const updatedPartner = await partnerService.updatePartner(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    await partnerService.deletePartner(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getDropdownOptions = async (req, res) => {
  try {
    const options = await partnerService.getDropdownOptions();
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};