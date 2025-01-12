const userController = require('../controllers/userController');
const User = require('../models/user');

// Mock database or dependencies
jest.mock('../models/user', () => ({
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
}));

describe('User Controller Tests', () => {
    test('should create a new user', async () => {
        const mockUser = { name: 'John Doe', email: 'john@example.com', password: '123456', role: 'user', tax_id: '12345', address: '123 Main St' };
        User.create.mockResolvedValue(1);

        const req = { body: mockUser };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.createUser(req, res);

        expect(User.create).toHaveBeenCalledWith(mockUser);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    test('should get all users', async () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
        ];
        User.getAll.mockResolvedValue(mockUsers);

        const req = {};
        const res = { json: jest.fn() };
        await userController.getAllUsers(req, res);

        expect(User.getAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    test('should get a user by ID', async () => {
        const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
        User.getById.mockResolvedValue(mockUser);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn() };
        await userController.getUserById(req, res);

        expect(User.getById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    test('should delete a user', async () => {
        User.delete.mockResolvedValue(true);

        const req = { params: { id: 1 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.deleteUser(req, res);

        expect(User.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    test('should return 404 when deleting a non-existent user', async () => {
        User.delete.mockResolvedValue(false);

        const req = { params: { id: 999 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.deleteUser(req, res);

        expect(User.delete).toHaveBeenCalledWith(999);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found or could not be deleted' });
    });

    test('should update a user', async () => {
        User.update.mockResolvedValue(true);

        const req = { params: { id: 1 }, body: { tax_id: '54321', address: '456 Main St' } };
        const res = { json: jest.fn() };
        await userController.updateUser(req, res);

        expect(User.update).toHaveBeenCalledWith(1, req.body);
        expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });

    test('should return 404 when updating a non-existent user', async () => {
        User.update.mockResolvedValue(false);

        const req = { params: { id: 999 }, body: { tax_id: '54321', address: '456 Main St' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.updateUser(req, res);

        expect(User.update).toHaveBeenCalledWith(999, req.body);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found or could not be updated' });
    });
});
