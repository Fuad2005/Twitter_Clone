import React from 'react'
import { IMiniPost } from '@/utils/types'


function ProfileTab({data}: {data: IMiniPost[]}) {
  return (
   <div className='flex flex-col gap-4'>
    {data?.map(post => (
        <div className='rounded bg-white shadow dark:bg-gray-800 p-3' key={post.id}>
            <p>{post.content}</p>
            <p>{post.author}</p>
            <p>{new Date(post.created_at).toLocaleString('default', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false  })}</p>
        </div>
    ))}
   </div>
  )
}

export default ProfileTab