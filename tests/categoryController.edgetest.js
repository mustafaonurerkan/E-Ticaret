const Category = require('../models/category');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = chai;

chai.use(chaiHttp);

describe('Category Controller Extended Edge Tests', () => {
    describe('POST /api/categories', () => {
        // Test 1: Missing categoryName
        it('should return 400 if categoryName is not provided in the request body', async () => {
            // Arrange: Send a request with an empty body
            const requestData = {};

            // Act: Perform the POST request
            const response = await chai.request(app).post('/api/categories').send(requestData);

            // Assert: Check the response for the expected status code and error message
            expect(response).to.have.property('status', 400);
            expect(response.body).to.have.property('error', 'Category name is required');
        });

        // Test 2: Duplicate category
        it('should return 409 if the category already exists in the database', async () => {
            // Arrange: Stub the create method of the Category model to simulate a duplicate category
            const categoryName = 'Electronics';
            const errorMessage = 'Duplicate category';
            sinon.stub(Category, 'create').throws(new Error(errorMessage));

            // Act: Perform the POST request with a duplicate category name
            const response = await chai.request(app).post('/api/categories').send({ categoryName });

            // Assert: Verify the response status code and error message
            expect(response).to.have.property('status', 409);
            expect(response.body).to.have.property('error', 'Category already exists');

            // Cleanup: Restore the stubbed method
            Category.create.restore();
        });
    });

    describe('DELETE /api/categories/:id', () => {
        // Test 1: Nonexistent category
        it('should return 404 if the category with the given ID does not exist in the database', async () => {
            // Arrange: Stub the delete method of the Category model to simulate a non-existent category
            const categoryId = '999';
            sinon.stub(Category, 'delete').resolves(false);

            // Act: Perform the DELETE request with a non-existent category ID
            const response = await chai.request(app).delete(`/api/categories/${categoryId}`);

            // Assert: Verify the response status code and error message
            expect(response).to.have.property('status', 404);
            expect(response.body).to.have.property('error', 'Category not found');

            // Cleanup: Restore the stubbed method
            Category.delete.restore();
        });

        // Test 2: Category with associated products
        it('should return 400 if the category has associated products and cannot be deleted', async () => {
            // Arrange: Stub the delete method of the Category model to simulate associated products
            const categoryId = '1';
            const errorMessage = 'Category has associated products';
            sinon.stub(Category, 'delete').throws(new Error(errorMessage));

            // Act: Perform the DELETE request with a category ID that has associated products
            const response = await chai.request(app).delete(`/api/categories/${categoryId}`);

            // Assert: Verify the response status code and error message
            expect(response).to.have.property('status', 400);
            expect(response.body).to.have.property('error', 'Category has associated products');

            // Cleanup: Restore the stubbed method
            Category.delete.restore();
        });
    });
});
