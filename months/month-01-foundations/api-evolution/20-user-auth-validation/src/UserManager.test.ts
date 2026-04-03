import { UserManager } from "./UserManager.js";

// 'describe' groups all tests related to the UserManager System Under Test (SUT)
describe('UserManager', () => {

    // 'test' defines the specific scenario to be evaluated
    test('Should register a user successfully', () => {
        
        // ARRANGE: Prepare the mock payload
        const validUser = {
            username: 'Mauro',
            email: 'maurodevelop.git@gmail.com',
            password: 'mauro123',
            age: 19
        };

        // ACT: Execute the method being tested
        const result = UserManager.register(validUser);

        // ASSERT: Verify the expected output
        expect(result).toBe('User registered: maurodevelop.git@gmail.com');
    });

});