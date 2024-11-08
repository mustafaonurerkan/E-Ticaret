const Order = require('../models/order'); // Order modelini import et
const pool = require('../db'); // Veritabaný baðlantýsýný import et

jest.mock('../db'); // Veritabaný baðlantýsýný mock'layýn

describe('Order Model CRUD Operations', () => {
    const testOrder = {
        user_id: 1,
        total_price: 150.00,
        status: 'processing',
        delivery_address: '123 Test Street',
        items: [
            { product_id: 1, quantity: 2, price: 50.00 },
            { product_id: 2, quantity: 1, price: 50.00 }
        ]
    };

    afterAll(async () => {
        await pool.end(); // Testlerden sonra baðlantýyý kapat
    });

    it('should create a new order', async () => {
        const mockOrderResult = { insertId: 1 }; // Mocklanan order insertId
        const mockProductUpdateResult = { affectedRows: 1 }; // Mocklanan ürün stok güncelleme sonucu
        pool.getConnection.mockResolvedValue({
            beginTransaction: jest.fn(),
            execute: jest.fn()
                .mockResolvedValueOnce([mockOrderResult]) // Order ekleme
                .mockResolvedValue([mockProductUpdateResult]), // Stok güncelleme ve order_items ekleme
            commit: jest.fn(),
            rollback: jest.fn(),
            release: jest.fn(),
        });

        const orderId = await Order.create(testOrder);

        expect(orderId).toBe(1);
        expect(pool.getConnection).toHaveBeenCalled();
    });

    it('should get all orders', async () => {
        const mockOrders = [
            { order_id: 1, user_id: 1, total_price: 150.00, status: 'processing', delivery_address: '123 Test Street' },
            { order_id: 2, user_id: 2, total_price: 200.00, status: 'in-transit', delivery_address: '456 Test Avenue' },
        ];
        pool.execute.mockResolvedValue([mockOrders]);

        const orders = await Order.getAll();

        expect(orders).toEqual(mockOrders);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM orders;');
    });

    it('should get an order by ID', async () => {
        const mockOrder = { order_id: 1, user_id: 1, total_price: 150.00, status: 'processing', delivery_address: '123 Test Street' };
        pool.execute.mockResolvedValue([[mockOrder]]);

        const order = await Order.getById(1);

        expect(order).toEqual(mockOrder);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM orders WHERE id = ?;', [1]);
    });

    it('should update an order status', async () => {
        const mockResult = { affectedRows: 1 };
        pool.execute.mockResolvedValue([mockResult]);

        const result = await Order.update(1, 'in-transit');

        expect(result).toBe(true);
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    });

    it('should delete an order', async () => {
        const mockResult = { affectedRows: 1 };
        pool.execute.mockResolvedValue([mockResult]);

        const result = await Order.delete(1);

        expect(result).toBe(true);
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM orders WHERE id = ?;', [1]);
    });
});
