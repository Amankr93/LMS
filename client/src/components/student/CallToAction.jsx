import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-2 px-0 py-25 md:px-40 md:py-30'>
      <h1 className=' md:text-4xl sm:text-3xl text-2xl text-center font-semibold'>Learn anything, anytime, anwhere</h1>
      <p className=' text-base max-w-md text-center text-gray-500 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, praesentium. Pariatur autem blanditiis officia!</p>
      <div className='flex gap-5  mt-5'>
        <button className='text-white bg-blue-600 px-3 py-2 text-sm rounded'>Get started</button>
        <button className='flex gap-3 font-medium items-center'>Learn more <img className='w-4' src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
