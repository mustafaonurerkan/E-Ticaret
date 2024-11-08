const User = require('../models/user'); // Modeli doðru import edin
const pool = require('../db'); // Veritabaný baðlantýsý

// Mock database connection
jest.mock('../db');  // db baðlantýsýný mock'layacaðýz

describe('User Model CRUD Operations', () => {

    // Test için kullanýcý verisi
    const testUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'securepassword',
        role: 'customer',
        tax_id: '1234567890',
        address: '123 Main St',
    };

    // Test sonrasý veritabaný baðlantýsýný kapat
    afterAll(() => {
        pool.end(); // Veritabaný baðlantýsýný kapatma
    });

    it('should create a new user', async () => {
        const mockInsertResult = { insertId: 1 };  // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]);  // Mock execute fonksiyonu

        const result = await User.create(testUser);

        expect(result).toBe(1);  // Yeni kaydýn ID'si 1 olmalý
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // execute çaðrýldý mý
    });

    it('should get all users', async () => {
        const mockUsers = [
            { user_id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { user_id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        ];
        pool.execute.mockResolvedValue([mockUsers]);  // Mock execute fonksiyonu

        const users = await User.getAll();

        expect(users).toEqual(mockUsers);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM users;');  // doðru SQL sorgusu çalýþtý mý
    });

    it('should get user by ID', async () => {
        const mockUser = { user_id: 1, name: 'John Doe', email: 'john.doe@example.com' };
        pool.execute.mockResolvedValue([[mockUser]]);  // Mock execute fonksiyonu

        const user = await User.getById(1);

        expect(user).toEqual(mockUser);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM users WHERE user_id = ?;', [1]);  // doðru sorgu ve parametre
    });

    it('should update a user', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan güncelleme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // Mock execute fonksiyonu

        const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
        const result = await User.update(1, updatedUser);

        expect(result).toBe(true);  // Güncelleme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // doðru parametreler
    });

    it('should delete a user', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // Mock execute fonksiyonu

        const result = await User.delete(1);

        expect(result).toBe(true);  // Silme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM users WHERE user_id = ?;', [1]);  // doðru sorgu
    });
});
