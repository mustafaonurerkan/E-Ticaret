const pool = require('../db'); // Veritabaný baðlantýsýný alýn
const User = require('../models/user'); // User Modeli
const userController = require('../controllers/userController'); // User Controller

jest.mock('../db'); // Veritabaný baðlantýsýný mock'la

describe('User Model and Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        req = {}; // Mock request
        res = {
            status: jest.fn().mockReturnThis(), // Chaining için
            json: jest.fn(),
        }; // Mock response

        jest.clearAllMocks(); // Mock'larý temizle
    });

    describe('User Model Tests', () => {
        it('should create a new user and return the user ID', async () => {
            const mockInsertResult = [{ insertId: 1 }];
            pool.execute.mockResolvedValueOnce(mockInsertResult);

            const newUser = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                role: 'admin',
                tax_id: '1234567890',
                address: '123 Main St',
            };

            const userId = await User.create(newUser);

            expect(pool.execute).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO users'),
                expect.arrayContaining([
                    'John Doe',
                    'john@example.com',
                    'password123',
                    'admin',
                    '1234567890',
                    '123 Main St',
                ])
            );
            expect(userId).toBe(1);
        });

        it('should fetch all users', async () => {
            const mockUsers = [
                { user_id: 1, name: 'John Doe', email: 'john@example.com' },
                { user_id: 2, name: 'Jane Doe', email: 'jane@example.com' },
            ];
            pool.execute.mockResolvedValueOnce([mockUsers]);

            const users = await User.getAll();

            expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM users;');
            expect(users).toEqual(mockUsers);
        });

        it('should fetch a user by ID', async () => {
            const mockUser = { user_id: 1, name: 'John Doe', email: 'john@example.com' };
            pool.execute.mockResolvedValueOnce([[mockUser]]);

            const user = await User.getById(1);

            expect(pool.execute).toHaveBeenCalledWith(
                'SELECT * FROM users WHERE user_id = ?;',
                [1]
            );
            expect(user).toEqual(mockUser);
        });

        it('should delete a user by ID', async () => {
            pool.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

            const result = await User.delete(1);

            expect(pool.execute).toHaveBeenCalledWith(
                'DELETE FROM users WHERE user_id = ?;',
                [1]
            );
            expect(result).toBe(true);
        });
    });

    describe('User Controller Tests', () => {
        it('should return all users via controller', async () => {
            const mockUsers = [
                { user_id: 1, name: 'John Doe', email: 'john@example.com' },
                { user_id: 2, name: 'Jane Doe', email: 'jane@example.com' },
            ];
            pool.execute.mockResolvedValueOnce([mockUsers]);

            await userController.getAllUsers(req, res);

            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should return a user by ID via controller', async () => {
            const mockUser = { user_id: 1, name: 'John Doe', email: 'john@example.com' };
            req.params = { id: 1 };
            pool.execute.mockResolvedValueOnce([[mockUser]]);

            await userController.getUserById(req, res);

            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 if user is not found via controller', async () => {
            req.params = { id: 1 };
            pool.execute.mockResolvedValueOnce([[]]);

            await userController.getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Kullanýcý bulunamadý' });
        });

        it('should handle database errors gracefully in controller', async () => {
            req.params = { id: 1 };
            pool.execute.mockRejectedValueOnce(new Error('Database error'));

            await userController.getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Kullanýcý getirilemedi',
                detail: 'Database error',
            });
        });
    });
});
