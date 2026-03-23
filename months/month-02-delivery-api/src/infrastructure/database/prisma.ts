// import from the newly folder genereded
import { PrismaClient } from '@prisma/client';

// exported singleton instance for the entire application
export const prisma = new PrismaClient({
    log: ['query', 'error']      // Print queries and errors when executed
})