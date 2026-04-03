import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Schema definition for data validation
const dishSchema = z.object({
    // Must be a string, minimum 3 characters, with a custom error message
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    // Must be a strictly positive number
    price: z.number().positive('Price must be greater than 0'),
    // Enums enforce that only these specific literal values are allowed
    category: z.enum(['Appetizer', 'Main Course', 'Dessert', 'Beverage']),
    // The optional modifier means the payload can omit this field
    available: z.boolean().optional()
});

app.post('/menu', async (req: Request, res: Response) => {
    // Evaluates the incoming payload against the schema without throwing exceptions
    const validationResult = dishSchema.safeParse(req.body);

    // Early return if validation fails
    if (!validationResult.success) {
        // Parses Zod's internal error format to return a clean JSON response
        return res.status(400).json({ errors: JSON.parse(validationResult.error.message) });
    }

    console.log('Payload received and validated:', validationResult.data);

    res.status(201).json({
        message: "Dish validated successfully",
        data: validationResult.data
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Validation server running on http://localhost:${PORT}`);
});