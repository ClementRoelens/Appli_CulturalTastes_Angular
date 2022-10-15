export class Film {
    _id!:string;
    title!: string;
    // Pour faciliter la réutilisation de component, on utilise author pour désigner le réalisateur
    author!: string;
    description!: string;
    date!: Date;
    likes!: number;
    dislikes!: number;
    opinionsId!: string[];
    genres!: string[];
    imageUrl!: string
}