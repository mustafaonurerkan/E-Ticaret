const Product = require('../models/product'); // Product modelini import et
const pool = require('../db'); // Veritabaný baðlantýsý

jest.mock('../db');  // Veritabaný baðlantýsýný mock'layýn

describe('Product Model CRUD Operations', () => {

    const testProduct = {
        name: 'Product Name',
        model: 'Model X',
        serial_number: 'SN12345',
        description: 'Product description',
        quantity_in_stock: 100,
        price: 199.99,
        warranty_status: true,
        distributor_info: 'Distributor Info',
        category_id: 1,
    };

    afterAll(async () => {
        await pool.end(); // Testlerden sonra baðlantýyý kapat
    });

    it('should create a new product', async () => {
        const mockInsertResult = { insertId: 1 };  // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]);  // execute fonksiyonunu mock'la

        const result = await Product.create(testProduct);

        expect(result).toBe(1);  // Yeni kaydýn ID'si 1 olmalý
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // doðru parametreler
    });

    it('should get all products', async () => {
        const mockProducts = [
            { product_id: 1, name: 'Product A', price: 99.99 },
            { product_id: 2, name: 'Product B', price: 149.99 },
        ];
        pool.execute.mockResolvedValue([mockProducts]);  // execute fonksiyonunu mock'la

        const products = await Product.getAll();

        expect(products).toEqual(mockProducts);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM products;');  // doðru sorgu
    });

    it('should get a product by ID', async () => {
        const mockProduct = { product_id: 1, name: 'Product A', price: 99.99 };
        pool.execute.mockResolvedValue([[mockProduct]]);  // execute fonksiyonunu mock'la

        const product = await Product.getById(1);

        expect(product).toEqual(mockProduct);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM products WHERE id = ?;', [1]);  // doðru sorgu
    });

    it('should update a product', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan güncelleme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // execute fonksiyonunu mock'la

        const updatedProduct = { ...testProduct, name: 'Updated Product Name' };
        const result = await Product.update(1, updatedProduct);

        expect(result).toBe(true);  // Güncelleme baþarýlýysa true döner
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // doðru parametreler
    });

    it('should delete a product by ID', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // execute fonksiyonunu mock'la

        const result = await Product.delete(1);

        expect(result).toBe(true);  // Silme baþarýlýysa true döner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM products WHERE id = ?;', [1]);  // doðru sorgu
    });
});
