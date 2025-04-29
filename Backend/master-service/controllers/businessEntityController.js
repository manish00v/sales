const BusinessEntityService = require('../services/businessEntityService');
const { 
    validateBusinessEntityCreate,
    validateBusinessEntityUpdate 
} = require('../validations/businessEntityValidation');

class BusinessEntityController {
    static async createBusinessEntity(req, res) {
        try {
            const { error } = validateBusinessEntityCreate(req.body);
            if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
            
            const businessEntity = await BusinessEntityService.createBusinessEntity(req.body);
            res.status(201).json(businessEntity);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllBusinessEntities(req, res) {
        try {
            const businessEntities = await BusinessEntityService.getAllBusinessEntities();
            res.json(businessEntities);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getBusinessEntityByCode(req, res) {
        try {
            const businessEntity = await BusinessEntityService.getBusinessEntityByCode(req.params.code);
            if (!businessEntity) {
                return res.status(404).json({ error: 'Business Entity not found' });
            }
            res.json(businessEntity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateBusinessEntityByCode(req, res) {
        try {
            const { error } = validateBusinessEntityUpdate(req.body);
            if (error) throw new Error(error.details.map(detail => detail.message).join(', '));
            
            const businessEntity = await BusinessEntityService.updateBusinessEntityByCode(req.params.code, req.body);
            if (!businessEntity) {
                return res.status(404).json({ error: 'Business Entity not found' });
            }
            res.json(businessEntity);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteBusinessEntityByCode(req, res) {
        try {
            const businessEntity = await BusinessEntityService.deleteBusinessEntityByCode(req.params.code);
            if (!businessEntity) {
                return res.status(404).json({ error: 'Business Entity not found' });
            }
            res.json({ message: 'Business Entity deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BusinessEntityController;