export interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
    bio: string;
    created_at: string;
    reposted_posts: string[]; // change to post object later
    liked_posts: string[]; // change to post object later
    followers: number[]; 
    following: number[]; 
}