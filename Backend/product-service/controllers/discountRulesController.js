import DiscountRulesService from '../services/discountRulesService.js';

class DiscountRulesController {
    constructor() {
        this.discountRulesService = new DiscountRulesService();
    }

    async getAllDiscountRules(req, res) {
        try {
            const discountRules = await this.discountRulesService.getAllDiscountRules();
            res.json(discountRules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDiscountRulesById(req, res) {
        try {
            const discountRules = await this.discountRulesService.getDiscountRulesById(req.params.id);
            if (!discountRules) {
                return res.status(404).json({ error: 'Discount Rules not found' });
            }
            res.json(discountRules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDiscountRulesByDiscountIdAndProductId(req, res) {
        try {
            const { discountId, productId } = req.params;

            // Fetch discount rules
            const discountRules = await this.discountRulesService.getDiscountRulesByDiscountIdAndProductId(discountId, productId);

            if (!discountRules) {
                return res.status(404).json({ message: 'Discount rules not found' });
            }

            res.status(200).json(discountRules);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching discount rules', error: error.message });
        }
    }

    async createDiscountRules(req, res) {
        try {
            const discountRuleData = req.body;
            console.log("Received data:", discountRuleData); // Debugging
    
            // Validate and convert data types
            if (!discountRuleData.discountId || !discountRuleData.productId) {
                return res.status(400).json({ message: "Discount ID and Product ID are required" });
            }
    
            const formattedData = {
                ...discountRuleData,
                discountId: String(discountRuleData.discountId),
                productId: String(discountRuleData.productId),
                discountValue: parseFloat(discountRuleData.discountValue), // Convert to float
                effectiveDate: new Date(discountRuleData.effectiveDate).toISOString(), // Convert to ISO-8601
                expiryDate: new Date(discountRuleData.expiryDate).toISOString(), // Convert to ISO-8601
            };
    
            // Check if the product exists
            const productExists = await this.discountRulesService.checkProductExists(formattedData.productId);
    
            if (!productExists) {
                return res.status(400).json({ message: "Product does not exist" });
            }
    
            // Call the service to create the discount rule
            const newDiscountRule = await this.discountRulesService.createDiscountRules(formattedData);
            console.log("New discount rule created:", newDiscountRule); // Debugging
    
            res.status(201).json({ message: "Discount rule created successfully", data: newDiscountRule });
        } catch (error) {
            console.error("Error in createDiscountRules:", error); // Debugging
            res.status(500).json({ message: "Error creating discount rule", error: error.message });
        }
    }

    async updateDiscountRules(req, res) {
        try {
            const { effectiveDate, expiryDate, ...otherData } = req.body;
    
            // Convert dates to ISO-8601 format with time set to midnight UTC
            const formattedData = {
                ...otherData,
                ...(effectiveDate && { effectiveDate: new Date(effectiveDate).toISOString() }),
                ...(expiryDate && { expiryDate: new Date(expiryDate).toISOString() })
            };
    
            const updatedDiscountRules = await this.discountRulesService.updateDiscountRules(req.params.id, formattedData);
            res.json(updatedDiscountRules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

// Export the class itself
export default DiscountRulesController;