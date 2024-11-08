const Cart = require('../models/cart'); // Cart modelini import et
const pool = require('../db'); // Veritabaný baðlantýsýný import et

jest.mock('../db'); // Veritabaný baðlantýsýný mock'layýn

describe('Cart Model CRUD Operations', () => {
    afterAll(async () => {
        await pool.end(); // Testlerden sonra baðlantýyý kapat
    });

    it('should add a product to the cart or update quantity if already exists', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;
        const productId = 10;
        const quantity = 3;

        const result = await Cart.addToCart(userId, productId, quantity);

        expect(result).toBe(true); // Güncelleme veya ekleme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu çaðrýldý mý
            [userId, productId, quantity, quantity] // Doðru parametrelerle çalýþtý mý
        );
    });

    it('should get all products in the cart for a user', async () => {
        const mockCartItems = [
            { cart_id: 1, user_id: 1, product_id: 10, quantity: 3, name: 'Product A', price: 100 },
            { cart_id: 2, user_id: 1, product_id: 20, quantity: 2, name: 'Product B', price: 200 },
        ];
        pool.execute.mockResolvedValue([mockCartItems]); // Mock execute fonksiyonu

        const userId = 1;
        const result = await Cart.getByUserId(userId);

        expect(result).toEqual(mockCartItems); // Sepetteki ürünler doðru dönmeli
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu çaðrýldý mý
            [userId] // Doðru parametreyle çalýþtý mý
        );
    });

    it('should update the quantity of a product in the cart', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;
        const productId = 10;
        const quantity = 5;

        const result = await Cart.updateQuantity(userId, productId, quantity);

        expect(result).toBe(true); // Güncelleme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu çaðrýldý mý
            [quantity, userId, productId] // Doðru parametrelerle çalýþtý mý
        );
    });

    it('should remove a product from the cart', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;
        const productId = 10;

        const result = await Cart.removeFromCart(userId, productId);

        expect(result).toBe(true); // Silme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu çaðrýldý mý
            [userId, productId] // Doðru parametrelerle çalýþtý mý
        );
    });

    it('should clear all products from a user\'s cart', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;

        const result = await Cart.clearCart(userId);

        expect(result).toBe(true); // Sepet temizleme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu çaðrýldý mý
            [userId] // Doðru parametreyle çalýþtý mý
        );
    });
});
