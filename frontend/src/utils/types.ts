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
    author_id: number;
    created_at: string;
    like_count: number;
    comments : IMiniComment[];
    repost_count: number;
}


export interface IMiniComment {
    id: number;
    content: string;
    author: string;
    created_at: string;
}

export interface IProfileBack {
    id: number;
    bio: string;
    created_at: string;
    posts: IMiniPost[];
    reposted_posts: IMiniPost[];
    liked_posts: IMiniPost[];
    followers: number[]; 
    following: number[]; 
    user: IUserBack;
}

export interface IPostDetail {
    id: number;
    content: string;
    author: IProfileBack;
    created_at: string;
    like_count: number;
    comments : IMiniComment[];
    repost_count: number;
}


export interface IUserBack {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
}