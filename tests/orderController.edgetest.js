const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const Order = require('../models/order');

chai.use(chaiHttp);
const { expect } = chai;

describe('Order Controller Edge Tests', () => {
    describe('POST /api/orders', () => {
        it('should return 400 if user_id is missing', async () => {
            const res = await chai.request(app).post('/api/orders').send({
                total_price: 200,
                status: 'Pending',
                delivery_address: '123 Main St',
                items: [
                    { product_id: 1, quantity: 2, price: 100 }
                ]
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('User ID is required');
        });

        it('should return 404 if a product does not exist', async () => {
            sinon.stub(Order, 'create').throws(new Error('Product not found'));

            const res = await chai.request(app).post('/api/orders').send({
                user_id: 1,
                total_price: 200,
                status: 'Pending',
                delivery_address: '123 Main St',
                items: [
                    { product_id: 999, quantity: 2, price: 100 }
                ]
            });

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Product not found');

            Order.create.restore();
        });
    });

    describe('GET /api/orders/:id', () => {
        it('should return 404 if the order does not exist', async () => {
            sinon.stub(Order, 'getById').resolves(null);

            const res = await chai.request(app).get('/api/orders/999');

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Order not found');

            Order.getById.restore();
        });
    });
});
