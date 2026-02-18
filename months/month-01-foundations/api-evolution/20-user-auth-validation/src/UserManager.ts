/*
definir un esquema de validación usando zod llamado UserSchema. Debe cumplir estrictamente con estas reglas:

username: Debe ser un string, tener un mínimo de 4 caracteres y un mensaje de error personalizado si no cumple.

email: Debe ser un formato de email válido.

password: Debe ser un string de al menos 8 caracteres.

age: Debe ser un number y la persona debe tener al menos 18 años. (Mensaje: "Debes ser mayor de edad").
*/

import { z } from 'zod';

const UserSchema = z.object({
    username: z.string().min(4, 'El nombre de usuario debe contener minimo de 4 caracteres'),
    email: z.string().email('Email no valido'),
    password: z.string().min(8, 'La contraseña debe contener minimo 8 caracteres'),
    age: z.number().min(18, 'Debes ser mayor de 18 años'),
})

// Creo y exporto una clase lamada UserManager
export class UserManager {
    // Creo un metodo estatico llamado register que recibe de parametros username, email, password y age
    static register(data: { username: string, email: string, password: string, age: number }) {
        // Validación
        const result = UserSchema.safeParse(data);

        if (result.success === false) {
            // EXTRAER EL ERROR:
            // result.error.errors es un array con todos los fallos
            // Tomamos el primero [0] y su mensaje (.message).
            const errorMessage = result.error.issues[0]?.message;

            // Lanzar el error para detener el programa
            throw new Error (errorMessage);
        }

        return `Usuario registrado: ${data.email}`;
    }
}
// console.log(UserManager.register({username: 'Ma', email: 'maurodevelop.git@gmail.com', password: 'mauro123', age: 19}));
