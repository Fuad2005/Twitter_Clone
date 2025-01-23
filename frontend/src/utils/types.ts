export interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    bio: string;
    created_at: string;
    posts: IMiniPost[];
    reposted_posts: IMiniPost[];
    liked_posts: IMiniPost[];
    followers: number[]; 
    following: number[]; 
}




export interface IMiniPost {
    id: number;
    content: string;
    author: string;
    created_at: string;
}