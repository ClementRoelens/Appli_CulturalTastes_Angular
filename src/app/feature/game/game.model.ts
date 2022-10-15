export class Game {
    _id?:string;
    title!:string;
    // Pour faciliter la réutilisation de component, on utilise author pour désigner le studio de développemnt
    author!:string;
    machines!:string[];
    description!:string;
    date!:Date;
    likes!: number;
    dislikes!: number;
    opinionsId!: string[];
    imageUrl!:string;
}