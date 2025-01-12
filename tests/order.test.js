const orderController = require('../controllers/orderController');
const orderModel = require('../models/order');

jest.mock('../models/order', () => ({
    add: jest.fn(),
    getByUserId: jest.fn(),
    cancel: jest.fn(),
    getDetails: jest.fn(),
    getAll: jest.fn(),
}));

describe('Order Controller Tests', () => {
    test('should create a new order', async () => {
        orderModel.add.mockResolvedValue({ order_id: 1 });

        const mockRequest = {
            body: { user_id: 1, products: [{ product_id: 1, quantity: 2 }] },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await orderController.addOrder(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ order_id: 1 });
    });

    test('should get all orders', async () => {
        const mockOrders = [
            { order_id: 1, user_id: 1, total: 100 },
            { order_id: 2, user_id: 2, total: 200 },
        ];
        orderModel.getAll.mockResolvedValue(mockOrders);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await orderController.getAllOrders(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockOrders);
    });

    test('should cancel an order', async () => {
        orderModel.cancel.mockResolvedValue(true);

        const mockRequest = { params: { id: 1 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await orderController.cancelOrder(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Order cancelled successfully' });
    });

    test('should get order details', async () => {
        const mockOrderDetails = { order_id: 1, total: 100 };
        orderModel.getDetails.mockResolvedValue(mockOrderDetails);

        const mockRequest = { params: { id: 1 } };
        const mockResponse = {
            json: jest.fn(),
        };

        await orderController.getOrderDetails(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockOrderDetails);
    });

    test('should retrieve orders by user ID', async () => {
        const mockOrders = [
            { order_id: 1, total: 150 },
            { order_id: 2, total: 300 },
        ];
        orderModel.getByUserId.mockResolvedValue(mockOrders);

        const mockRequest = { params: { userId: 1 } };
        const mockResponse = {
            json: jest.fn(),
        };

        await orderController.getOrdersByUserId(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockOrders);
    });

    // Yeni Eklenen Testler
    test('should return 404 for a non-existent order', async () => {
        orderModel.getDetails.mockResolvedValue(null);

        const mockRequest = { params: { id: 999 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await orderController.getOrderDetails(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Order not found' });
    });

    test('should calculate total price correctly', async () => {
        const mockOrderDetails = {
            order_id: 1,
            products: [
                { product_id: 1, price: 100, quantity: 2 },
                { product_id: 2, price: 50, quantity: 3 },
            ],
        };
        orderModel.getDetails.mockResolvedValue(mockOrderDetails);

        const total = mockOrderDetails.products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );

        expect(total).toBe(350);
    });

    test('should handle empty order list', async () => {
        orderModel.getAll.mockResolvedValue([]);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await orderController.getAllOrders(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    test('should handle order creation error', async () => {
        orderModel.add.mockRejectedValue(new Error('Database error'));

        const mockRequest = {
            body: { user_id: 1, products: [{ product_id: 1, quantity: 2 }] },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await orderController.addOrder(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to create order' });
    });

    test('should update order status', async () => {
        orderModel.updateStatus.mockResolvedValue(true);

        const mockRequest = {
            params: { id: 1 },
            body: { status: 'Shipped' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await orderController.updateOrderStatus(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Order status updated successfully' });
    });
});
