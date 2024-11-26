const pool = require('../db'); // Veritabaný baðlantýsý
const Order = require('../models/order'); // Order Modeli
const orderController = require('../controllers/orderController'); // Order Controller

jest.mock('../db'); // Veritabaný baðlantýsýný mock'la

describe('Order Model and Controller Integration', () => {
    let req, res;

    beforeEach(() => {
        req = {}; // Mock request
        res = {
            status: jest.fn().mockReturnThis(), // Chaining için mock
            json: jest.fn(),
        }; // Mock response

        jest.clearAllMocks(); // Mock'larý temizle
    });

    describe('Create Order', () => {
        it('should create a new order via controller and return the orderId', async () => {
            const mockOrderResult = [{ insertId: 1 }];
            const mockProductUpdateResult = [{ affectedRows: 1 }];

            // Mock database transaction methods
            const mockConnection = {
                execute: jest
                    .fn()
                    .mockResolvedValueOnce(mockOrderResult) // Order ekleme
                    .mockResolvedValueOnce(mockProductUpdateResult) // Stok güncelleme
                    .mockResolvedValueOnce([]), // Order item ekleme
                beginTransaction: jest.fn(),
                commit: jest.fn(),
                rollback: jest.fn(),
                release: jest.fn(),
            };

            pool.getConnection.mockResolvedValue(mockConnection);

            req.body = {
                user_id: 1,
                total_price: 100,
                status: 'pending',
                delivery_address: '123 Example St',
                items: [{ product_id: 1, quantity: 2, price: 50 }],
            };

            await orderController.createOrder(req, res);

            expect(pool.getConnection).toHaveBeenCalled();
            expect(mockConnection.execute).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(Array)
            );
            expect(mockConnection.commit).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ orderId: 1 });
        });

        it('should rollback transaction if stock is insufficient', async () => {
            const mockOrderResult = [{ insertId: 1 }];
            const mockProductUpdateResult = [{ affectedRows: 0 }]; // Stok yetersiz

            const mockConnection = {
                execute: jest
                    .fn()
                    .mockResolvedValueOnce(mockOrderResult)
                    .mockResolvedValueOnce(mockProductUpdateResult), // Stok güncelleme hatasý
                beginTransaction: jest.fn(),
                commit: jest.fn(),
                rollback: jest.fn(),
                release: jest.fn(),
            };

            pool.getConnection.mockResolvedValue(mockConnection);

            req.body = {
                user_id: 1,
                total_price: 100,
                status: 'pending',
                delivery_address: '123 Example St',
                items: [{ product_id: 1, quantity: 10, price: 50 }],
            };

            await orderController.createOrder(req, res);

            expect(mockConnection.rollback).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Could not create order' });
        });
    });

    describe('Get Orders', () => {
        it('should fetch all orders via controller', async () => {
            const mockOrders = [
                { order_id: 1, total_price: 100, status: 'pending', delivery_address: '123 Example St' },
            ];
            pool.execute.mockResolvedValue([mockOrders]);

            await orderController.getAllOrders(req, res);

            expect(Order.getAll).toBeDefined();
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        });

        it('should fetch a specific order by ID', async () => {
            req.params = { id: 1 };
            const mockOrder = { order_id: 1, total_price: 100 };
            pool.execute.mockResolvedValue([[mockOrder]]);

            await orderController.getOrderById(req, res);

            expect(Order.getById).toBeDefined();
            expect(res.json).toHaveBeenCalledWith(mockOrder);
        });

        it('should return 404 if order is not found', async () => {
            req.params = { id: 1 };
            pool.execute.mockResolvedValue([[]]);

            await orderController.getOrderById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
        });
    });

    describe('Update Order Status', () => {
        it('should update the order status successfully', async () => {
            req.params = { id: 1 };
            req.body = { status: 'completed' };
            pool.execute.mockResolvedValue([{ affectedRows: 1 }]);

            await orderController.updateOrderStatus(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Order status updated successfully' });
        });

        it('should return 404 if order is not found during update', async () => {
            req.params = { id: 1 };
            req.body = { status: 'completed' };
            pool.execute.mockResolvedValue([{ affectedRows: 0 }]);

            await orderController.updateOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
        });
    });

    describe('Delete Order', () => {
        it('should delete the order successfully', async () => {
            req.params = { id: 1 };
            pool.execute.mockResolvedValue([{ affectedRows: 1 }]);

            await orderController.deleteOrder(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Order deleted successfully' });
        });

        it('should return 404 if order is not found during deletion', async () => {
            req.params = { id: 1 };
            pool.execute.mockResolvedValue([{ affectedRows: 0 }]);

            await orderController.deleteOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Order not found' });
        });
    });
});
