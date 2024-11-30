const Wishlist = require('../models/wishlist'); // Doðru import
const pool = require('../db'); // Veritabaný baðlantýsý

jest.mock('../db');  // db baðlantýsýný mock'layýn

describe('Wishlist Model CRUD Operations', () => {

    // Test için wishlist örneði
    const testWishlist = {
        user_id: 1,
        product_id: 1,
    };

    afterAll(async () => {
        await pool.end(); // Tüm testlerden sonra baðlantýyý kapat
    });

    it('should create a new wishlist item', async () => {
        const mockInsertResult = { insertId: 1 };  // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]);  // execute fonksiyonunu mock'la

        const result = await Wishlist.add(testWishlist);

        expect(result).toBe(1);  // Yeni kaydýn ID'si 1 olmalý
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // execute çaðrýldý mý
    });

    it('should get wishlist items by user ID', async () => {
        const mockWishlistItems = [
            { wishlist_id: 1, user_id: 1, product_id: 1 },
            { wishlist_id: 2, user_id: 1, product_id: 2 },
        ];
        pool.execute.mockResolvedValue([mockWishlistItems]);  // execute fonksiyonunu mock'la

        const items = await Wishlist.getByUserId(1);

        expect(items).toEqual(mockWishlistItems);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM wishlists WHERE user_id = ?;', [1]);  // doðru sorgu
    });

    it('should delete a wishlist item by ID', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // execute fonksiyonunu mock'la

        const result = await Wishlist.delete(1);

        expect(result).toBe(true);  // Silme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM wishlists WHERE wishlist_id = ?;', [1]);  // doðru sorgu
    });
});
