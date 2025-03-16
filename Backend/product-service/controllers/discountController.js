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
            console.log("Received data:", discountData); // Debugging

            // Validate and convert data types
            if (!discountData.productId || !discountData.discountId) {
                return res.status(400).json({ message: "Product ID and Discount ID are required" });
            }

            const formattedData = {
                ...discountData,
                productId: parseInt(discountData.productId, 10),
                discountId: parseInt(discountData.discountId, 10),
                discountValue: parseFloat(discountData.discountValue), // Convert to float
              };

            // Check if the product exists
            const productExists = await this.discountService.checkProductExists(formattedData.productId);

            if (!productExists) {
                return res.status(400).json({ message: "Product does not exist" });
            }

            // Call the service to create the discount
            const newDiscount = await this.discountService.createDiscount(formattedData);
            console.log("New discount created:", newDiscount); // Debugging

            res.status(201).json({ message: "Discount created successfully", data: newDiscount });
        } catch (error) {
            console.error("Error in createDiscount:", error); // Debugging
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