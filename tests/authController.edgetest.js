const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Controller Edge Tests', () => {
    describe('POST /api/auth/register', () => {
        it('should return 400 if email is missing', async () => {
            const res = await chai.request(app).post('/api/auth/register').send({
                name: 'John Doe',
                password: 'password123',
            });

            expect(res.status).to.equal(400);
            expect(res.body.error).to.equal('Email is required');
        });

        it('should return 500 for duplicate email', async () => {
            sinon.stub(User, 'create').throws(new Error('Duplicate email'));

            const res = await chai.request(app).post('/api/auth/register').send({
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password123',
            });

            expect(res.status).to.equal(500);
            expect(res.body.error).to.equal('User registration failed');

            User.create.restore();
        });
    });

    describe('POST /api/auth/login', () => {
        it('should return 404 if user does not exist', async () => {
            sinon.stub(User, 'getByEmail').resolves(null);

            const res = await chai.request(app).post('/api/auth/login').send({
                email: 'nonexistent@example.com',
                password: 'password123',
            });

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('User not found');

            User.getByEmail.restore();
        });

        it('should return 401 if password is incorrect', async () => {
            sinon.stub(User, 'getByEmail').resolves({
                email: 'valid@example.com',
                password: 'hashedpassword',
            });
            sinon.stub(bcrypt, 'compare').resolves(false);

            const res = await chai.request(app).post('/api/auth/login').send({
                email: 'valid@example.com',
                password: 'wrongpassword',
            });

            expect(res.status).to.equal(401);
            expect(res.body.error).to.equal('Incorrect password');

            User.getByEmail.restore();
            bcrypt.compare.restore();
        });
    });
});
