import jwt, { JwtPayload } from 'jsonwebtoken';

// Fallback secret key. In production, this must be injected via environment variables (.env)
const JWT_SECRET = process.env.JWT_SECRET || 'Clave_secreta_2026';

// Defines the strict structure for the verification response
interface TokenVerificationResult {
    success: boolean;
    userData?: string | JwtPayload;
    error?: string;
}

export class AuthMiddleware {
    
    // Verifies the authenticity, signature, and expiration of the provided JWT
    static verifyToken(token: string): TokenVerificationResult {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            return { 
                success: true, 
                userData: decoded 
            };
        } catch (error) {
            // Type Guard to safely extract the error message without forced assertions
            const errorMessage = error instanceof Error 
                ? error.message 
                : 'Unknown token verification error';

            return { 
                success: false, 
                error: errorMessage 
            };
        }
    }
}