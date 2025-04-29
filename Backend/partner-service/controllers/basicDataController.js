const basicDataService = require('../services/basicDataService');

exports.getAllBasicData = async (req, res) => {
  try {
    const result = await basicDataService.getAllBasicData(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBasicData = async (req, res) => {
  try {
    const data = await basicDataService.getBasicDataById(parseInt(req.params.id));
    if (!data) return res.status(404).json({ message: 'Basic data not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBasicData = async (req, res) => {
  try {
    const newData = await basicDataService.createBasicData(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBasicData = async (req, res) => {
  try {
    const updatedData = await basicDataService.updateBasicData(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBasicData = async (req, res) => {
  try {
    await basicDataService.deleteBasicData(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDropdownOptions = async (req, res) => {
  try {
    const options = await basicDataService.getDropdownOptions();
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};