const {
  createRelatedParty,
  getRelatedPartyById,
  getAllRelatedParties,
  updateRelatedParty,
  deleteRelatedParty
} = require('../services/relatedPartyService');
const { validateRelatedParty } = require('../validations/relatedPartyValidation');

exports.createRelatedParty = async (req, res) => {
  try {
    const { error } = validateRelatedParty(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const relatedParty = await createRelatedParty(req.body);
    res.status(201).json(relatedParty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRelatedParty = async (req, res) => {
  try {
    const relatedParty = await getRelatedPartyById(parseInt(req.params.id));
    if (!relatedParty) return res.status(404).json({ message: 'Related party not found' });
    res.json(relatedParty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRelatedParties = async (req, res) => {
  try {
    const relatedParties = await getAllRelatedParties();
    res.json(relatedParties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRelatedParty = async (req, res) => {
  try {
    const { error } = validateRelatedParty(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedRelatedParty = await updateRelatedParty(parseInt(req.params.id), req.body);
    if (!updatedRelatedParty) return res.status(404).json({ message: 'Related party not found' });
    res.json(updatedRelatedParty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRelatedParty = async (req, res) => {
  try {
    const deletedRelatedParty = await deleteRelatedParty(parseInt(req.params.id));
    if (!deletedRelatedParty) return res.status(404).json({ message: 'Related party not found' });
    res.json({ message: 'Related party deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};