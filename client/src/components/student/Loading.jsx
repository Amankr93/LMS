import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Loading = () => {
  const {path} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    if(path){
      const timer = setTimeout(()=>{  
        navigate(`/${path}`);
      },5000)
      return ()=> clearTimeout(timer);
    }
    
  })

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-16 sm:w-20 aspect-square border-t-4 border-t-blue-400 border-4 border-gray-300  rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading
