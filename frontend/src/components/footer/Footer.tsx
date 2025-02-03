import Link from 'next/link'
import React from 'react'


export default function Footer({}) {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 md:w-[calc(100%-300px)] md:ml-[280px]">
        <div className="w-full mx-auto max-w-screen-xl p-4 text-center flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-lg font-semibold text-gray-500 sm:text-center dark:text-gray-400">FD Twitter
        </span>
        <ul className="flex flex-wrap items-center justify-center mt-5 text-sm font-medium text-gray-500 dark:text-gray-400 md:mt-0">
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
        </ul>
        </div>
    </footer>

  )
}