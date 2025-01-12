const wishlistController = require('../controllers/wishlistController');
const wishlistModel = require('../models/wishlist');

jest.mock('../models/wishlist', () => ({
    add: jest.fn(),
    getByUserId: jest.fn(),
    delete: jest.fn(),
    getByName: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    getByCategory: jest.fn(),
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

    test('should return empty wishlist for a user with no items', async () => {
        wishlistModel.getByUserId.mockResolvedValue([]);

        const mockRequest = {
            params: {
                userId: 99,
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };

        await wishlistController.getWishlistByUserId(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    test('should not allow duplicate products in wishlist', async () => {
        wishlistModel.add.mockResolvedValue(null);

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

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Product already in wishlist' });
    });

    test('should update wishlist item details', async () => {
        wishlistModel.update.mockResolvedValue(true);

        const mockRequest = {
            params: { id: 1 },
            body: { newDetails: { product_id: 3 } },
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await wishlistController.updateWishlistItem(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Wishlist item updated successfully' });
    });

    test('should return error for deleting wishlist of non-existent user', async () => {
        wishlistModel.delete.mockResolvedValue(false);

        const mockRequest = {
            params: { id: 99 },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await wishlistController.deleteWishlistItem(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Wishlist item not found' });
    });

    test('should retrieve wishlist items by category', async () => {
        const mockWishlistItems = [
            { product_id: 1, name: 'Product A', category: 'Electronics', price: 100 },
        ];
        wishlistModel.getByCategory.mockResolvedValue(mockWishlistItems);

        const mockRequest = {
            params: {
                userId: 1,
            },
            query: {
                category: 'Electronics',
            },
        };
        const mockResponse = {
            json: jest.fn(),
        };

        await wishlistController.getByCategory(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockWishlistItems);
    });
});
