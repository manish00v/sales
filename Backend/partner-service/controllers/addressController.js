const addressService = require('../services/addressService');

exports.getAllAddresses = async (req, res) => {
  try {
    const result = await addressService.getAllAddresses(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const address = await addressService.getAddressById(parseInt(req.params.id));
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAddress = async (req, res) => {
  try {
    const newAddress = await addressService.createAddress(req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await addressService.updateAddress(
      parseInt(req.params.id),
      req.body
    );
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await addressService.deleteAddress(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};