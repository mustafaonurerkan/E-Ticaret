const cartController = require('../controllers/cartController');

jest.mock('../db', () => ({
    execute: jest.fn(),
}));

describe('Cart Controller Tests', () => {
    test('should add a product to the cart', async () => {
        const mockCartItem = { user_id: 1, product_id: 2, quantity: 1 };
        jest.spyOn(cartController, 'addToCart').mockResolvedValue({ id: 1, ...mockCartItem });

        const result = await cartController.addToCart(mockCartItem);
        expect(result).toEqual({ id: 1, ...mockCartItem });
        expect(cartController.addToCart).toHaveBeenCalledWith(mockCartItem);
    });

    test('should get all items in a user cart', async () => {
        const mockCartItems = [
            { id: 1, user_id: 1, product_id: 2, quantity: 1 },
            { id: 2, user_id: 1, product_id: 3, quantity: 2 },
        ];
        jest.spyOn(cartController, 'getCartItems').mockResolvedValue(mockCartItems);

        const result = await cartController.getCartItems(1);
        expect(result).toEqual(mockCartItems);
        expect(cartController.getCartItems).toHaveBeenCalledWith(1);
    });

    test('should remove an item from the cart', async () => {
        jest.spyOn(cartController, 'removeFromCart').mockResolvedValue(true);

        const result = await cartController.removeFromCart(1);
        expect(result).toBe(true);
        expect(cartController.removeFromCart).toHaveBeenCalledWith(1);
    });
});
