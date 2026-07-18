import React from 'react'

const Loading = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-16 sm:w-20 aspect-square border-t-4 border-t-blue-400 border-4 border-gray-300  rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading
