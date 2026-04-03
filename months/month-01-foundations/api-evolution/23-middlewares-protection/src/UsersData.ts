interface StoredUser {
    id: string;
    username: string;
    email: string;
    password: string; // The hash
};

export class UsersData {
    private static users: StoredUser[] = []

    static addUser(user: StoredUser) {
        this.users.push(user)
    }
    static getUsersData() {
        return this.users
    };
};