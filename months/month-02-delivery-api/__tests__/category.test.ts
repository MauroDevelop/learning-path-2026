// Import Supertest and our Express application
import request from 'supertest';
import app from '../src/index';

import jwt from 'jsonwebtoken';
import { CategoryService } from '../src/services/CategoryService';

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

        test('Should successfully create a category (201) using a mocked service', async () => {
            
            // Create a dummy payload with the ADMIN role to pass the authorization middleware
            const payload = { userId: 'test-admin-id', userRole: 'ADMIN' };

            // Sign the JWT token
            const secret = process.env.JWT_SECRET || 'my-super-secret-development-key';
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });

            // MOCKING THE SERVICE
            // We tell Jest to spy on CategoryService. If 'createCategory' is called, 
            // it intercepts the call, bypasses Prisma, and returns this mock immediately.
            const mockCategory = {
                id: 'mock-id-123',
                name: 'Postres',
                description: 'Deliciosos postres',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const spy = jest.spyOn(CategoryService.prototype, 'createCategory')
                .mockResolvedValue(mockCategory);

            // Execute the HTTP request
            const response = await request(app)
                .post('/api/categories')
                .set('Authorization', `Bearer ${token}`) // Pass our master key
                .send({
                    name: 'Postres',
                    description: 'Deliciosos postres'
                });

            console.log("[SECURITY GUARD REPORT]:", response.body);

            // ASSERTIONS
            expect(response.status).toBe(201); // 201 Created
            expect(response.body.success).toBe(true);

            // Note: Verify if your controller returns 'data' or 'category' in the response body
            expect(response.body.category.name).toBe('Postres');

            // Validate as auditors that our "Stunt Double" (Mock) was called exactly once
            expect(spy).toHaveBeenCalledTimes(1);

            // Restore the spy to prevent interference with future tests
            spy.mockRestore();
        });
    })
})