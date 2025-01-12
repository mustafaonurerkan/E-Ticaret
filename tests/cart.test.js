const cartController = require('../controllers/cartController');
const cartModel = require('../models/cart');

jest.mock('../models/cart', () => ({
    add: jest.fn(),
    getCartByUserId: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
    updateQuantity: jest.fn(),
}));

describe('Cart Controller Tests', () => {
    test('should add a product to the cart', async () => {
        cartModel.add.mockResolvedValue(true);

        const mockRequest = {
            body: { user_id: 1, product_id: 2, quantity: 1 },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await cartController.addToCart(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Product added/updated in cart' });
    });

    test('should get all items in a user cart', async () => {
        const mockCartItems = [
            { id: 1, user_id: 1, product_id: 2, quantity: 1 },
            { id: 2, user_id: 1, product_id: 3, quantity: 2 },
        ];
        cartModel.getCartByUserId.mockResolvedValue(mockCartItems);

        const mockRequest = { params: { userId: 1 } };
        const mockResponse = {
            json: jest.fn(),
        };

        await cartController.getCart(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockCartItems);
    });

    test('should remove an item from the cart', async () => {
        cartModel.delete.mockResolvedValue(true);

        const mockRequest = {
            params: { id: 1 },
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await cartController.removeFromCart(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item removed from cart' });
    });

    test('should clear the cart for a user', async () => {
        cartModel.clear.mockResolvedValue(true);

        const mockRequest = { params: { userId: 1 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await cartController.clearCart(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Cart cleared successfully' });
    });

    test('should update quantity of an item in the cart', async () => {
        cartModel.updateQuantity.mockResolvedValue(true);

        const mockRequest = {
            params: { id: 1 },
            body: { quantity: 5 },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await cartController.updateQuantity(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Quantity updated successfully' });
    });

    // Yeni Eklenen Testler
    test('should handle adding product to cart with invalid data', async () => {
        const mockRequest = {
            body: { user_id: null, product_id: null, quantity: null },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await cartController.addToCart(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid data' });
    });

    test('should return empty array for empty cart', async () => {
        cartModel.getCartByUserId.mockResolvedValue([]);

        const mockRequest = { params: { userId: 1 } };
        const mockResponse = {
            json: jest.fn(),
        };

        await cartController.getCart(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    test('should return 404 for non-existent cart item', async () => {
        cartModel.delete.mockResolvedValue(false);

        const mockRequest = { params: { id: 999 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await cartController.removeFromCart(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Item not found' });
    });

    test('should validate quantity during update', async () => {
        cartModel.updateQuantity.mockResolvedValue(false);

        const mockRequest = {
            params: { id: 1 },
            body: { quantity: -5 },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await cartController.updateQuantity(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid quantity' });
    });

    test('should retrieve all cart items for admin', async () => {
        const mockCartItems = [
            { id: 1, user_id: 1, product_id: 2, quantity: 1 },
            { id: 2, user_id: 2, product_id: 3, quantity: 2 },
        ];
        cartModel.getAll.mockResolvedValue(mockCartItems);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await cartController.getAllCarts(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockCartItems);
    });
});
