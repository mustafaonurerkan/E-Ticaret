const productController = require('../controllers/productController');

jest.mock('../db', () => ({
    execute: jest.fn(),
}));

describe('Product Controller Tests', () => {
    test('should create a new product', async () => {
        const mockProduct = { name: 'Product A', price: 100.0 };
        jest.spyOn(productController, 'createProduct').mockResolvedValue({ id: 1, ...mockProduct });

        const result = await productController.createProduct(mockProduct);
        expect(result).toEqual({ id: 1, ...mockProduct });
        expect(productController.createProduct).toHaveBeenCalledWith(mockProduct);
    });

    test('should get a product by ID', async () => {
        const mockProduct = { id: 1, name: 'Product A', price: 100.0 };
        jest.spyOn(productController, 'getProductById').mockResolvedValue(mockProduct);

        const result = await productController.getProductById(1);
        expect(result).toEqual(mockProduct);
        expect(productController.getProductById).toHaveBeenCalledWith(1);
    });

    test('should delete a product', async () => {
        jest.spyOn(productController, 'deleteProduct').mockResolvedValue(true);

        const result = await productController.deleteProduct(1);
        expect(result).toBe(true);
        expect(productController.deleteProduct).toHaveBeenCalledWith(1);
    });
              
    // Belirli bir kategorideki ürünleri listeleme
    test('should get products by category', async () => {
        const mockCategory = 'electronics';
        const mockProducts = [
            { id: 1, name: 'Phone', category: 'electronics', price: 699.99 },
            { id: 2, name: 'Laptop', category: 'electronics', price: 1299.99 },
        ];

        jest.spyOn(productController, 'getByCategory').mockResolvedValue(mockProducts);

        const result = await productController.getByCategory({ params: { category: mockCategory } });
        expect(result).toEqual(mockProducts);
        expect(productController.getByCategory).toHaveBeenCalledWith({ params: { category: mockCategory } });
    });

    test('should search for products by key', async () => {
        const mockKey = 'phone';
        const mockProducts = [
            { id: 1, name: 'Phone A', price: 500 },
            { id: 2, name: 'Phone B', price: 700 },
        ];

        jest.spyOn(productController, 'searchProducts').mockResolvedValue(mockProducts);

        const result = await productController.searchProducts({ params: { key: mockKey } });
        expect(result).toEqual(mockProducts);
        expect(productController.searchProducts).toHaveBeenCalledWith({ params: { key: mockKey } });
    });
});
