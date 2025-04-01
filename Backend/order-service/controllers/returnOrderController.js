import ReturnOrderService from '../services/returnOrderService.js';
// import KafkaProducer from '../kafka/kafkaProducer.js';

class ReturnOrderController {
    constructor() {
        this.returnOrderService = new ReturnOrderService();
        // this.kafkaProducer = KafkaProducer;
    }

    async createReturnOrder(req, res) {
        try {
            const returnOrderData = req.body;
            console.log("Received return order data:", returnOrderData);

            // Validate required fields
            if (!returnOrderData.orderId) {
                return res.status(400).json({ error: 'Original sales order ID is required' });
            }

            // Format the data
            const formattedData = {
                ...returnOrderData,
                returnDate: returnOrderData.returnDate ? new Date(returnOrderData.returnDate).toISOString() : new Date().toISOString(),
                approvalStatus: returnOrderData.approvalStatus || 'Pending',
                returnStatus: returnOrderData.returnStatus || 'Requested'
            };

            const newReturnOrder = await this.returnOrderService.createReturnOrder(formattedData);

            // Publish Kafka event
            // await this.publishReturnOrderCreatedEvent(newReturnOrder);

            res.status(201).json({
                message: "Return order created successfully",
                data: newReturnOrder
            });
        } catch (error) {
            console.error("Error creating return order:", error);
            res.status(500).json({ error: error.message });
        }
    }

    async getAllReturnOrders(req, res) {
        try {
            const returnOrders = await this.returnOrderService.getAllReturnOrders();
            res.json(returnOrders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getReturnOrderById(req, res) {
        try {
            const { returnOrderId } = req.params;
            
            if (!returnOrderId) {
                return res.status(400).json({ error: 'Return order ID is required' });
            }

            const returnOrder = await this.returnOrderService.getReturnOrderById(returnOrderId);
            
            if (!returnOrder) {
                return res.status(404).json({ error: 'Return order not found' });
            }

            res.json(returnOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getReturnOrderByIdAndCustomer(req, res) {
    try {
        const { returnOrderId, customerId } = req.params;
        const returnOrder = await this.returnOrderService.getReturnOrderByIdAndCustomer(
            returnOrderId, 
            customerId
        );
        res.status(200).json(returnOrder);
    } catch (error) {
        console.error('Error in getReturnOrderByIdAndCustomer:', error);
        res.status(404).json({ 
            error: error.message,
            details: `Failed to fetch return order ${req.params.returnOrderId} for customer ${req.params.customerId}`
        });
    }
}

    async updateReturnOrder(req, res) {
        try {
            const { returnOrderId } = req.params;
            const updateData = req.body;

            if (!returnOrderId) {
                return res.status(400).json({ error: 'Return order ID is required' });
            }

            // Prevent updating certain fields
            const { customerId, orderId, productId, ...safeUpdateData } = updateData;

            const updatedReturnOrder = await this.returnOrderService.updateReturnOrder(returnOrderId, safeUpdateData);

            // Publish Kafka event
            // await this.publishReturnOrderModifiedEvent(updatedReturnOrder);

            res.json(updatedReturnOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // async publishReturnOrderCreatedEvent(newReturnOrder) {
    //     await this.kafkaProducer.connect();
    //     const event = {
    //         service: 'order-service',
    //         event: 'return_order.created',
    //         message: `Return order ${newReturnOrder.returnOrderId} created`,
    //         data: newReturnOrder,
    //     };
    //     await this.kafkaProducer.publish('order-events', event);
    // }

    // async publishReturnOrderModifiedEvent(updatedReturnOrder) {
    //     await this.kafkaProducer.connect();
    //     const event = {
    //         service: 'order-service',
    //         event: 'return_order.modified',
    //         message: `Return order ${updatedReturnOrder.returnOrderId} modified`,
    //         data: updatedReturnOrder,
    //     };
    //     await this.kafkaProducer.publish('order-events', event);
    // }
}

export default ReturnOrderController;