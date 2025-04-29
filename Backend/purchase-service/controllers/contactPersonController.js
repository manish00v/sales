const contactPersonService = require('../services/contactPersonService');

const getAllContactPersons = async (req, res) => {
  try {
    const contactPersons = await contactPersonService.getAllContactPersons();
    res.json({
      success: true,
      data: contactPersons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getContactPersonByContactPersonId = async (req, res) => {
  try {
    const contactPerson = await contactPersonService.getContactPersonByContactPersonId(req.params.contactPersonId);
    res.json({
      success: true,
      data: contactPerson
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const createContactPerson = async (req, res) => {
  try {
    const newContactPerson = await contactPersonService.createContactPerson(req.body);
    res.status(201).json({
      success: true,
      data: newContactPerson
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateContactPersonByContactPersonId = async (req, res) => {
  try {
    const updatedContactPerson = await contactPersonService.updateContactPersonByContactPersonId(
      req.params.contactPersonId,
      req.body
    );
    res.json({
      success: true,
      data: updatedContactPerson
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

const deleteContactPersonByContactPersonId = async (req, res) => {
  try {
    await contactPersonService.deleteContactPersonByContactPersonId(req.params.contactPersonId);
    res.json({
      success: true,
      message: 'Contact person deleted successfully'
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllContactPersons,
  getContactPersonByContactPersonId,
  createContactPerson,
  updateContactPersonByContactPersonId,
  deleteContactPersonByContactPersonId
};