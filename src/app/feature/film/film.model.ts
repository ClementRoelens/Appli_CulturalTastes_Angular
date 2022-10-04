export class Film {
    _id!:string;
    title!: string;
    director!: string;
    description!: string;
    date!: Date;
    likes!: number;
    dislikes!: number;
    opinionsId!: string[];
    genres!: string[];
    imageUrl!: string
}