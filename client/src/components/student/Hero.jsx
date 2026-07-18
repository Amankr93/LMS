import { Search, SearchIcon } from 'lucide-react'
import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className=' flex flex-col items-center justify-center px-7 md:pt-0 space-y-7 text-center w-full md:pt-36 pt-20 bg-linear-to-b from-cyan-100/70'>
      <h1 className='md:text-heading-text-large text-heading-text-small max-w-3xl mx-auto font-bold text-gray-800 ' >Empower your future with the courses designed to <span className='text-blue-600'>fit your choice</span></h1>
      <p className='max-w-2xl text-gray-500 md:block hidden mx-auto'>We bring together world class instructors, interactive content, and a supportive community to <br />help you achieve your persional and professional goals. </p>
      <p className='max-w-sm text-gray-500 md:hidden mx-auto'>We bring together world class instructors to help you achieve your persional and professional goals. </p>
      <SearchBar/>
    </div>
  )
}

export default Hero
