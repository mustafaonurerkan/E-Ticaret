const User = require('../models/user'); // Modeli do�ru import edin
const pool = require('../db'); // Veritaban� ba�lant�s�

// Mock database connection
jest.mock('../db');  // db ba�lant�s�n� mock'layaca��z

describe('User Model CRUD Operations', () => {

    // Test i�in kullan�c� verisi
    const testUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'securepassword',
        role: 'customer',
        tax_id: '1234567890',
        address: '123 Main St',
    };

    // Test sonras� veritaban� ba�lant�s�n� kapat
    afterAll(() => {
        pool.end(); // Veritaban� ba�lant�s�n� kapatma
    });

    it('should create a new user', async () => {
        const mockInsertResult = { insertId: 1 };  // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]);  // Mock execute fonksiyonu

        const result = await User.create(testUser);

        expect(result).toBe(1);  // Yeni kayd�n ID'si 1 olmal�
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // execute �a�r�ld� m�
    });

    it('should get all users', async () => {
        const mockUsers = [
            { user_id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { user_id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        ];
        pool.execute.mockResolvedValue([mockUsers]);  // Mock execute fonksiyonu

        const users = await User.getAll();

        expect(users).toEqual(mockUsers);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM users;');  // do�ru SQL sorgusu �al��t� m�
    });

    it('should get user by ID', async () => {
        const mockUser = { user_id: 1, name: 'John Doe', email: 'john.doe@example.com' };
        pool.execute.mockResolvedValue([[mockUser]]);  // Mock execute fonksiyonu

        const user = await User.getById(1);

        expect(user).toEqual(mockUser);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM users WHERE user_id = ?;', [1]);  // do�ru sorgu ve parametre
    });

    it('should update a user', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan g�ncelleme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // Mock execute fonksiyonu

        const updatedUser = { name: 'John Updated', email: 'john.updated@example.com' };
        const result = await User.update(1, updatedUser);

        expect(result).toBe(true);  // G�ncelleme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array));  // do�ru parametreler
    });

    it('should delete a user', async () => {
        const mockResult = { affectedRows: 1 };  // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);  // Mock execute fonksiyonu

        const result = await User.delete(1);

        expect(result).toBe(true);  // Silme ba�ar�l� ise true d�ner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM users WHERE user_id = ?;', [1]);  // do�ru sorgu
    });
});
