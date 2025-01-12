const Payment = require('../models/payment');

describe('Payment Controller Edge Tests', () => {
    describe('POST /api/payment', () => {
        it('should return 400 if order_id is missing', async () => {
            const res = await chai.request(app).post('/api/payment').send({
                amount: 100,
                payment_method: 'Credit Card'
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Order ID is required');
        });

        it('should return 404 if the order does not exist', async () => {
            sinon.stub(Payment, 'process').throws(new Error('Order not found'));

            const res = await chai.request(app).post('/api/payment').send({
                order_id: 999,
                amount: 100,
                payment_method: 'Credit Card'
            });

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Order not found');

            Payment.process.restore();
        });
    });

    describe('GET /api/payment/:id', () => {
        it('should return 404 if the payment does not exist', async () => {
            sinon.stub(Payment, 'getById').resolves(null);

            const res = await chai.request(app).get('/api/payment/999');

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Payment not found');

            Payment.getById.restore();
        });
    });
});