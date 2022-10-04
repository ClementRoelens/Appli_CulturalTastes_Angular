export class Album {
    _id?:string;
    title!:string;
    author!:string;
    date!:Date;
    likes!: number;
    dislikes!: number;
    opinionsId!: string[];
    genres!: string[];
    imageUrl!: string    
}