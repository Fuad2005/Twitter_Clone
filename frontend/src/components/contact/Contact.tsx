import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import { BASE_URL } from '@/utils/variables';

function Contact({}) {

    const thisUserData = useSelector((state: RootState) => state.user)
    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const [contactData, setContactData] = React.useState({
        name: '',
        email: '',
        message: ''
    })
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)



    React.useEffect(() => {
        if (thisUserData.token !== '') {
            console.log(thisUserData)
            nameInputRef.current!.value = thisUserData.first_name
            emailInputRef.current!.value = thisUserData.email
            setContactData(prev => ({
                ...prev,
                name: thisUserData.first_name,
                email: thisUserData.email
            }))
        }
        else{
            console.log('no token')
        }
    }, [thisUserData])

    // React.useEffect(() => {
    //     console.log(contactData)
    // }, [contactData])


    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`${BASE_URL}/contact/`, contactData)
        .then(res => {
            console.log(res)
            setIsSuccess(true)
            setIsLoading(false)
            setContactData({
                name: '',
                email: '',
                message: ''
            })
        })
        .catch(err => {
            console.log(err)
            setIsSuccess(false)
            setIsLoading(false)
        })
    }, [contactData])

  return (
    <div className='md:ml-64'>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                    <input value={contactData.name} onChange={(e) => {setContactData(prev => ({...prev, name: e.target.value})); setIsSuccess(false)}} ref={nameInputRef} type="text" id="name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="John Doe" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <input value={contactData.email} onChange={(e) => {setContactData(prev => ({...prev, email: e.target.value})); setIsSuccess(false)}} ref={emailInputRef} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@website.com" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea value={contactData.message} onChange={(e) => {setContactData(prev => ({...prev, message: e.target.value})); setIsSuccess(false)}} id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                </div>
                {isLoading ? (
                    <button disabled type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400">Loading...</button>
                ) : (
                    <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send message</button>
                )}
            </form>
            {isSuccess && (
            <div className="flex items-center p-4 my-6 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-bold">Success:</span> Message sent successfully!
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Contact