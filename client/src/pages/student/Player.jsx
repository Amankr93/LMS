import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';
import  Rating  from '../../components/student/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';
                                                                                              
const Player = () => {
  const { enrolledCourses, navigate, calculateRating, calculateTotalLecture, calculateDuration, backendUrl, getToken, fetchEnrolledCourses, userData } = useContext(AppContext)
  const { courseId } = useParams();
  const [course, setCourse] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [playerData, setPlayerData] = useState(null)
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const toggleSection = (index) => {
    setOpenSection((prev) => (
      { ...prev, [index]: !prev[index] }
    ))

  }
  const getCourseData = ()=>{
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourse(course);
        course.courseRatings.map((item=>{
   
          if(item.userId = userData._id)setInitialRating(item.rating)
          
        }))
      }
    })

  }
  useEffect(() => {
    if(enrolledCourses.length >0){
      getCourseData();
    
    }
  }, [enrolledCourses])
const markLectureAsCompleted = async(lectureId)=>{
  try {
    const token = await getToken();
    const {data} = await axios.post(backendUrl + '/api/user/update-course-progress', {courseId,lectureId}, {headers:{Authorization:`Bearer ${token}`}});
    if(data.success){
      toast.success(data.message);
      getCourseProgress();
    }else{
      toast.error(data.message)
    }
  } catch (error) {
      toast.error(error.message)
    
  }
}
const getCourseProgress =async () => {
  try {
     const token = await getToken();
    const {data} = await axios.post(backendUrl + '/api/user/get-course-progress', {courseId}, {headers:{Authorization:`Bearer ${token}`}});
    if(data.success){
      
      setProgressData(data.progressData);
     

    }else{
      toast.error(data.message)
    }
    
  } catch (error) {
      toast.error(error.message)
    
  }
}
const handleRate =async (rating) => {
  try {
    const token = await getToken();
    const {data} = await axios.post(backendUrl + '/api/user/add-user-rating', {courseId, rating}, {headers:{Authorization:`Bearer ${token}`}});
    if(data.success){
      toast.success(data.message);
      fetchEnrolledCourses()

    }else{
      toast.error(data.message)
    }
  } catch (error) {
    
  }
}
useEffect(()=>{
  getCourseProgress();
})

  return course ?(
    <div className=''>

      <div className='px-4 sm:px-10 md:px-14 lg:px-36 flex  flex-col-reverse md:grid md:grid-cols-2 gap-10 justify-between  items-start'>
        {/* left div */}

        <div className='mt-10 w-full'>
          <h2 className='font-semibold text-xl'>Course Structure</h2>

          {
            course && course.courseContent.map((chapter, index) => {

              return (
                <div key={index} className='mt-3 border border-gray-500/30' >
                  <div className='flex justify-between items-center bg-gray-500/10 px-5 py-2 select-none' onClick={() => toggleSection(index)}>
                    <p className='text-gray-600 font-semibold flex gap-3 items-center'><img src={assets.down_arrow_icon} alt="" className={`${openSection[index] ? ' transform rotate-180' : ""}`} /> {chapter.chapterTitle}</p>
                    <div className='text-sm text-gray-500'>{chapter.chapterContent.length} - Lectures -  {calculateDuration(chapter)}</div>
                  </div>

                  <div className={`${openSection[index] ? 'max-h-26' : 'max-h-0'} overflow-hidden transition-all duration-300`}>
                    {
                      chapter.chapterContent.map((lecture, i) => {
                        return (
                          <div className='flex justify-between items-center px-5 py-2 ' key={i}>
                            <h3 className='flex gap-3 items-center text-gray-700 font-medium text-[15px]'><img src={progressData && progressData.lectureCompleted.includes(lecture.lectureId)? assets.blue_tick_icon: assets.play_icon} alt="play icon" /> {lecture.lectureTitle}</h3>
                            <div className='flex gap-2'>
                              {
                                lecture.lectureUrl && <p className='text-sm text-blue-500 cursor-pointer' onClick={()=>{setPlayerData({...lecture, chapter:index+1, lecture:i+1})
                              }}>Watch</p>
                              }
                              <p className='text-sm text-gray-500'>{humanizeDuration(lecture.lectureDuration * 60 * 1000)}</p>
                            </div>
                            
                          </div>
                        )
                      })
                    }
                  </div>


                </div>
              )
            })
          }

          <div className='flex items-center gap-2 mt-10 pb-5'>
            <h1 className='text-xl font-bold'>Rate this course</h1>
            <Rating initialRating={initialRating} onRate={handleRate}/>
          </div>

        </div>

        {/* right div */}
        <div className='mt-10'>
          {
            playerData? (
              <div className='shadow-(--custom-card) rounded-t overflow-hidden md:rounded-none bg-white  mt-4 rounded-md py-4'>
                <YouTube videoId={playerData.lectureUrl.split('/').pop()}  opts={{playerVars: {autoplay:1}}} iframeClassName='w-full aspect-video'/>
               
                 <div className='flex  items-center w-full justify-between mt-4 px-4'>
                  <p className='text-gray-700'>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                  <button onClick={()=>markLectureAsCompleted(playerData.lectureId)} className='text-white bg-blue-600 px-3 py-2 rounded'>{progressData && progressData.lectureCompleted.includes(playerData.lectureId)? 'Completed' :"Mark Completed"}</button>
                 </div>
              </div>
            ): 
            <img src={course? course.courseThumbnail:""} alt="" />
          }
          
        </div>
      </div>
      <Footer/>
    </div> 
  ):<Loading />
}

export default Player
