const Category = require('../models/category');

describe('Category Controller Edge Tests', () => {
    describe('POST /api/categories', () => {
        it('should return 400 if categoryName is missing', async () => {
            const res = await chai.request(app).post('/api/categories').send({});

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Category name is required');
        });

        it('should return 409 if category already exists', async () => {
            sinon.stub(Category, 'create').throws(new Error('Duplicate category'));

            const res = await chai.request(app).post('/api/categories').send({
                categoryName: 'Electronics',
            });

            expect(res.status).to.equal(409);
            expect(res.body.error).to.equal('Category already exists');

            Category.create.restore();
        });
    });

    describe('DELETE /api/categories/:id', () => {
        it('should return 404 if category does not exist', async () => {
            sinon.stub(Category, 'delete').resolves(false);

            const res = await chai.request(app).delete('/api/categories/999');

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Category not found');

            Category.delete.restore();
        });

        it('should return 400 if category has associated products', async () => {
            sinon.stub(Category, 'delete').throws(new Error('Category has associated products'));

            const res = await chai.request(app).delete('/api/categories/1');

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Category has associated products');

            Category.delete.restore();
        });
    });
});