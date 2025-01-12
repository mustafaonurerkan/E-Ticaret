const User = require('../models/user');

describe('User Controller Edge Tests', () => {
    describe('DELETE /api/users/:id', () => {
        it('should return 404 if the user does not exist', async () => {
            sinon.stub(User, 'delete').resolves(false);

            const res = await chai.request(app).delete('/api/users/999');

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('User not found');

            User.delete.restore();
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return 404 if the user does not exist', async () => {
            sinon.stub(User, 'getById').resolves(null);

            const res = await chai.request(app).get('/api/users/999');

            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('User not found');

            User.getById.restore();
        });
    });
});