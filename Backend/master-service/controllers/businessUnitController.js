const BusinessUnitService = require('../services/businessUnitService');
const { validateBusinessUnit } = require('../validations/businessUnitValidation');

class BusinessUnitController {
    static async createBusinessUnit(req, res) {
        try {
            // Validate input first
            const validation = validateBusinessUnit(req.body);
            if (validation.error) {
                return res.status(400).json({
                    error: validation.error.message,
                    details: validation.error.details
                });
            }

            // If validation passes, proceed with creation
            const businessUnit = await BusinessUnitService.createBusinessUnit(validation.value);
            res.status(201).json(businessUnit);
        } catch (error) {
            res.status(400).json({ 
                error: error.message || 'Business Unit creation failed' 
            });
        }
    }

    static async getAllBusinessUnits(req, res) {
        try {
            const businessUnits = await BusinessUnitService.getAllBusinessUnits();
            res.json(businessUnits);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getBusinessUnitByCode(req, res) {
        try {
            const businessUnit = await BusinessUnitService.getBusinessUnitByCode(req.params.code);
            if (!businessUnit) {
                return res.status(404).json({ error: 'Business Unit not found' });
            }
            res.json(businessUnit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateBusinessUnitByCode(req, res) {
        try {
            const businessUnit = await BusinessUnitService.updateBusinessUnitByCode(req.params.code, req.body);
            if (!businessUnit) {
                return res.status(404).json({ error: 'Business Unit not found' });
            }
            res.json(businessUnit);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteBusinessUnitByCode(req, res) {
        try {
            const businessUnit = await BusinessUnitService.deleteBusinessUnitByCode(req.params.code);
            if (!businessUnit) {
                return res.status(404).json({ error: 'Business Unit not found' });
            }
            res.json({ message: 'Business Unit deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BusinessUnitController;