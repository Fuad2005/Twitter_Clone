import React from 'react'
import { IMiniPost } from '@/utils/types'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import { BASE_URL } from '@/utils/variables';
import { GetUserByToken } from '@/utils/functions';


function ProfileTab({data}: {data: IMiniPost[]}) {


  const thisUserData = useSelector((state: RootState) => state.user)
  const [refresh, setRefresh] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)

  const dispatch = useDispatch()

  React.useEffect(() => {
    console.log(thisUserData)
  }, [thisUserData, refresh])

  const handleLike = React.useCallback((post_id: number) => {

    setLoading(true)

    axios.get(`${BASE_URL}/posts/like-post/${post_id}`, {
      headers: {
        'Authorization': `Token ${thisUserData.token}`
      }
    })
    .then(res => {
      console.log(res)
      GetUserByToken(thisUserData.token, dispatch)
      setRefresh(prev => prev + 1)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }, [thisUserData, dispatch])



  return (
   <div className='flex flex-col gap-4'>
    {data?.map(post => (
        <div className='rounded bg-white shadow dark:bg-gray-800 p-3' key={post.id}>
          <div className="flex items-center gap-2 my-2">
            <div className='w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg bg-gray-100 dark:bg-gray-700 '>
              {post.author[0]?.toUpperCase()}
            </div>
            <p>{post.author}</p>
            <p className='text-gray-400 text-sm'>{new Date(post.created_at).toLocaleString('default', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false  })}</p>
          </div>
          <div className=" flex items-center gap-2 justify-between mx-5">
            <p className='basis-4/5'>{post.content}</p>
            <div className='flex flex-col items-center justify-center gap-2'>
              {loading ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                </svg>
              ) : (
                <button onClick={() => {handleLike(post.id)}}>
                  
                  {thisUserData.liked_posts.some(likedPost => likedPost.id === post.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                  </svg>
                  )}
                </button>

              )}


              <p>{post.like_count}</p>
            </div>

          </div>
        </div>
    ))}
   </div>
  )
}

export default ProfileTab