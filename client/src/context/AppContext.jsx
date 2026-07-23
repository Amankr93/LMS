import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyCourses } from '../assets/assets';
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from '@clerk/react';
import axios from 'axios';
import { toast } from 'react-toastify';


const AppContext = createContext();
const calculateRating = (course) => {
  if (course.courseRatings.length === 0) return 0;
  let rating = 0;
  course.courseRatings.forEach((elem) => {
    rating += elem.rating;
  })
  return Math.floor(rating / course.courseRatings.length);
}
const calculateDuration = (course) => {
  if (course && Array.isArray(course.courseContent)) {
    let duration = 0;
    course.courseContent.forEach((chapter) => chapter.chapterContent.map((lecture) => duration += lecture.lectureDuration))
    return humanizeDuration(duration * 60 * 1000, { unit: ["h", "m"] })
  }
  else if (course && Array.isArray(course.chapterContent)) {
    let duration = 0;
    let chapterContent = course.chapterContent;
    chapterContent.forEach((lecture) => duration += lecture.lectureDuration)
    return humanizeDuration(duration * 60 * 1000, { units: ["h", "m"] })

  }



}
const calculateTotalLecture = (course) => {
  if (course && Array.isArray(course.courseContent)) {
    let lecture = 0;
    course.courseContent.forEach((chapter) => lecture += chapter.chapterContent.length)
    return lecture;
  }
  // else{
  //   let lecture=0;
  // }
}
export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const { getToken } = useAuth();
  const { user } = useUser();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [userData, setUserData] = useState(null)
  // Fetch all courses
  const fetchAllCourses = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/course/all');
      if(data.success){
        setAllCourses(data.courses);
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)

    }
    
  }
  // fetch user data
  const fetchUserData = async()=>{
    if(user.publicMetadata.role==='educator'){
      setIsEducator(true);
    }
    try {
      const token = await getToken();
      const {data} = await axios.get(backendUrl + '/api/user/data',{
        headers:{Authorization:`Bearer ${token}`}
      })
      if(data.success){
        setUserData(data.user);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
      
    }

  }
  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
    const {data} = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers:{Authorization:`Bearer ${token}`}})
    if(data.success){
      setEnrolledCourses(data.enrolledCourses.reverse())
    }else{
      toast.error(data.message);
    }
    } catch (error) {
      toast.error(error.message)
    }
    
  }
  
  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEnrolledCourses();
    }
  }, [user])

  useEffect(() => {
    fetchAllCourses();
  }, [])
  const value = { navigate, currency, calculateRating, allCourses, setAllCourses, allCourses, isEducator, setIsEducator, calculateDuration, calculateTotalLecture, enrolledCourses ,backendUrl, userData, fetchAllCourses,setUserData, getToken, fetchEnrolledCourses, fetchUserData}
  return (

    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
