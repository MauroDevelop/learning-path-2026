// firsh define the roles allowed
export type Role = 'CLIENT' | 'ADMIN' | 'COURIER';

export class User {
    // Declared the propieties
    id?: string | null;
    email!: string;
    password!: string; // always hashed
    name!: string;
    role!: Role;
    isActive!: boolean;
    phone?: string | null;

    // The constructor receiving an only type object (payload)
    constructor(data: {
        id?: string | null;
        email: string;
        password: string;
        name: string;
        role: Role;
        isActive: boolean;
        phone?: string | null;
    }) {
        // Explicit assignment (protection against)
        this.id = data.id ?? null;
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
        this.role = data.role;
        this.isActive = data.isActive;
        this.phone = data.phone ?? null;
    }
}