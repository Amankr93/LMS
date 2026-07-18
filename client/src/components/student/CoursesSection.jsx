import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import AppContext from '../../context/AppContext'

const CoursesSection = () => {
  const {allCourses, navigate}= useContext(AppContext)
  return (
    <div className='md:px-40 text-center  py-16 px-8'>
      <h2 className='text-3xl text-gray-800 font-bold '>Learn from the best</h2>
      <p className='text-gray-500 mt-3 md:text-base text-sm'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results</p>
      <div className='grid grid-cols-(--autofit) gap-4 px-4 md:px-0 my-10'>
        {
        allCourses.slice(0,4).map((course, index)=>{
         return <CourseCard course={course} key={index} />
        })
      }

      </div>
      
      
     <button className='px-10 py-3 border border-gray-500/30 rounded text-gray-500' onClick={()=>{navigate('/course-list') ;}}>Show all courses</button>
    </div>
  )
}

export default CoursesSection
