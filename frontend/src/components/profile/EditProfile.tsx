import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import { BASE_URL } from '@/utils/variables';
import { useRouter } from 'next/router';
import { AppContext } from "@/pages/_app";

function EditProfile({}) {

    const [currentData, setCurrentData] = React.useState({
        username: '',
        bio: ''
    })

    const [editInto, setEditInto] = React.useState({
        username: '',
        bio: ''
    })

    const router = useRouter()
      const setRefreshUserData = React.useContext(AppContext)?.setRefreshUserData
    const thisUserData = useSelector((state: RootState) => state.user)

    const [isLoading, setIsLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    React.useEffect(() => {
        setEditInto({
            username: thisUserData.username,
            bio: thisUserData.bio === '' ? '' : thisUserData.bio
        })
        setCurrentData({
            username: thisUserData.username,
            bio: thisUserData.bio === '' ? '' : thisUserData.bio
        })
    }, [thisUserData])

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data: {user?: {username? : string}, bio?: string} = {}
        if (editInto.username !== currentData.username) {
            data.user = {username: editInto.username}
        }
        if (editInto.bio !== currentData.bio) {
            data.bio = editInto.bio
        }
        // console.log("curr", currentData)
        // console.log("edit", editInto)
        // console.log(data)
        setIsLoading(true)
        const token = thisUserData.token
        axios.patch(`${BASE_URL}/user/edit-profile/`, data, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(() => {
            setRefreshUserData(prev => prev+1)
            setIsLoading(false)
            router.push('/profile')
        })
        .catch(err => {
            setIsLoading(false)
            console.log(err)
            setErrorMessage(err.response.data.user?.username[0])
        })
    }, [editInto, thisUserData, router, setRefreshUserData, currentData])


  return (
    <div className='md:ml-64 min-h-[80vh] flex justify-center items-center'>
        <div className='basis-[90%] lg:basis-[75%]'>
        <form onSubmit={handleSubmit}>
            <div className=" my-4 rounded-lg flex flex-col gap-4">
                    <label htmlFor="username" className='font-bold text-xl'>Username</label>
                <div className="px-4 py-2 bg-white rounded-lg dark:bg-gray-800">
                    <input onChange={(e) => {setEditInto(prev => ({...prev, username: e.target.value})); setErrorMessage('')}} value={editInto.username} id="username" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Username" required />
                </div>
                    <label htmlFor="bio" className='font-bold text-xl'>Bio</label>
                <div className="px-4 py-2 bg-white rounded-lg dark:bg-gray-800">
                    <textarea onChange={(e) => {setEditInto(prev => ({...prev, bio: e.target.value})); setErrorMessage('')}} value={editInto.bio} id="bio" rows={4} className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Bio" required ></textarea>
                </div>
                <div className="flex items-center justify-center gap-4 px-3 py-2 text-center">
                    <Link href={'/profile'} className=" inline-flex items-center py-2.5 px-5 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                        Cancel
                    </Link>
                    {isLoading ? (
                        <button type="submit" className=" inline-flex items-center py-2.5 px-5 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 hover:bg-blue-600"> Loading... </button>
                    ) : (
                        <button type="submit" className=" inline-flex items-center py-2.5 px-5 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"> Save Changes </button>
                    )}
                    
                </div>
            </div>
            </form>
            {errorMessage && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                    <span className="font-medium">Error!</span> {errorMessage}
                    </div>
              </div>
            )}
        </div>
    </div>
  )
}

export default EditProfile