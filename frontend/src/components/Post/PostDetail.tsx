import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '@/utils/variables';
import { IPostDetail } from '@/utils/types';
import Link from 'next/link';
import { GetUserByToken } from '@/utils/functions';


type Props = {id: string}

function PostDetail({id}: Props) {


    const thisUserData = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()
    const [userComment, setUserComment] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)
    const [refresh, setRefresh] = React.useState<number>(0)
    const [postData, setPostData] = React.useState<IPostDetail>({
        id : 0,
        content : '',
        author : {},
        created_at : '',
        like_count : 0,
        comments  : [],
        repost_count : 0,
    })

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
    
    const handleRepost = React.useCallback((post_id: number) => {
    setLoading(true)
    axios.get(`${BASE_URL}/posts/repost-post/${post_id}`, {
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


    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${BASE_URL}/posts/comment-post/${id}/`, {
            content: userComment
        }, {
            headers: {
                'Authorization': `Token ${thisUserData.token}`
            }
        })
        .then(res => {
            console.log(res)
            setUserComment('')
            setRefresh(prev => prev + 1)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [userComment, id, thisUserData])

    React.useEffect(() => {
        console.log(thisUserData)
        if (id !== undefined) {
            const idNum = parseInt(id, 10)
                if (isNaN(idNum)) {
                    router.push('/')
                  } else {
                    axios.get(`${BASE_URL}/posts/${idNum}`)
                    .then(res => {
                        console.log(res.data)
                        const postData = { ...res.data, comments: res.data.comments.reverse() }
                        setPostData(postData)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
        }

    }, [id, router, thisUserData, refresh])

  return (
    <div className='md:ml-64'>
        <div className='m-5'>
            <div className='rounded bg-white shadow dark:bg-gray-800 p-3' key={postData.id}>
                <Link href={`/search/${postData.author.id}`} className="flex items-center w-full md:w-[calc(50%+20px)] lg:w-[calc(33%+20px)] gap-2 my-2 hover:text-blue-500 dark:hover:text-blue-400">
                <div className='w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg bg-gray-100 dark:bg-gray-700 '>
                    {postData.author.user?.username[0].toUpperCase()}
                </div>
                <p>{postData.author.user?.username}</p>
                <p className='text-gray-400 text-sm'>{new Date(postData.created_at).toLocaleString('default', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false  })}</p>
                </Link>
                <div className=" flex items-center gap-2 justify-between mx-5">
                <p className='basis-4/5'>{postData.content.slice(0, 250) + (postData.content.length > 250 ? '...' : '')}</p>
                <div className="flex flex-col gap-2">

                <div className='flex flex-col items-center justify-center gap-1'>
                    {loading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                    ) : (
                    <button onClick={() => {handleLike(postData.id)}}>
                        
                        {thisUserData.liked_posts.some(likedPost => likedPost.id === postData.id) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill text-red-500" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                        )}
                    </button>

                    )}
                    <p>{postData.like_count}</p>
                </div>

                <div className='flex flex-col items-center justify-center gap-1'>
                    {loading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                    ) : (
                    <button onClick={() => {handleRepost(postData.id)}}>
                        
                        {thisUserData.reposted_posts.some(repostedPost => repostedPost.id === postData.id) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat text-blue-500" viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                        </svg>
                        )}
                    </button>

                    )}


                    <p>{postData.repost_count}</p>
                </div>

                </div>
                
                </div>
            </div>
        </div>

        
        <div>
            <h2 className='ml-8 text-2xl font-bold'>Comments {postData.comments.length}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mx-10 my-5 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your Comment</label>
                        <textarea onChange={(e) => {setUserComment(e.target.value)}} value={userComment} id="comment" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a Comment..." required ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        {loading ? (
                            <button disabled className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 hover:bg-blue-600">
                            Loading...
                        </button>
                        ) : (
                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Comment
                            </button>
                        )}
                        
                    </div>
                </div>
            </form>
        </div>


        <div className="flex flex-col gap-4">
            {postData.comments.map((comment) => (
                <div className='m-5' key={comment.id}>
                <div className='rounded bg-white shadow dark:bg-gray-800 p-3' key={comment.id}>
                    <h2 className="flex items-center w-full md:w-[calc(50%+20px)] lg:w-[calc(33%+20px)] gap-2 my-2 hover:text-blue-500 dark:hover:text-blue-400">
                    <div className='w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg bg-gray-100 dark:bg-gray-700 '>
                        {comment.author[0].toUpperCase()}
                    </div>
                    <p>{comment.author}</p>
                    <p className='text-gray-400 text-sm'>{new Date(comment.created_at).toLocaleString('default', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false  })}</p>
                    </h2>
                    <div className=" flex items-center gap-2 justify-between m-5">
                    <p className='basis-4/5'>{comment.content.slice(0, 250) + (comment.content.length > 250 ? '...' : '')}</p>
                    
                    </div>
                </div>
            </div>
            ))}
        </div>





    </div>
  )
}

export default PostDetail