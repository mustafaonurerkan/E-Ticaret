const Cart = require('../models/cart'); // Cart modelini import et
const pool = require('../db'); // Veritaban� ba�lant�s�n� import et

jest.mock('../db'); // Veritaban� ba�lant�s�n� mock'lay�n

describe('Cart Model CRUD Operations', () => {
    afterAll(async () => {
        await pool.end(); // Testlerden sonra ba�lant�y� kapat
    });

    it('should add a product to the cart or update quantity if already exists', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;
        const productId = 10;
        const quantity = 3;

        const result = await Cart.addToCart(userId, productId, quantity);

        expect(result).toBe(true); // G�ncelleme veya ekleme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu �a�r�ld� m�
            [userId, productId, quantity, quantity] // Do�ru parametrelerle �al��t� m�
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

        expect(result).toEqual(mockCartItems); // Sepetteki �r�nler do�ru d�nmeli
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu �a�r�ld� m�
            [userId] // Do�ru parametreyle �al��t� m�
        );
    });

    it('should update the quantity of a product in the cart', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;
        const productId = 10;
        const quantity = 5;

        const result = await Cart.updateQuantity(userId, productId, quantity);

        expect(result).toBe(true); // G�ncelleme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu �a�r�ld� m�
            [quantity, userId, productId] // Do�ru parametrelerle �al��t� m�
        );
    });

    it('should remove a product from the cart', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;
        const productId = 10;

        const result = await Cart.removeFromCart(userId, productId);

        expect(result).toBe(true); // Silme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu �a�r�ld� m�
            [userId, productId] // Do�ru parametrelerle �al��t� m�
        );
    });

    it('should clear all products from a user\'s cart', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan etki sonucu
        pool.execute.mockResolvedValue([mockResult]); // Mock execute fonksiyonu

        const userId = 1;

        const result = await Cart.clearCart(userId);

        expect(result).toBe(true); // Sepet temizleme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith(
            expect.any(String), // SQL sorgusu �a�r�ld� m�
            [userId] // Do�ru parametreyle �al��t� m�
        );
    });
});
