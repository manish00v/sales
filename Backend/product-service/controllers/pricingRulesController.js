import PricingRulesService from '../services/pricingRulesService.js';

class PricingRulesController {
    constructor() {
        this.pricingRulesService = new PricingRulesService();
    }

    async getAllPricingRules(req, res) {
        try {
            const pricingRules = await this.pricingRulesService.getAllPricingRules();
            res.json(pricingRules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPricingRulesById(req, res) {
        try {
            const pricingRules = await this.pricingRulesService.getPricingRulesById(req.params.id);
            if (!pricingRules) {
                return res.status(404).json({ error: 'Pricing Rules not found' });
            }
            res.json(pricingRules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPricingRulesByRuleIdAndProductId(req, res) {
        try {
            const { ruleId, productId } = req.params;

            // Fetch pricing rules
            const pricingRules = await this.pricingRulesService.getPricingRulesByRuleIdAndProductId(ruleId, productId);

            if (!pricingRules) {
                return res.status(404).json({ message: 'Pricing rules not found' });
            }

            res.status(200).json(pricingRules);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching pricing rules', error: error.message });
        }
    }

    async createPricingRules(req, res) {
        try {
            const pricingRuleData = req.body;
            console.log("Received data:", pricingRuleData); // Debugging
    
            // Validate and convert data types
            if (!pricingRuleData.productId || !pricingRuleData.ruleId) {
                return res.status(400).json({ message: "Product ID and Rule ID are required" });
            }
    
            const formattedData = {
                ...pricingRuleData,
                productId: String(pricingRuleData.productId),
                ruleId: String(pricingRuleData.ruleId),
                basePrice: parseFloat(pricingRuleData.basePrice), // Convert to float
                effectiveDate: new Date(pricingRuleData.effectiveDate).toISOString(), // Convert to ISO-8601
                expireDate: new Date(pricingRuleData.expireDate).toISOString(), // Convert to ISO-8601
            };
    
            // Check if the product exists
            const productExists = await this.pricingRulesService.checkProductExists(formattedData.productId);
    
            if (!productExists) {
                return res.status(400).json({ message: "Product does not exist" });
            }
    
            // Call the service to create the pricing rule
            const newPricingRule = await this.pricingRulesService.createPricingRules(formattedData);
            console.log("New pricing rule created:", newPricingRule); // Debugging
    
            res.status(201).json({ message: "Pricing rule created successfully", data: newPricingRule });
        } catch (error) {
            console.error("Error in createPricingRules:", error); // Debugging
            res.status(500).json({ message: "Error creating pricing rule", error: error.message });
        }
    }

    async updatePricingRules(req, res) {
        try {
            const { effectiveDate, expireDate, ...otherData } = req.body;

            // Convert dates to ISO-8601 format with time set to midnight UTC
            const formattedData = {
                ...otherData,
                ...(effectiveDate && { effectiveDate: new Date(effectiveDate).toISOString() }),
                ...(expireDate && { expireDate: new Date(expireDate).toISOString() })
            };

            const updatedPricingRules = await this.pricingRulesService.updatePricingRules(req.params.id, formattedData);
            res.json(updatedPricingRules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// Export the class itself
export default PricingRulesController;