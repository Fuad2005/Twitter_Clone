import React from 'react'
import { useRouter } from 'next/router';
import ProfileDetail from '@/components/profile/ProfileDetail';

function UserDetail() {

    const router = useRouter();
    const { id } = router.query;


  return (
    <ProfileDetail id={id} />
  )
}

export default UserDetail