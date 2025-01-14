import { setUserInfo } from '@/redux/slices/userSlice';
import { BASE_URL } from './variables';
import axios from 'axios';


export const GetUserByToken = async (token: string, dispatch: any) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/get-profile/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })

        await dispatch(setUserInfo({
            id: res.data.id,
            username: res.data.user.username,
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            email: res.data.user.email,
            token: res.data.user.token,
            bio: res.data.bio,
            created_at: res.data.created_at,
            reposted_posts: res.data.reposted_posts,
            liked_posts: res.data.liked_posts
        }))
    }
    catch (err) {
        console.log(err)
    }
}