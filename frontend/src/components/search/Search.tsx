import React from 'react'
import axios from 'axios'
import { IProfileBack } from '@/utils/types'
import { BASE_URL } from '@/utils/variables'
import Link from 'next/link'


function Search({}) {

    const [users, setUsers] = React.useState<IProfileBack[]>([])
    const searchRef = React.useRef(null)
    const [errMessage, setErrMessage] = React.useState<string>('')



    const handleSearch = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const searchValue = searchRef.current.value
        if (searchValue.includes(" ")) {
            setErrMessage('No Space Allowed')
            return
        }
        setErrMessage("")

        axios.get(`${BASE_URL}/user/get-all-profiles/?search=${searchValue}`)
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


  return (
    <div className='md:ml-64 min-h-[80vh]'>

    <form onSubmit={handleSearch} className="max-w-xl mx-6 sm:mx-auto my-5">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input ref={searchRef} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search FD Users..." required />
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        {errMessage !== '' ? (
            <div className='text-red-500'>
            ! {errMessage}
            </div>
        ): null}
    </form>

    <div className='flex flex-col gap-3 mx-5'>
        {users.length === 0 ? (
            <div className='text-gray-500'>
                No Users Found
            </div>
        ) : null}
        {users.map((user, idx) => (
            <Link href={`/search/${user.id}`} key={idx} className='flex justify-between items-center p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'>
                <div className="flex flex-col gap-2">
                    <div className='flex items-center gap-4'>
                        <div className='w-16 h-16 rounded-full flex items-center justify-center font-semibold text-2xl bg-gray-100 dark:bg-gray-800 '>
                            {user.user.username[0]?.toUpperCase()}
                        </div>
                        <div className='text-xl'>
                            {user.user.username}
                        </div>

                    </div>
                    <div className='text-sm opacity-70'>
                        {user.bio.slice(0, 50) + (user.bio.length > 50 ? '...' : '')}
                    </div>

                </div>
                <div>
                    <Link href={`/search/${user.id}`} className='bg-blue-600 text-white rounded p-3'>Open</Link>
                </div>
            </Link>

        ))}
        
    </div>

    </div>
  )
}

export default Search