import React from 'react'
import { assets } from '../../assets/assets'
import { useUser , UserButton} from '@clerk/react'
import { Link } from 'react-router-dom';

const Navbar = () => {
const {user}= useUser();

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-36 w-full flex justify-between py-4 border-b border-b-gray-500/30'>
      <Link to='/'>
      <img src={assets.logo} alt="" />
      </Link>
    <div className='flex gap-2 items-center'>
      <p className='text-gray-500/90 text-lg'>
        Hi {user? user.fullName:"Developer"}
      </p>
      {user? <UserButton/>: <img src={assets.profile_img} alt="" className='w-10' />}
    </div>
    </div>
  )
}

export default Navbar
