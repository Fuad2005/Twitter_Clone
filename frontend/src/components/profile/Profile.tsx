import React from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserInfo } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store/store';
import Swal from 'sweetalert2';
import ProfileTab from './ProfileTab';
import { AppContext } from '@/pages/_app';
import Link from 'next/link';


export default function Profile({}) {

  const userData = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const setTokenCheck = React.useContext(AppContext)?.setTokenCheck

  const [tab, setTab] = React.useState<'posts' | 'likes' | 'reposts'>('posts');


  React.useEffect(() => {
    console.log(userData)
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/auth/login')
      }
    }, [router, userData]);


  const logoutHandler = React.useCallback(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token")
        setTokenCheck(prev => prev+1)
        await dispatch(resetUserInfo())
        router.push('auth/login')
      }
    })
  }, [router, dispatch, setTokenCheck])

  return (
    <div className='md:ml-64 min-h-[90vh]'>
      <div>
        <button onClick={logoutHandler} className='bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded shadow absolute top-5 right-5'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
        </svg>
        </button>
          <div className='p-5 sm:p-16 flex justify-between'>
              <div className='w-1/2 flex flex-col gap-4 items-centerjustify-center'>
                <div className='w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl bg-gray-100 dark:bg-gray-700 '>
                  {userData.username[0]?.toUpperCase()}
                </div>
                <p className='hidden md:block'>{userData.bio ==="" ? 'No Bio' : userData.bio}</p>

              </div>
              <div className='w-1/2 flex flex-col items-center gap-5'>
                <div className='text-2xl font-bold'>{userData.username}</div>
                <div className='flex text-center gap-4'>
                    <div>
                      <h3>Followers</h3>
                      <p>{userData.followers.length}</p>
                    </div>
                    <div>
                      <h3>Following</h3>
                      <p>{userData.following.length}</p>
                    </div>
                </div>

                <Link href={'profile/edit'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Edit Profile
                </Link>
              </div>
          </div>
          <p className='p-8 md:hidden'>{userData.bio ==="" ? 'No Bio' : userData.bio}</p>
      </div>

      <div>
        <ul className='flex gap-4 mx-4'>
          <li onClick={() => {setTab('posts')}} className={`p-3 cursor-pointer basis-1/3 flex justify-center items-center gap-2 rounded ${tab==='posts' ? 'bg-blue-300 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x3" viewBox="0 0 16 16">
            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z"/>
          </svg>
          <p className='hidden md:block'>Posts</p>
          </li>
          <li onClick={() => {setTab('reposts')}} className={`p-3 cursor-pointer basis-1/3 flex justify-center items-center gap-2 rounded ${tab==='reposts' ? 'bg-blue-300 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
          </svg>
          <p className='hidden md:block'>Reposts</p>
          </li>
          <li onClick={() => {setTab('likes')}} className={`p-3 cursor-pointer basis-1/3 flex justify-center items-center gap-2 rounded ${tab==='likes' ? 'bg-blue-300 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
          </svg>
          <p className='hidden md:block'>Likes Posts</p>
          </li>
        </ul>

        <div className='mt-5 mx-4'>
          {tab === 'posts' && (
            <ProfileTab data={userData.posts} />
          )}
          {tab === 'reposts' && (
            <ProfileTab data={userData.reposted_posts} />
          )}
          {tab === 'likes' && (
            <ProfileTab data={userData.liked_posts} />
          )}
          
        </div>
      </div>
    </div>
  )
}