const categoryController = require('../controllers/categoryController');
const categoryModel = require('../models/category');

jest.mock('../models/category', () => ({
    add: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
}));

describe('Category Controller Tests', () => {
    test('should add a new category', async () => {
        categoryModel.add.mockResolvedValue({ category_id: 1 });

        const mockRequest = {
            body: { name: 'Electronics', description: 'Devices and gadgets' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.addCategory(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ category_id: 1 });
    });

    test('should retrieve all categories', async () => {
        const mockCategories = [
            { category_id: 1, name: 'Electronics' },
            { category_id: 2, name: 'Clothing' },
        ];
        categoryModel.getAll.mockResolvedValue(mockCategories);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await categoryController.getCategories(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockCategories);
    });

    test('should retrieve a category by ID', async () => {
        const mockCategory = { category_id: 1, name: 'Electronics' };
        categoryModel.getById.mockResolvedValue(mockCategory);

        const mockRequest = { params: { id: 1 } };
        const mockResponse = {
            json: jest.fn(),
        };

        await categoryController.getCategoryById(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    test('should delete a category', async () => {
        categoryModel.delete.mockResolvedValue(true);

        const mockRequest = { params: { id: 1 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.deleteCategory(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
    });

    test('should update a category', async () => {
        categoryModel.update.mockResolvedValue(true);

        const mockRequest = {
            params: { id: 1 },
            body: { name: 'Updated Electronics' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.updateCategory(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Category updated successfully' });
    });

    // Yeni Eklenen Testler
    test('should handle invalid category creation', async () => {
        const mockRequest = {
            body: { name: '', description: '' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.addCategory(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid category data' });
    });

    test('should return empty array for no categories', async () => {
        categoryModel.getAll.mockResolvedValue([]);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await categoryController.getCategories(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    test('should handle non-existent category retrieval', async () => {
        categoryModel.getById.mockResolvedValue(null);

        const mockRequest = { params: { id: 999 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.getCategoryById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Category not found' });
    });

    test('should handle category deletion error', async () => {
        categoryModel.delete.mockResolvedValue(false);

        const mockRequest = { params: { id: 999 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.deleteCategory(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to delete category' });
    });

    test('should handle invalid category update', async () => {
        categoryModel.update.mockResolvedValue(false);

        const mockRequest = {
            params: { id: 1 },
            body: { name: '' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await categoryController.updateCategory(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid category data' });
    });
});
