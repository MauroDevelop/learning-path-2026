import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const RegisterSchema = z.object({
    username: z.string().min(4, 'El nombre de usuario debe tener almenos 4 caracteres'),
    email: z.string().email(),
    password: z.string().min(8, 'La contraseña debe tener almenos 8 caracteres')
});

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

interface StoredUser {
    id: string;
    username: string;
    email: string;
    password: string; // El hash
};

// Tipos inferidos (deducir tipos)
type RegisterInput = z.infer<typeof RegisterSchema>;
type LoginInput = z.infer<typeof LoginSchema>;

export class UserManager {
    // Base de datos con usuarios (para testear)
    private static users: StoredUser[] = []

    // Clave secreta, deberia ir en el achivo .env 
    // (Propiedad: una variable que vive dentro de la clase)
    private static JWT_SECRET = 'Clave_secreta_2026';

    // --- REGISTRO ---
    static async register(data: RegisterInput){
        const validacion = RegisterSchema.safeParse(data);
        
        if (!validacion.success){
            throw new Error(validacion.error.issues[0]?.message);
        };

        // Hashear password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Crear usuario
        const newUser = {
            id: crypto.randomUUID(), // Generar un ID único
            username: data.username,
            email: data.email,
            password: hashedPassword   // Se guarda el hash
        };

        // Guardamos el usuario en la "BD"
        this.users.push(newUser);

        console.log(`[BD] Usuario guardado: ${newUser.email}`);

        return {message: 'Usuario registrado con éxito', userId: newUser.id};
    }

    // --- LOGIN ---
    static async login(data: LoginInput) {

        // Validar datos de entrada
        const validation = LoginSchema.safeParse(data);
        if (!validation.success) {
            throw new Error("Datos inválidos");
        };

        //  Buscar al usuario por Email
        const userFound = this.users.find(u => u.email === data.email);
        if (!userFound) throw new Error("Credenciales incorrectas (Email no existe)");

        // Verificar Contraseña (Comparar TextoPlano y Hash)
        const isPasswordValid = await bcrypt.compare(data.password, userFound.password);
        if (!isPasswordValid) {
            throw new Error("Credenciales incorrectas (Password erróneo)");
        } ;

        // Generar Token (JWT)
        const token = jwt.sign(
            // Payload: Qué datos guardamos DENTRO del token
            { 
                userId: userFound.id, 
                email: userFound.email 
            }, 
            // Secret: La llave única del servidor
            this.JWT_SECRET, 
            // Opciones: Cuánto tiempo vive el token
            { expiresIn: '1h' } 
        );

        console.log(`[LOGIN] Usuario logueado: ${userFound.email}`);
        
        return {
            message: "Login exitoso",
            token: token // Devolvemos el token al usuario
        };
    };

    static showUsers() {
        console.log(this.users);
    };
};
