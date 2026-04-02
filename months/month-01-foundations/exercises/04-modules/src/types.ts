/**
 * EXERCISE PART 1: TYPE DEFINITION
 * 1. Create and export a 'User' interface containing:
 * - id (number)
 * - name (string)
 * - email (string)
 * - role ('admin' | 'user') -> This is a union type
 */

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}