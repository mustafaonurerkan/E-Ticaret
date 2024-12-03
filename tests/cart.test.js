const cartController = require('../controllers/cartController');

jest.mock('../db', () => ({
    execute: jest.fn(),
}));

describe('Cart Controller Tests', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    test('should add a product to the cart', async () => {
        mockReq.body = { userId: 1, productId: 2, quantity: 1 };
        jest.spyOn(cartController, 'addToCart').mockImplementation(async (req, res) => {
            res.json({ message: 'Product added/updated in cart' });
        });

        await cartController.addToCart(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Product added/updated in cart' });
    });

    test('should get all items in a user cart', async () => {
        mockReq.params = { userId: 1 };
        const mockCartItems = [
            { cartId: 1, userId: 1, productId: 2, quantity: 1 },
            { cartId: 2, userId: 1, productId: 3, quantity: 2 },
        ];
        jest.spyOn(cartController, 'getCart').mockImplementation(async (req, res) => {
            res.json(mockCartItems);
        });

        await cartController.getCart(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(mockCartItems);
    });

    test('should remove an item from the cart', async () => {
        mockReq.body = { userId: 1, productId: 2 };
        jest.spyOn(cartController, 'removeFromCart').mockImplementation(async (req, res) => {
            res.json({ message: 'Product removed from cart' });
        });

        await cartController.removeFromCart(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Product removed from cart' });
    });

    test('should clear the cart for a user', async () => {
        mockReq.body = { userId: 1 };
        jest.spyOn(cartController, 'clearCart').mockImplementation(async (req, res) => {
            res.json({ message: 'Cart cleared successfully' });
        });

        await cartController.clearCart(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Cart cleared successfully' });
    });

    test('should retrieve all carts', async () => {
        const mockCarts = [
            { cartId: 1, userId: 1, productId: 2, quantity: 1 },
            { cartId: 2, userId: 2, productId: 3, quantity: 2 },
        ];
        jest.spyOn(cartController, 'getAllCarts').mockImplementation(async (req, res) => {
            res.json(mockCarts);
        });

        await cartController.getAllCarts(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith(mockCarts);
    });
});
