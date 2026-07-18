import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {assets} from '../../assets/assets.js'
import { User, X } from "lucide-react"
import { SignInButton, useClerk, UserButton, useUser } from '@clerk/react';
import AppContext from '../../context/AppContext.jsx';

const Navbar = () => {
  const isCOurseListPage = location.pathname.includes("course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const {navigate, isEducator}= useContext(AppContext)
  return (
    <div className={`flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 py-4 border-b border-gray-500 ${isCOurseListPage ? 'bg-white' : 'bg-cyan-100/70'}`} >
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" className='w-28 h-10 cursor-pointer' />
      </Link>
      
      <div className='hidden md:flex justify-between gap-5 text-gray-500 items-center'>
        <div className='flex gap-5 items-center' >
          {
            user && <>
              <button onClick={()=>{navigate('/educator')}}>{isEducator? 'Educator-Dashboard': 'Become Educator'}</button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          }

        </div>
        {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full ' >Create Account</button>}
        {/* <SignInButton/> */}



      </div>

      <div className='flex items-center gap-2 text-gray-500 sm:gap-5 md:hidden'>
        <div className=' flex gap-2 sm:gap-2 items-center max-sm:text-xs '>
          {
            user && <>
              <button className='text-sm' onClick={()=>{navigate('/educator')}}>{isEducator? 'Educator-Dashboard': 'Become Educator'}</button>
              <Link className='text-sm'  to="/my-enrollments">My Enrollments</Link>
            </>
          }

        </div>
        {user? <UserButton/>:<button onClick={()=>openSignIn()}><User /></button> }
        
      </div>
    </div>
  )
}

export default Navbar
