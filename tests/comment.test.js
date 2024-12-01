const Comment = require('../models/comment'); // Comment modelini import et
const pool = require('../db'); // Veritabaný baðlantýsýný import et

jest.mock('../db'); // Veritabaný baðlantýsýný mock'layýn

describe('Comment Model CRUD Operations', () => {
    const testComment = {
        user_id: 1,
        product_id: 1,
        rating: 5,
        content: 'Great product!',
        approved: true
    };

    afterAll(async () => {
        await pool.end(); // Testlerden sonra baðlantýyý kapat
    });

    it('should create a new comment', async () => {
        const mockInsertResult = { insertId: 1 }; // Mocklanan insertId
        pool.execute.mockResolvedValue([mockInsertResult]); // Mock execute fonksiyonu

        const commentId = await Comment.create(testComment);

        expect(commentId).toBe(1); // Yeni yorum ID'si 1 olmalý
        expect(pool.execute).toHaveBeenCalledWith(expect.any(String), expect.any(Array)); // SQL sorgusu ve parametrelerin çalýþýp çalýþmadýðýný kontrol et
    });

    it('should get all comments', async () => {
        const mockComments = [
            { comment_id: 1, user_id: 1, product_id: 1, rating: 5, content: 'Great product!', approved: true },
            { comment_id: 2, user_id: 2, product_id: 1, rating: 4, content: 'Good product!', approved: false },
        ];
        pool.execute.mockResolvedValue([mockComments]);

        const comments = await Comment.getAll();

        expect(comments).toEqual(mockComments);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM comments;');
    });

    it('should get comments by product ID', async () => {
        const mockComments = [
            { comment_id: 1, user_id: 1, product_id: 1, rating: 5, content: 'Great product!', approved: true },
        ];
        pool.execute.mockResolvedValue([mockComments]);

        const comments = await Comment.getByProductId(1);

        expect(comments).toEqual(mockComments);
        expect(pool.execute).toHaveBeenCalledWith('SELECT * FROM comments WHERE product_id = ?;', [1]);
    });

    it('should delete a comment', async () => {
        const mockResult = { affectedRows: 1 }; // Mocklanan silme sonucu
        pool.execute.mockResolvedValue([mockResult]);

        const result = await Comment.delete(1);

        expect(result).toBe(true); // Silme baþarýlý ise true döner
        expect(pool.execute).toHaveBeenCalledWith('DELETE FROM comments WHERE comment_id = ?;', [1]);
    });
});
