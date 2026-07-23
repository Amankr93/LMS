import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'
import { Line } from 'rc-progress'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading'

const MyEnrollments = () => {
  const { enrolledCourses, navigate, calculateDuration, userData, backendUrl, fetchEnrolledCourses, getToken, calculateTotalLecture } = useContext(AppContext)
  const [progressArray, setProgressArray] = useState([]);
  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async(course)=>{
          const {data} = await axios.post(`${backendUrl}/api/user/get-course-progress`, {courseId:course._id}, {headers: {Authorization:`Bearer ${token}`}});
          let totalLecture = calculateTotalLecture(course);
          const lectureCompleted = data.progressData? data.progressData.lectureCompleted.length:0;
          return {totalLecture, lectureCompleted};
        })
        
      )
      setProgressArray(tempProgressArray)
    }catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(userData){
      fetchEnrolledCourses()
    }
  }, [userData]);
  useEffect(()=>{
    if(enrolledCourses.length > 0){
      getCourseProgress();
    }
  },[enrolledCourses])
  return (
    <>
     {enrolledCourses? <div className='px-4 sm:px-10 md:px-14 lg:px-36 py-4'>
      <h1 className='text-xl md:text-2xl font-semibold'>My Enrollments</h1>
      <table className=' md:table-auto w-full  overflow-hidden border border-gray-500/20 mt-10'>
        <thead className='text-left text-gray-900 border-b border-gray-500/20 max-sm:text-sm max-sm:hidden w-full'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration </th>
            <th className='px-4 py-3 font-semibold truncate'>Completed </th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {
          enrolledCourses?.map((course,index)=>{
            if(progressArray.length>0)return (
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='md:px-4 pl-2 md:pl-4 py-4 truncate flex items-center space-x-3'>
                    <img src={course.courseThumbnail} className='w-14 sm:w-24 md:w-24' alt="" />
                    <div className='flex-1'>
                      <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                      <Line strokeWidth={2} percent={progressArray[index]?(progressArray[index].lectureCompleted/progressArray[index].totalLecture)*100 :0} className='bg-gray-300 rounded-full'/>
                      
                    </div>
                  </td>
                  <td className='max-sm:hidden px-4 py-3'>
                    {calculateDuration(course)}
                  </td>
                  <td className='max-sm:hidden px-4 py-3'>
                    {progressArray[index]? progressArray[index].lectureCompleted:0} Lectures
                    

                  </td>
                  <td  className=' px-4 py-3'>
                    <button className='bg-blue-600 px-4 py-1 text-white max-sm:text-sm rounded min-w-27.5' onClick={()=>navigate('/player/'+ course._id)}>{ progressArray[index]&& progressArray[index].lectureCompleted/progressArray[index].totalLecture===1? "Completed":"Ongoing"}</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>
      
    </div>
    : <Loading />  }
    <Footer/>
    </>
  )
}

export default MyEnrollments
