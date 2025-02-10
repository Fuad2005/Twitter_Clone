import React from 'react'
import { useRouter } from 'next/router';
import PostDetail from '@/components/Post/PostDetail';

function PostDetailPage() {

    const router = useRouter();
    const { id } = router.query;


  return (
    <PostDetail id={id} />
  )
}

export default PostDetailPage