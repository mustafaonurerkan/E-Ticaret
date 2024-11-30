const Wishlist = require('../models/wishlist'); // Do�ru import
const pool = require('../db'); // Veritaban� ba�lant�s�

jest.mock('../db');  // db ba�lant�s�n� mock'lay�n

describe('Wishlist Model CRUD Operations', () => {

    // Test i�in wishlist �rne�i
    const testWishlist = {
        user_id: 1,
        product_id: 1,
    };

    afterAll(async () => {
        await pool.end(); // T�m testlerden sonra ba�lant�y� kapat
    });

    it('should create a new wishlist item', async () => {
        const mockInsertResult = { insertId: 1 };  // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]);  // execute fonksiyonunu mock'la

        const result = await Wishlist.add(testWishlist);

        expect(result).toBe(1);  // Yeni kayd�n ID'si 1 olmal�
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // execute �a�r�ld� m�
    });

    it('should get wishlist items by user ID', async () => {
        const mockWishlistItems = [
            { wishlist_id: 1, user_id: 1, product_id: 1 },
            { wishlist_id: 2, user_id: 1, product_id: 2 },
        ];
        pool.execute.mockResolvedValue([mockWishlistItems]);  // execute fonksiyonunu mock'la

        const items = await Wishlist.getByUserId(1);

        expect(items).toEqual(mockWishlistItems);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM wishlists WHERE user_id = ?;', [1]);  // do�ru sorgu
    });

    it('should delete a wishlist item by ID', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // execute fonksiyonunu mock'la

        const result = await Wishlist.delete(1);

        expect(result).toBe(true);  // Silme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM wishlists WHERE wishlist_id = ?;', [1]);  // do�ru sorgu
    });
});
