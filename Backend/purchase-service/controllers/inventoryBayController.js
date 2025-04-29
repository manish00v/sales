const inventoryBayService = require('../services/inventoryBayService');
const { 
  createInventoryBaySchema, 
  updateInventoryBaySchema 
} = require('../validations/inventoryBayValidation');

const getAllInventoryBays = async (req, res) => {
  try {
    const inventoryBays = await inventoryBayService.getAllInventoryBays();
    res.json(inventoryBays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryBayById = async (req, res) => {
  try {
    const inventoryBay = await inventoryBayService.getInventoryBayById(req.params.id);
    if (!inventoryBay) {
      return res.status(404).json({ error: 'Inventory Bay not found' });
    }
    res.json(inventoryBay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryBaysByUnitId = async (req, res) => {
  try {
    const inventoryBays = await inventoryBayService.getInventoryBaysByUnitId(req.params.unitId);
    res.json(inventoryBays);
  } catch (error) {
    if (error.message.includes('not exist')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const createInventoryBay = async (req, res) => {
  try {
    const { error } = createInventoryBaySchema.validate(req.body);
    if (error) throw new Error(error.details.map(detail => detail.message).join(', '));

    const newInventoryBay = await inventoryBayService.createInventoryBay(req.body);
    res.status(201).json(newInventoryBay);
  } catch (error) {
    if (error.message.includes('Inventory Unit service error')) {
      return res.status(503).json({ error: 'Inventory Unit service unavailable' });
    }
    res.status(400).json({ error: error.message });
  }
};

const updateInventoryBay = async (req, res) => {
  try {
    const { error } = updateInventoryBaySchema.validate(req.body);
    if (error) throw new Error(error.details.map(detail => detail.message).join(', '));

    const updatedInventoryBay = await inventoryBayService.updateInventoryBay(
      req.params.id,
      req.body
    );
    if (!updatedInventoryBay) {
      return res.status(404).json({ error: 'Inventory Bay not found' });
    }
    res.json(updatedInventoryBay);
  } catch (error) {
    if (error.message.includes('Inventory Unit service error')) {
      return res.status(503).json({ error: 'Inventory Unit service unavailable' });
    }
    res.status(400).json({ error: error.message });
  }
};

const deleteInventoryBay = async (req, res) => {
  try {
    const deletedInventoryBay = await inventoryBayService.deleteInventoryBay(req.params.id);
    if (!deletedInventoryBay) {
      return res.status(404).json({ error: 'Inventory Bay not found' });
    }
    res.json({ message: 'Inventory Bay deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInventoryBays,
  getInventoryBayById,
  getInventoryBaysByUnitId,
  createInventoryBay,
  updateInventoryBay,
  deleteInventoryBay
};