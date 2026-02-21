import bcrypt from 'bcrypt';
import { IUserRepository } from '../core/interfaces/IUserRepository';
import { RegisterDTO } from '../shared/dtos/AuthDTO';
import { User } from '../core/entities/User';

export class AuthService {
  // Dependency Injection: The service requires a repository but remains implementation-agnostic
  constructor(private userRepository: IUserRepository) {}

  async register(data: RegisterDTO): Promise<Omit<User, 'password'>> {
    // Business Rule: Email must be unique
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email address is already registered');
    }

    // Security: Hash the password (10 salt rounds is the industry standard)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the pure entity (pass an empty string for the ID as the DB will generate it)
    const newUser = new User(
      '', 
      data.email,
      data.name,
      hashedPassword,
      data.role || 'CLIENT',
      true,
      data.phone
    );

    // Persist to the database using the repository
    const savedUser = await this.userRepository.save(newUser);

    // Return the user WITHOUT the password (Security best practice)
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }
}