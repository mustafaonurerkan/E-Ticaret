const Cart = require('../models/cart');

describe('Cart Controller Edge Tests', () => {
    describe('POST /api/cart/add', () => {
        it('should return 400 if productId is missing', async () => {
            const res = await chai.request(app).post('/api/cart/add').send({
                userId: 1,
                quantity: 2,
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Product ID is required');
        });

        it('should return 404 if product does not exist', async () => {
            sinon.stub(Cart, 'addToCart').throws(new Error('Product not found'));

            const res = await chai.request(app).post('/api/cart/add').send({
                userId: 1,
                productId: 999,
                quantity: 2,
            });

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Product not found');

            Cart.addToCart.restore();
        });
    });

    describe('DELETE /api/cart/remove', () => {
        it('should return 400 if productId is missing', async () => {
            const res = await chai.request(app).delete('/api/cart/remove').send({
                userId: 1,
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Product ID is required');
        });

        it('should return 404 if product is not in cart', async () => {
            sinon.stub(Cart, 'removeFromCart').resolves(false);

            const res = await chai.request(app).delete('/api/cart/remove').send({
                userId: 1,
                productId: 999,
            });

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Product not in cart');

            Cart.removeFromCart.restore();
        });
    });
});