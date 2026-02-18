import { z } from 'zod';
import bcrypt from 'bcrypt';

// El esquema (Validación de entrada del módulo 20)
const UserSchema = z.object({
    username: z.string().min(4, 'El nombre de usuario debe contener minimo de 4 caracteres'),
    email: z.string().email('Email no valido'),
    password: z.string().min(8, 'La contraseña debe contener minimo 8 caracteres'),
    age: z.number().min(18, 'Debes ser mayor de 18 años'),
});

// Definimos el tipo basado en el esquema para usarlo en argumentos
// Usamos z.infer para no repetir código. typeof UserSchema: Obtiene el tipo de la variable UserSchema
type UserInput = z.infer<typeof UserSchema>;

export class UserManager {
    
    // El método ahora debe ser ASYNC porque hashear tarda tiempo
    static async register(data: UserInput) {
        
        // A. Valido los datos crudos 
        const result = UserSchema.safeParse(data);

        if (result.success === false) {
            const errorMessage = result.error.issues[0]?.message;
            throw new Error(errorMessage);
        }

        // --- VALIDACIÓN ---
        // Si pasa la validación, procedemos a ENCRIPTAR
        const saltRounds = 10;
        // Crear el hash
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // Simulamos guardar en base de datos        
        console.log(`Guardando usuario en Base de Datos...`);
        
        // Retornamos un objeto para verificar que funcionó
        return {
            status: "success",
            message: "Usuario registrado con seguridad",
            user: {
                email: data.email,
                username: data.username,
                // Devolvemos el hash para que se vea que no se guardó el texto plano
                storedPassword: hashedPassword 
            }
        };
    }
}