import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { BASE_URL } from '@/utils/variables';
import { IProfileBack } from '@/utils/types';
import ProfileTab from './ProfileTab';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { AppContext } from '@/pages/_app';
import { GetUserByToken } from '@/utils/functions';

type Props = {
    id: string
}

function ProfileDetail({id}: Props) {

    const router = useRouter();
    const dispatch = useDispatch();
    const [userData, setUserData] = React.useState<IProfileBack>({})
    const thisUserData = useSelector((state: RootState) => state.user)
    const [isFollowing, setIsFollowing] = React.useState<boolean>(false)
    const [isThisUser, setIsThisUser] = React.useState<boolean>(false)

    const [tab, setTab] = React.useState<'posts' | 'likes' | 'reposts'>('posts');
    



    const handleFollow = React.useCallback(() => {
        axios.get(`${BASE_URL}/user/follow/${userData.id}`, {
            headers: {
                'Authorization': `Token ${thisUserData.token}`
            }
        })
        .then(() => {
            GetUserByToken(thisUserData.token, dispatch)
            setIsFollowing(prev => !prev)
        })
        .catch(err => {
            console.log(err)
        })
    }, [userData, thisUserData, dispatch])



    React.useEffect(() => {
        console.log(thisUserData)
        if (id !== undefined) {
            const idNum = parseInt(id, 10)
                if (isNaN(idNum)) {
                    router.push('/search')
                  } else {
                    axios.get(`${BASE_URL}/user/get-profiles-by-id/?ids=${idNum}`)
                    .then(res => {
                      if (thisUserData.id === idNum) {
                        setIsThisUser(true)
                      }
                        setUserData(res.data[0])
                        // console.log(res.data[0])
                        if(thisUserData.following.includes(res.data[0].id)) {
                            setIsFollowing(true)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
        }

    }, [id, router, thisUserData])

  return (
    <div className='md:ml-64 min-h-[90vh]'>
    <div>
    
        <div className='p-5 sm:p-16 flex justify-between'>
            <div className='w-1/2 flex flex-col gap-4 items-centerjustify-center'>
              <div className='w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl bg-gray-100 dark:bg-gray-700 '>
                {userData.user?.username[0]?.toUpperCase()}
              </div>
              <p className='hidden md:block'>{userData.bio ==="" ? 'No Bio' : userData.bio}</p>

            </div>
            <div className='w-1/2 flex flex-col items-center gap-5'>
              <div className='text-2xl font-bold'>{userData.user?.username}</div>
              <div className='flex text-center gap-4'>
                  <div>
                    <h3>Followers</h3>
                    <p>{userData.followers?.length}</p>
                  </div>
                  <div>
                    <h3>Following</h3>
                    <p>{userData.following?.length}</p>
                  </div>
              </div>
              {isThisUser ? (
                null
              ) : (
                <button onClick={handleFollow} className={`${isFollowing ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}>
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}


            </div>
        </div>
        <p className='p-8 md:hidden'>{userData.bio ==="" ? 'No Bio' : userData.bio}</p>
    </div>

    <div>
      <ul className='flex gap-4 mx-4'>
        <li onClick={() => {setTab('posts')}} className={`p-3 cursor-pointer basis-1/2 flex justify-center items-center gap-2 rounded ${tab==='posts' ? 'bg-blue-300 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x3" viewBox="0 0 16 16">
          <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5V5h4V1zM5 6H1v4h4zm1 4h4V6H6zm-1 1H1v3.5a.5.5 0 0 0 .5.5H5zm1 0v4h4v-4zm5 0v4h3.5a.5.5 0 0 0 .5-.5V11zm0-1h4V6h-4zm0-5h4V1.5a.5.5 0 0 0-.5-.5H11zm-1 0V1H6v4z"/>
        </svg>
        <p className='hidden md:block'>Posts</p>
        </li>
        <li onClick={() => {setTab('reposts')}} className={`p-3 cursor-pointer basis-1/2 flex justify-center items-center gap-2 rounded ${tab==='reposts' ? 'bg-blue-300 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700' : 'bg-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
          <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
        </svg>
        <p className='hidden md:block'>Reposts</p>
        </li>
      </ul>

      <div className='mt-5 mx-4'>
        {tab === 'posts' && (
          <ProfileTab data={userData.posts} />
        )}
        {tab === 'reposts' && (
          <ProfileTab data={userData.reposted_posts} />
        )}
        
        
      </div>
    </div>
  </div>
  )
}

export default ProfileDetail