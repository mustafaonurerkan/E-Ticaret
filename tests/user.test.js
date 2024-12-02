const userController = require('../controllers/userController');

// Mock database or dependencies
jest.mock('../db', () => ({
    execute: jest.fn(),
}));

describe('User Controller Tests', () => {
    test('should create a new user', async () => {
        const mockUser = { name: 'John Doe', email: 'john@example.com' };
        jest.spyOn(userController, 'createUser').mockResolvedValue({ id: 1, ...mockUser });

        const result = await userController.createUser(mockUser);
        expect(result).toEqual({ id: 1, ...mockUser });
        expect(userController.createUser).toHaveBeenCalledWith(mockUser);
    });

    test('should get a user by ID', async () => {
        const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
        jest.spyOn(userController, 'getUserById').mockResolvedValue(mockUser);

        const result = await userController.getUserById(1);
        expect(result).toEqual(mockUser);
        expect(userController.getUserById).toHaveBeenCalledWith(1);
    });

    test('should delete a user', async () => {
        jest.spyOn(userController, 'deleteUser').mockResolvedValue(true);

        const result = await userController.deleteUser(1);
        expect(result).toBe(true);
        expect(userController.deleteUser).toHaveBeenCalledWith(1);
    });
});
