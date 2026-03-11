import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string({
        message: 'Name is required',
    }).min(3, 'Name must have at least 3 characters long'),

    description: z.string().optional()
});

export const CreateProductSchema = z.object({
    name: z.string({
        message: 'Name is required',
    }),

    description: z.string().optional(),

    price: z.coerce.number({
        message: 'Price is required and must be a number',
    }).positive('Price must be positive'),

    stock: z.coerce.number().int('Stock must be an integer').nonnegative('Stock must be not negative ').default(0),

    categoryId: z.string().uuid('Category ID must be a valid UUID'),

    imageUrl: z.string().url('Invalid URL format').optional()
});

export const CreateModifierSchema = z.object({
    name: z.string({
        message: 'Name is required'
    }).min(2, 'The name is very short'),

    price: z.coerce.number({
        message: 'The price is required and must be a number',
    }).nonnegative('The price must be positive').default(0),

    productId: z.string().uuid('The ID to product is invalid')
});


export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>
export type CreateModifierInput = z.infer<typeof CreateModifierSchema>
