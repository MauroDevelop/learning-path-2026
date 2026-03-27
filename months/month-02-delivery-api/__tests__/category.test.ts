// Import Supertest and our Express application
import request from 'supertest';
import app from '../src/index';

describe('Rutas de categorias (category API)', () => {

    describe('POST /api/categories', () => {

        test('Should blocked the request and response error 401 if do not sended the token JWT', async () => {
            // Use Supertest to simulate the HTTP request
            const response = request(app)
                .post('/api/categories')
                .send({
                    name: 'Desserts',
                    description: 'Delicious desserts'
                })
            // Use Supertest to simulate the HTTP request
            expect((await response).status).toBe(401);
            // Expect the success flag in the response body to be false
            expect((await response).body.success).toBe(false);
        })

    })
})