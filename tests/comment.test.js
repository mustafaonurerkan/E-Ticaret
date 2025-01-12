const commentController = require('../controllers/commentController');
const commentModel = require('../models/comment');

jest.mock('../models/comment', () => ({
    add: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
}));

describe('Comment Controller Tests', () => {
    test('should add a new comment', async () => {
        commentModel.add.mockResolvedValue({ comment_id: 1 });

        const mockRequest = {
            body: { product_id: 1, user_id: 1, text: 'Great product!' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.addComment(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ comment_id: 1 });
    });

    test('should retrieve all comments', async () => {
        const mockComments = [
            { comment_id: 1, text: 'Great product!' },
            { comment_id: 2, text: 'Not bad' },
        ];
        commentModel.getAll.mockResolvedValue(mockComments);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await commentController.getComments(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockComments);
    });

    test('should retrieve a comment by ID', async () => {
        const mockComment = { comment_id: 1, text: 'Great product!' };
        commentModel.getById.mockResolvedValue(mockComment);

        const mockRequest = { params: { id: 1 } };
        const mockResponse = {
            json: jest.fn(),
        };

        await commentController.getCommentById(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(mockComment);
    });

    test('should delete a comment', async () => {
        commentModel.delete.mockResolvedValue(true);

        const mockRequest = { params: { id: 1 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.deleteComment(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
    });

    test('should update a comment', async () => {
        commentModel.update.mockResolvedValue(true);

        const mockRequest = {
            params: { id: 1 },
            body: { text: 'Updated comment' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.updateComment(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Comment updated successfully' });
    });

    // Yeni Eklenen Testler
    test('should handle invalid comment creation', async () => {
        const mockRequest = {
            body: { product_id: null, user_id: null, text: '' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.addComment(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid comment data' });
    });

    test('should handle non-existent comment retrieval', async () => {
        commentModel.getById.mockResolvedValue(null);

        const mockRequest = { params: { id: 999 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.getCommentById(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Comment not found' });
    });

    test('should return empty array for no comments', async () => {
        commentModel.getAll.mockResolvedValue([]);

        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };

        await commentController.getComments(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    test('should handle comment deletion error', async () => {
        commentModel.delete.mockResolvedValue(false);

        const mockRequest = { params: { id: 999 } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.deleteComment(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to delete comment' });
    });

    test('should handle invalid comment update', async () => {
        commentModel.update.mockResolvedValue(false);

        const mockRequest = {
            params: { id: 1 },
            body: { text: '' },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await commentController.updateComment(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid comment data' });
    });
});
