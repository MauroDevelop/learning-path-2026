import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../core/interfaces/IUserRepository';
import { RegisterDTO, LoginDTO } from '../shared/dtos/AuthDTO';
import { User } from '../core/entities/User';
import { AppError } from '../shared/errors/AppError';

export class AuthService {
  // Dependency Injection: The service requires a repository but remains implementation-agnostic
  constructor(private readonly userRepository: IUserRepository) { }

  async register(data: RegisterDTO): Promise<Omit<User, 'password'>> {
    // Business Rule: Email must be unique
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError('Email address is already registered', 409);
    }

    // Security: Hash the password (10 salt rounds is the industry standard)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the pure entity (pass an empty string for the ID as the DB will generate it)
    const newUser = new User({
      id: null,
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: 'CLIENT',
      isActive: true,
      phone: data.phone ?? null
    });

    // Persist to the database using the repository
    const savedUser = await this.userRepository.save(newUser);

    // Return the user WITHOUT the password (Security best practice)
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(data: LoginDTO): Promise<{ user: Omit<User, 'password'>, token: string }> {
    // We verified if the user exists
    const userValid = await this.userRepository.findByEmail(data.email);
    if (!userValid) {
      throw new AppError('Incorrect email or password', 400);
    }

    // Compare the password entered with the saved hash
    const isPasswordValid = await bcrypt.compare(data.password, userValid.password);
    if (!isPasswordValid) {
      throw new AppError('Incorrect email or password', 400);
    }

    // Trigger JWT
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('CRITICAL FATAL ERROR: JWT_SECRET is not defined in environment variables.');
    }
    
    const token = jwt.sign(
      { userId: userValid.id, userRole: userValid.role },
      secret,
      { expiresIn: '2 hours' }
    );

    // Return the user (without password) and token
    const { password, ...userWithoutPassword } = userValid;

    return {
      user: userWithoutPassword,
      token
    };
  }
}