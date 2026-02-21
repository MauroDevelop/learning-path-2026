// 1. firsh define the roles allowed
export type Role = 'CLIENT' | 'ADMIN' | 'COURIER';

export class User {
    constructor(
        public id: string,
        public email: string,
        public password: string, // always hashed
        public name: string,
        public role: Role,
        public isActive: boolean,
        public phone?: string | null // the optional always come last
    ) { }
}