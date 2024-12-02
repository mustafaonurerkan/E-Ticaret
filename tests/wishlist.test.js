const wishlistController = require('../controllers/wishlistController');

jest.mock('../db', () => ({
    execute: jest.fn(),
}));

describe('Wishlist Controller Tests', () => {
    test('should add a product to the wishlist', async () => {
        const mockWishlistItem = { user_id: 1, product_id: 2 };
        jest.spyOn(wishlistController, 'addToWishlist').mockResolvedValue({ id: 1, ...mockWishlistItem });

        const result = await wishlistController.addToWishlist(mockWishlistItem);
        expect(result).toEqual({ id: 1, ...mockWishlistItem });
        expect(wishlistController.addToWishlist).toHaveBeenCalledWith(mockWishlistItem);
    });

    test('should get all items in a user wishlist', async () => {
        const mockWishlistItems = [
            { id: 1, user_id: 1, product_id: 2 },
            { id: 2, user_id: 1, product_id: 3 },
        ];
        jest.spyOn(wishlistController, 'getWishlistItems').mockResolvedValue(mockWishlistItems);

        const result = await wishlistController.getWishlistItems(1);
        expect(result).toEqual(mockWishlistItems);
        expect(wishlistController.getWishlistItems).toHaveBeenCalledWith(1);
    });

    test('should remove an item from the wishlist', async () => {
        jest.spyOn(wishlistController, 'removeFromWishlist').mockResolvedValue(true);

        const result = await wishlistController.removeFromWishlist(1);
        expect(result).toBe(true);
        expect(wishlistController.removeFromWishlist).toHaveBeenCalledWith(1);
    });
});
