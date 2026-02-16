export class Book {
    constructor(
        public readonly id: number,
        public title: string,
        public sumary: string | null,
        public published: boolean,

        //foring key: Author reference
        public authorId: number
    ) {}
}