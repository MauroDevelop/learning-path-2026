// Import Supertest and our Express application
import request from 'supertest';
import app from '../src/index';

describe('Authentication Routes (Auth API)', () => { 

    describe('POST /api/auth/register', () => {
        
        test('Should return a 400 Bad Request status if required fields are missing', async () => {
            
            // Await the request here to keep the expects clean
            const response = await request(app)
                .post('/api/auth/register') 
                .send({});

            // Expect a 400 Bad Request status code
            expect(response.status).toBe(400);
            
            // Expect the success flag to be false
            expect(response.body.success).toBe(false);
            
            // Verify that the Zod errors array is returned in the response
            expect(response.body.errors).toBeDefined(); 
        });

    });
});