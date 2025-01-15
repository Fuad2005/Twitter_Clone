import React from 'react'
import Link from 'next/link'
import { BASE_URL } from "@/utils/variables";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { GetUserByToken } from '@/utils/functions';




export default function Login({}) {

    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const router = useRouter()
    const dispatch = useDispatch()


    const handleInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setErrorMessage("")
            const { name, value }  = e.target
            setFormData({ ...formData, [name]: value })
        }, [formData])


    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${BASE_URL}/user/login/`, formData)
        .then(res => {
            console.log(res)
            localStorage.setItem("token", res.data.token)
            GetUserByToken(res.data.token, dispatch)
            router.push('/')
            
        }).catch(err => {
            setLoading(false)
            console.log(err.response.data)
            Object.values(err.response.data).forEach((value) => {
                for(const i of value) {
                    setErrorMessage(i)
                }
            })
        })
    }, [formData, router, dispatch])

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          router.push('/profile')
        }
      }, [router])

  return (
    <div className="md:ml-64">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  sm:h-[80vh] md:h-[90vh] lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        
        FD Twitter
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleInput}
                value={formData.username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInput}
                value={formData.password}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
           
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
            {errorMessage && (
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{errorMessage}</span>
                </div>
            </div>
                )}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don&apos;t  have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}