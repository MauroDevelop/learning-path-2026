export class Client {
    constructor(
        public readonly id: string,
        public name: string,
        public company: string,
        public email: string,
        public active: boolean = true,  // If is active client
        public createdAt: Date = new Date //
    ) {};
};