import React from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import EditProfile from '@/components/profile/EditProfile';


function Edit({}) {

    const userData = useSelector((state: RootState) => state.user)
    const router = useRouter()

    React.useEffect(() => {
    console.log(userData)
        const token = localStorage.getItem("token");
        if (!token) {
        router.push('/auth/login')
        }
    }, [router, userData]);

  return (
    <EditProfile />
  )
}

export default Edit