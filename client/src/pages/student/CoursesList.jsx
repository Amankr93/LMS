import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../components/student/SearchBar'
import AppContext from '../../context/AppContext'
import CourseCard from '../../components/student/CourseCard'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const {allCourses, navigate}=useContext(AppContext)
  const {input}= useParams();
 
  const [filteredCourses, setFilteredCourses] = useState([])
  useEffect(()=>{
    if(input){
      setFilteredCourses(allCourses.filter((course)=>course.courseTitle.toLowerCase().includes(input.toLocaleLowerCase())))
    }
    else{
      setFilteredCourses(allCourses)
    
    }
  }, [input, allCourses])
  // const filteredCourses= input? allCourses.filter((course)=>course.courseTitle.toLowerCase().includes(input.toLocaleLowerCase())): allCourses;
  
  
  return (
    <div className=''>
      <div className='flex flex-col md:flex-row  justify-between md:items-center mt-12 px-4 sm:px-10  md:px-14 lg:px-36'>
        <div className='flex flex-col items-start'>
          <h2 className='text-2xl font-semibold'>Course List</h2>
          <p className='text-gray-500'><span className='text-blue-600 cursor-pointer' onClick={()=>navigate('/')}>Home</span>/ Course List</p>
          {
          input&&<div className='flex  items-center border px-3 py-2 gap-2 rounded border-gray-500/30 mt-2'>
            <p className='text-gray-500  '>{input} </p>
            <img onClick={()=>navigate("/course-list")} src={assets.cross_icon} alt="" className='w-3' />

        </div>
        }
        </div>
        
        
        <div className='mx-auto mt-5 md:mt-0 md:mx-0'>
          <SearchBar/>
        </div>
        

      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-10 mt-12 gap-5 px-20 sm:px-10  md:px-14 lg:px-36'>
        {
          filteredCourses.map((course, index)=>{
           return < CourseCard course={course} key={index}/>

          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default CoursesList
