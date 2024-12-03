const wishlistController = require('../controllers/wishlistController');
const wishlistModel = require('../models/wishlist');

jest.mock('../models/wishlist', () => ({
    add: jest.fn(),
    getByUserId: jest.fn(),
    delete: jest.fn(),
    getByName: jest.fn(),
    getAll: jest.fn(),
}));

describe('Wishlist Controller Tests', () => {
    test('should add a product to the wishlist', async () => {
        wishlistModel.add.mockResolvedValue(true);

        const mockRequest = {
            body: {
                user_id: 1,
                product_id: 2,
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await wishlistController.addToWishlist(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Product added to wishlist' });
    });

    test('should get all items in a user wishlist', async () => {
        const mockWishlistItems = [
            { product_id: 1, name: 'Product A', price: 100 },
            { product_id: 2, name: 'Product B', price: 200 },
        ];
        wishlistModel.getByUserId.mockResolvedValue(mockWishlistItems);

        const mockRequest = {
            params: {
                userId: 1,
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };

        await wishlistController.getWishlistByUserId(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockWishlistItems);
    });

    test('should remove an item from the wishlist', async () => {
        wishlistModel.delete.mockResolvedValue(true);

        const mockRequest = {
            params: {
                id: 1,
            },
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await wishlistController.deleteWishlistItem(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Wishlist item deleted successfully' });
    });

    test('should retrieve wishlist items by name', async () => {
        const mockWishlistItems = [
            { product_id: 1, name: 'Product A', price: 100 },
        ];
        wishlistModel.getByName.mockResolvedValue(mockWishlistItems);

        const mockRequest = {
            params: {
                userId: 1,
            },
            query: {
                name: 'Product A',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };

        await wishlistController.getByName(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockWishlistItems);
    });

    test('should retrieve all wishlist items', async () => {
        const mockWishlistItems = [
            { wishlist_id: 1, user_id: 1, product_id: 2 },
            { wishlist_id: 2, user_id: 1, product_id: 3 },
        ];
        wishlistModel.getAll.mockResolvedValue(mockWishlistItems);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await wishlistController.getAllWishes(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockWishlistItems);
    });
});
