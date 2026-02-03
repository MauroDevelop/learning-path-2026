import jwt from 'jsonwebtoken';

const JWT_SECRET = 'Clave_secreta_2026';

export class AuthMiddleware {
    static verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET)

            return {success: true, userData: decoded}
        } catch (error) {
            return { success: false, error: (error as Error).message }
        }
    }
}

