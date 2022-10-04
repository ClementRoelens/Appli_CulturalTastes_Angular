export class User {
    _id?:string;
    nickname!:string;
    likedFilmsId!:string[];
    dislikedFilmsId!:string[];
    opinionsId!:string[];
    likedOpinionsId!:string[];
    isAdmin!:boolean;
    password?:string
}