const Category = require('../models/category'); // Category modelini import et
const pool = require('../db'); // Veritabaný baðlantýsýný import et

jest.mock('../db'); // Veritabaný baðlantýsýný mock'layýn

describe('Category Model CRUD Operations', () => {
    const testCategory = { category_name: 'Electronics' };

    afterAll(async () => {
        await pool.end(); // Testlerden sonra baðlantýyý kapat
    });

    it('should create a new category', async () => {
        const mockInsertResult = { insertId: 1 }; // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]); // Mock execute fonksiyonu

        const categoryId = await Category.create(testCategory);

        expect(categoryId).toBe(1); // Yeni kategori ID'si 1 olmalý
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), [testCategory.category_name]); // SQL sorgusu ve parametrelerin çalýþýp çalýþmadýðýný kontrol et
    });

    it('should get all categories', async () => {
        const mockCategories = [
            { category_id: 1, category_name: 'Electronics' },
            { category_id: 2, category_name: 'Books' },
        ];
        pool.execute.mockResolvedValue([mockCategories]);

        const categories = await Category.getAll();

        expect(categories).toEqual(mockCategories);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM categories;');
    });

    it('should update a category', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan güncelleme sonucu
        pool.execute.mockResolvedValue([mockResult]);

        const updatedName = 'Updated Electronics';
        const result = await Category.update(1, updatedName);

        expect(result).toBe(true); // Güncelleme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), [updatedName, 1]);
    });

    it('should delete a category', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);

        const result = await Category.delete(1);

        expect(result).toBe(true); // Silme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM categories WHERE id = ?;', [1]);
    });
});
