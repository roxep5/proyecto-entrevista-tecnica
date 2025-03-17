export interface Name{
    title:string;
    first:string;
    last:string;
}
export interface Picture{
    large:string;
    medium:string;
    thumbnail:string;
}
export interface User {
    gender:string;
    name:Name;
    email:string;
    nat:string;

}

export interface User {
    gender:string;
    name:Name;
    email:string;
    nat:string;
    picture:Picture;
}
