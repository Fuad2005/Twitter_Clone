import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/utils/types";


const initialState: IUser = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    token: '',
    bio: '',
    created_at: '',
    reposted_posts: [], 
    liked_posts: [],
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.token = action.payload.token
            state.bio = action.payload.bio
            state.created_at = action.payload.created_at
            state.reposted_posts = action.payload.reposted_posts
            state.liked_posts = action.payload.liked_posts
        },
        resetUserInfo: (state) => {
            state.id = 0
            state.username = ''
            state.first_name = ''
            state.last_name = ''
            state.email = ''
            state.token = ''
            state.bio = ''
            state.created_at = ''
            state.reposted_posts = []
            state.liked_posts = []
        }
    }
})

export const { setUserInfo, resetUserInfo } = userSlice.actions
export default userSlice.reducer