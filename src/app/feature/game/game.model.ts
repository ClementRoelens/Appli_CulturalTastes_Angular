export class Game {
    _id?:string;
    title!:string;
    studio!:string;
    machines!:string[];
    description!:string;
    date!:Date;
    likes!: number;
    dislikes!: number;
    opinionsId!: string[];
    imageUrl!:string;
}