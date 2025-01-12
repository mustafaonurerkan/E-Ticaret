const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const app = require('../app'); // Import your app
const Product = require('../models/product');
const Category = require('../models/category');
const Comment = require('../models/comment');
const Order = require('../models/order');

chai.use(chaiHttp);

describe('Product Manager Endpoints', () => {
    describe('POST /api/product-manager/stock', () => {
        it('should update the stock of a product', async () => {
            const mockProductId = 1;
            const mockQuantity = 5;

            sinon.stub(Product, 'updateStock').resolves(true);

            const res = await chai.request(app).post('/api/product-manager/stock').send({
                productId: mockProductId,
                quantity: mockQuantity,
            });

            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Stock updated successfully');

            Product.updateStock.restore();
        });
    });

    describe('POST /api/product-manager/comment/approve', () => {
        it('should approve a comment', async () => {
            const mockCommentId = 1;

            sinon.stub(Comment, 'approve').resolves(true);

            const res = await chai.request(app).post('/api/product-manager/comment/approve').send({
                commentId: mockCommentId,
            });

            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Comment approved successfully');

            Comment.approve.restore();
        });
    });

    describe('POST /api/product-manager/category', () => {
        it('should create a new category', async () => {
            const mockCategoryId = 1;

            sinon.stub(Category, 'create').resolves(mockCategoryId);

            const res = await chai.request(app).post('/api/product-manager/category').send({
                categoryName: 'Electronics',
            });

            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Category created successfully');
            expect(res.body.categoryId).to.equal(mockCategoryId);

            Category.create.restore();
        });
    });

    describe('GET /api/product-manager/categories', () => {
        it('should fetch all categories', async () => {
            const mockCategories = [
                { category_id: 1, category_name: 'Electronics' },
                { category_id: 2, category_name: 'Books' },
            ];

            sinon.stub(Category, 'getAll').resolves(mockCategories);

            const res = await chai.request(app).get('/api/product-manager/categories');

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockCategories);

            Category.getAll.restore();
        });
    });

    describe('GET /api/product-manager/delivery-list', () => {
        it('should fetch the delivery list', async () => {
            const mockDeliveryList = [
                { order_id: 1, user_id: 1, delivery_address: '123 Main St' },
            ];

            sinon.stub(Order, 'getDeliveryList').resolves(mockDeliveryList);

            const res = await chai.request(app).get('/api/product-manager/delivery-list');

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockDeliveryList);

            Order.getDeliveryList.restore();
        });
    });
});
