/**
 * EJERCICIO PARTE 1: DEFINICIÓN DE TIPOS
 * 1. Crea y exporta una interfaz 'User' que tenga:
 * - id (number)
 * - name (string)
 * - email (string)
 * - role ('admin' | 'user') -> Esto es una unión de tipos.
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: ('admin' | 'user');
}
//# sourceMappingURL=types.d.ts.map