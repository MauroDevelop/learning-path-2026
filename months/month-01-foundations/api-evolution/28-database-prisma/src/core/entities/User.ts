export class User {
    constructor(
        public name: string,
        public email: string,
        public id?: number    // optinal parameters must be placed at the end
    ) {};
};