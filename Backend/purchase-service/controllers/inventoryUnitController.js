const inventoryUnitService = require('../services/inventoryUnitService');
const { 
  createInventoryUnitSchema, 
  updateInventoryUnitSchema 
} = require('../validations/inventoryUnitValidation');

const getAllInventoryUnits = async (req, res) => {
  try {
    const inventoryUnits = await inventoryUnitService.getAllInventoryUnits();
    res.json(inventoryUnits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryUnitById = async (req, res) => {
  try {
    const inventoryUnit = await inventoryUnitService.getInventoryUnitById(req.params.id);
    if (!inventoryUnit) {
      return res.status(404).json({ error: 'Inventory Unit not found' });
    }
    res.json(inventoryUnit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryUnitsByFactoryCode = async (req, res) => {
  try {
    const inventoryUnits = await inventoryUnitService.getInventoryUnitsByFactoryCode(req.params.code);
    res.json(inventoryUnits);
  } catch (error) {
    if (error.message.includes('Factory Unit Code does not exist')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const createInventoryUnit = async (req, res) => {
  try {
    const { error } = createInventoryUnitSchema.validate(req.body);
    if (error) throw new Error(error.details.map(detail => detail.message).join(', '));

    const newInventoryUnit = await inventoryUnitService.createInventoryUnit(req.body);
    res.status(201).json(newInventoryUnit);
  } catch (error) {
    if (error.message.includes('Factory Unit service error')) {
      return res.status(503).json({ error: 'Factory Unit service unavailable' });
    }
    res.status(400).json({ error: error.message });
  }
};

const updateInventoryUnit = async (req, res) => {
  try {
    const { error } = updateInventoryUnitSchema.validate(req.body);
    if (error) throw new Error(error.details.map(detail => detail.message).join(', '));

    const updatedInventoryUnit = await inventoryUnitService.updateInventoryUnit(
      req.params.id,
      req.body
    );
    if (!updatedInventoryUnit) {
      return res.status(404).json({ error: 'Inventory Unit not found' });
    }
    res.json(updatedInventoryUnit);
  } catch (error) {
    if (error.message.includes('Factory Unit service error')) {
      return res.status(503).json({ error: 'Factory Unit service unavailable' });
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteInventoryUnit = async (req, res) => {
  try {
    const deletedInventoryUnit = await inventoryUnitService.deleteInventoryUnit(req.params.id);
    if (!deletedInventoryUnit) {
      return res.status(404).json({ error: 'Inventory Unit not found' });
    }
    res.json({ message: 'Inventory Unit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInventoryUnits,
  getInventoryUnitById,
  getInventoryUnitsByFactoryCode,
  createInventoryUnit,
  updateInventoryUnit,
  deleteInventoryUnit
};