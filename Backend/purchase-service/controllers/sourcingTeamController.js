const sourcingTeamService = require('../services/sourcingTeamService');
const { createSourcingTeamSchema, updateSourcingTeamSchema } = require('../validations/sourcingTeamValidation');

const getAllSourcingTeams = async (req, res) => {
  try {
    const sourcingTeams = await sourcingTeamService.getAllSourcingTeams();
    res.json(sourcingTeams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSourcingTeamById = async (req, res) => {
  try {
    const sourcingTeam = await sourcingTeamService.getSourcingTeamById(req.params.sourcingTeamId);
    if (!sourcingTeam) {
      return res.status(404).json({ error: 'Sourcing Team not found' });
    }
    res.json(sourcingTeam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSourcingTeam = async (req, res) => {
  try {
    const { error } = createSourcingTeamSchema.validate(req.body);
    if (error) throw new Error(error.details.map(detail => detail.message).join(', '));

    const newSourcingTeam = await sourcingTeamService.createSourcingTeam(req.body);
    res.status(201).json(newSourcingTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSourcingTeamById = async (req, res) => {
  try {
    const { error } = updateSourcingTeamSchema.validate(req.body);
    if (error) throw new Error(error.details.map(detail => detail.message).join(', '));

    const updatedSourcingTeam = await sourcingTeamService.updateSourcingTeamById(
      req.params.sourcingTeamId,
      req.body
    );
    if (!updatedSourcingTeam) {
      return res.status(404).json({ error: 'Sourcing Team not found' });
    }
    res.json(updatedSourcingTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSourcingTeamById = async (req, res) => {
  try {
    const deletedSourcingTeam = await sourcingTeamService.deleteSourcingTeamById(req.params.sourcingTeamId);
    if (!deletedSourcingTeam) {
      return res.status(404).json({ error: 'Sourcing Team not found' });
    }
    res.json({ message: 'Sourcing Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSourcingTeams,
  getSourcingTeamById,
  createSourcingTeam,
  updateSourcingTeamById,
  deleteSourcingTeamById
};