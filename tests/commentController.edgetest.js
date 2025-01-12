const Comment = require('../models/comment');

describe('Comment Controller Edge Tests', () => {
    describe('POST /api/comments/create', () => {
        it('should return 400 if user_id is missing', async () => {
            const res = await chai.request(app).post('/api/comments/create').send({
                product_id: 1,
                rating: 5,
                content: 'Great product!',
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('User ID is required');
        });

        it('should return 404 if product does not exist', async () => {
            sinon.stub(Comment, 'create').throws(new Error('Product not found'));

            const res = await chai.request(app).post('/api/comments/create').send({
                user_id: 1,
                product_id: 999,
                rating: 5,
                content: 'Great product!',
            });

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Product not found');

            Comment.create.restore();
        });
    });

    describe('POST /api/comments/approve', () => {
        it('should return 400 if comment_id is missing', async () => {
            const res = await chai.request(app).post('/api/comments/approve').send({});

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Comment ID is required');
        });

        it('should return 403 if user is not authorized', async () => {
            sinon.stub(Comment, 'approve').throws(new Error('Unauthorized user'));

            const res = await chai.request(app).post('/api/comments/approve').send({
                comment_id: 1,
                user_id: 2,
            });

            expect(res.status).to.equal(403);
            expect(res.body.error).to.equal('Unauthorized user');

            Comment.approve.restore();
        });
    });
});