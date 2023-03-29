export class User {
    _id!:string;
    username!:string;
    likedFilmsId!:string[];
    dislikedFilmsId!:string[];
    likedAlbumsId!:string[];
    dislikedAlbumsId!:string[];
    likedGamesId!:string[];
    dislikedGamesId!:string[];
    opinionsId!:string[];
    likedOpinionsId!:string[];
    isAdmin!:boolean;
    password?:string
}