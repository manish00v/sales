import DiscountService from '../services/discountService.js';

class DiscountController {
    constructor() {
        this.discountService = new DiscountService();
    }

    async getAllDiscounts(req, res) {
        try {
            const discounts = await this.discountService.getAllDiscounts();
            res.json(discounts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDiscountById(req, res) {
        try {
            const discount = await this.discountService.getDiscountById(req.params.id);
            if (!discount) {
                return res.status(404).json({ error: 'Discount not found' });
            }
            res.json(discount);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getDiscountByDiscountIdAndProductId(req, res) {
        try {
            const { discountId, productId } = req.params;

            // Fetch discount rules
            const discount = await this.discountService.getDiscountByDiscountIdAndProductId(discountId, productId);

            if (!discount) {
                return res.status(404).json({ message: 'Discount not found' });
            }

            res.status(200).json(discount);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching discount', error: error.message });
        }
    }

    async createDiscount(req, res) {
        try {
            const discountData = req.body;
            console.log("Received data:", discountData);

            // Validate required fields
            if (!discountData.discountId || !discountData.productId) {
                return res.status(400).json({ message: "Discount ID and Product ID are required." });
            }

            // Create the discount
            const newDiscount = await this.discountService.createDiscount(discountData);
            console.log("New discount created:", newDiscount);

            res.status(201).json({
                message: "Discount created successfully",
                data: newDiscount,
            });
        } catch (error) {
            console.error("Error in createDiscount:", error);

            if (error.message.includes("already exists")) {
                return res.status(400).json({ message: error.message });
            }

            res.status(500).json({ message: "Error creating discount", error: error.message });
        }
    }

    async updateDiscount(req, res) {
        try {
            const { effectiveDate, expireDate, ...otherData } = req.body;

            // Convert dates to ISO-8601 format with time set to midnight UTC
            const formattedData = {
                ...otherData,
                  };

            const updatedDiscount = await this.discountService.updateDiscount(req.params.id, formattedData);
            res.json(updatedDiscount);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// Export the class itself
export default DiscountController;