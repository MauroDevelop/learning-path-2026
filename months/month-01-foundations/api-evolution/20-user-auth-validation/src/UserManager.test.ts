import { UserManager } from "./UserManager.js";

describe('UserManager', () => {

    test('Deber registrar a un usuario', () => {
        const validUser = {
            username: 'Mauro',
            email: 'maurodevelop.git@gmail.com',
            password: 'mauro123',
            age: 19
        }
        const result = UserManager.register(validUser);

        expect(result).toBe('Usuario registrado: maurodevelop.git@gmail.com')
    })
})