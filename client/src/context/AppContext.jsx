import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyCourses } from '../assets/assets';
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from '@clerk/react';

const AppContext = createContext();
const calculateRating = (course) => {
  if (course.courseRatings.length === 0) return 0;
  let rating = 0;
  course.courseRatings.forEach((elem) => {
    rating += elem.rating;
  })
  return rating / course.courseRatings.length;
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
      course.courseContent.forEach((chapter) => lecture+=chapter.chapterContent.length)
      return lecture;
    }
    // else{
    //   let lecture=0;
    // }
  }
export const AppContextProvider = (props) => {
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  }
  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  }
  const{getToken}= useAuth();
   const {user} = useUser()
  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses();
  }, [])
  const logToken= async ()=>{
    console.log(await getToken())
  }
  useEffect(()=>{
    if(user){
      logToken()
    }
  }, [user])
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const value = { navigate, currency, calculateRating, allCourses, setAllCourses, allCourses, isEducator, setIsEducator, calculateDuration, calculateTotalLecture, enrolledCourses }
  return (

    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
