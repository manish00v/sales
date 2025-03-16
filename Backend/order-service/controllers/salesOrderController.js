import SalesOrderService from '../services/salesOrderService.js';
import KafkaProducer from '../kafka/kafkaProducer.js'; // Import Kafka producer

class SalesOrderController {
    constructor() {
        this.salesOrderService = new SalesOrderService();
        this.kafkaProducer = KafkaProducer; // Initialize Kafka producer
    }

    async getAllSalesOrders(req, res) {
        try {
            const salesOrders = await this.salesOrderService.getAllSalesOrders();
            res.json(salesOrders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSalesOrderById(req, res) {
        console.log('Request Params:', req.params); // Debugging log
        console.log('Request Params orderId:', req.params.orderId); // Debugging log
        try {
            if (!req.params.orderId) {
                return res.status(400).json({ error: 'Order ID is required' });
            }

            const salesOrder = await this.salesOrderService.getSalesOrderById(req.params.orderId);
            if (!salesOrder) {
                return res.status(404).json({ error: 'SalesOrder not found' });
            }

            res.json(salesOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSalesOrderByOrderIdAndCustomerId(req, res) {
        try {
            const { orderId, customerId } = req.params;

            // Convert orderId to an integer
            const parsedOrderId = parseInt(orderId, 10);
            if (isNaN(parsedOrderId)) {
                return res.status(400).json({ error: 'Invalid orderId. Must be a number.' });
            }

            // Convert customerId to an integer
            const parsedCustomerId = parseInt(customerId, 10);
            if (isNaN(parsedCustomerId)) {
                return res.status(400).json({ error: 'Invalid customerId. Must be a number.' });
            }

            // Call the service to fetch the sales order
            const salesOrder = await this.salesOrderService.getSalesOrderByOrderIdAndCustomerId(parsedOrderId, parsedCustomerId);

            if (!salesOrder) {
                return res.status(404).json({ error: 'Sales order not found.' });
            }

            res.status(200).json(salesOrder);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createSalesOrder(req, res) {
        try {
            const salesOrderData = req.body;
            console.log("Received data:", salesOrderData); // Debugging
    
            // Validate customerId
            const customerId = parseInt(salesOrderData.customerId, 10);
            if (isNaN(customerId)) {
                return res.status(400).json({ message: "Customer ID must be a valid number" });
            }
    
            // Check if the customer exists
            const customerExists = await this.salesOrderService.checkCustomerExists(customerId);
            if (!customerExists) {
                return res.status(400).json({ message: "Customer ID is not valid" });
            }
    
            // Format the data
            const formattedData = {
                ...salesOrderData,
                ...(salesOrderData.orderDate && { orderDate: new Date(salesOrderData.orderDate).toISOString() }),
                ...(salesOrderData.requiredDate && { requiredDate: new Date(salesOrderData.requiredDate).toISOString() }),
                customerId: customerId, // Use the parsed customerId
                totalAmount: parseFloat(salesOrderData.totalAmount), // Convert to float
            };
    
            // Call the service to create the sales order
            const newSalesOrder = await this.salesOrderService.createSalesOrder(formattedData);
            console.log("New sales order created:", newSalesOrder); // Debugging
    
            // Connect to Kafka producer
            await this.kafkaProducer.connect();
    
            // Publish an event to Kafka
            const event = {
                service: 'order-service',
                event: 'order.created',
                message: `Order ${newSalesOrder.orderId} created`,
                data: newSalesOrder, // Include the order data in the event
            };
            await this.kafkaProducer.publish('order-events', event); // Publish to Kafka
    
            res.status(201).json({ message: "SalesOrder created successfully", data: newSalesOrder });
        } catch (error) {
            console.error("Error in createSalesOrder:", error); // Debugging
            res.status(500).json({ message: "Error creating sales order", error: error.message });
        }
    }

    async updateSalesOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            const updateData = req.body;

            // Format the data (if needed)
            const formattedData = {
                ...updateData,
                ...(updateData.orderDate && { orderDate: new Date(updateData.orderDate).toISOString() }),
                ...(updateData.requiredDate && { requiredDate: new Date(updateData.requiredDate).toISOString() }),
                ...(updateData.customerId && { customerId: parseInt(updateData.customerId, 10) }), // Ensure customerId is an integer
                ...(updateData.totalAmount && { totalAmount: parseFloat(updateData.totalAmount) }),
            };

            // Call the service to update the sales order
            const updatedSalesOrder = await this.salesOrderService.updateSalesOrder(orderId, formattedData);

            res.status(200).json(updatedSalesOrder);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async publishOrderCreatedEvent(newSalesOrder) {
        // Connect to Kafka producer
        await this.kafkaProducer.connect();
    
        // Publish an event to Kafka
        const event = {
            service: 'order-service',
            event: 'order.created',
            message: `Order ${newSalesOrder.orderId} created`,
            data: newSalesOrder, // Include the order data in the event
        };
        await this.kafkaProducer.publish('order-events', event);
    }
}

// Export the class itself
export default SalesOrderController;