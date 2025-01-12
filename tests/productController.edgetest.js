const Product = require('../models/product');

describe('Product Controller Edge Tests', () => {
    describe('GET /api/products/:id', () => {
        it('should return 404 if the product does not exist', async () => {
            sinon.stub(Product, 'getById').resolves(null);

            const res = await chai.request(app).get('/api/products/999');

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Product not found');

            Product.getById.restore();
        });
    });

    describe('POST /api/products', () => {
        it('should return 400 if required fields are missing', async () => {
            const res = await chai.request(app).post('/api/products').send({
                name: 'New Product'
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Missing required fields');
        });

        it('should return 409 if a product with the same serial number exists', async () => {
            sinon.stub(Product, 'create').throws(new Error('Duplicate serial number'));

            const res = await chai.request(app).post('/api/products').send({
                name: 'New Product',
                serial_number: 'SN12345',
                price: 100,
                quantity_in_stock: 10
            });

            expect(res.status).to.equal(409);
            expect(res.body.error).to.equal('Product with this serial number already exists');

            Product.create.restore();
        });
    });
});
