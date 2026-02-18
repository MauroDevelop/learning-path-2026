export class Author {
    constructor(
        public readonly id: number,
        public name: string,
        public bio: string | null,
        public createdAt: Date
    ) {}
}