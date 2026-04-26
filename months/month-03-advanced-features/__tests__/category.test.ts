/**
 * GLOBAL ENVIRONMENT SETUP:
 * We inject the JWT_SECRET variable into the process to ensure our authentication 
 * middleware has a valid secret to verify tokens against during test execution.
 */
process.env.JWT_SECRET = 'test-secret-key-for-jest';

// Import Supertest and our Express application
import request from 'supertest';
import app from '../src/index';

import jwt from 'jsonwebtoken';
import { CategoryService } from '../src/services/CategoryService';

describe('Category Routes API', () => {

    describe('POST /api/categories', () => {

        test('Should block the request and return a 401 status if no JWT token is provided', async () => {
            // Execute the HTTP request cleanly using await
            const response = await request(app)
                .post('/api/categories')
                .send({
                    name: 'Desserts',
                    description: 'Delicious desserts'
                });

            // Expect a 401 Unauthorized status code
            expect(response.status).toBe(401);
            
            // Expect the success flag in the response body to be false
            expect(response.body.success).toBe(false);
        });

        test('Should successfully create a category (201) using a mocked service', async () => {
            // Create a dummy payload with the ADMIN role to pass the authorization middleware
            const payload = { userId: 'test-admin-id', userRole: 'ADMIN' };

            // Sign the JWT token using the global secret we injected at the top
            const secret = process.env.JWT_SECRET as string;
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
    });
});