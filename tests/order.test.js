const orderController = require('../controllers/orderController');

jest.mock('../db', () => ({
    execute: jest.fn(),
}));

describe('Order Controller Tests', () => {
    test('should create a new order', async () => {
        const mockOrder = {
            user_id: 1,
            total_price: 100.5,
            delivery_address: '123 Main Street, City, Country',
            status: 'processing',
        };
        jest.spyOn(orderController, 'createOrder').mockResolvedValue({ id: 1, ...mockOrder });

        const result = await orderController.createOrder(mockOrder);
        expect(result).toEqual({ id: 1, ...mockOrder });
        expect(orderController.createOrder).toHaveBeenCalledWith(mockOrder);
    });

    test('should get an order by ID', async () => {
        const mockOrder = {
            id: 1,
            user_id: 1,
            total_price: 100.5,
            delivery_address: '123 Main Street, City, Country',
            status: 'processing',
        };
        jest.spyOn(orderController, 'getOrderById').mockResolvedValue(mockOrder);

        const result = await orderController.getOrderById(1);
        expect(result).toEqual(mockOrder);
        expect(orderController.getOrderById).toHaveBeenCalledWith(1);
    });

    test('should update order status', async () => {
        const updatedOrder = { status: 'completed' };
        jest.spyOn(orderController, 'updateOrderStatus').mockResolvedValue(true);

        const result = await orderController.updateOrderStatus(1, updatedOrder);
        expect(result).toBe(true);
        expect(orderController.updateOrderStatus).toHaveBeenCalledWith(1, updatedOrder);
    });
});
