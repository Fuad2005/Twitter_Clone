import React from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserInfo } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store/store';
import Swal from 'sweetalert2';


export default function Profile({}) {

  const userData = useSelector((state: RootState) => state.user)


    const router = useRouter()
    const dispatch = useDispatch()

    React.useEffect(() => {
      console.log(userData)
        const token = localStorage.getItem("token");
        if (!token) {
          router.push('auth/login')
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
        await dispatch(resetUserInfo())
        router.push('auth/login')
      }
    })
  }, [router, dispatch])

  return (
    <div className='md:ml-64'>
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
              <p className='hidden md:block'>{userData.bio}</p>

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

              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Edit Profile
              </button>
            </div>
        </div>
        <p className='p-8 md:hidden'>{userData.bio}</p>
    </div>
  )
}