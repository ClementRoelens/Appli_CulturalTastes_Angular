export class Album {
    _id!:string;
    title!:string;
    author!:string;
    date!:Date;
    // Pour faciliter la réutilisation de component, on utilise description pour désigner la tracklist
    description!:string;
    likes!: number;
    dislikes!: number;
    opinionsId!: string[];
    genres!: string[];
    imageUrl!: string    
}