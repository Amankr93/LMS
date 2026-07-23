import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';


const CourseDetail = () => {
  const { id } = useParams();
  const { allCourses, calculateRating, calculateDuration, calculateTotalLecture, currency, backendUrl, userData, getToken } = useContext(AppContext);

  const [course, setCourse] = useState(null)
  const [isAlredyEnrolled, setIsAlredyEnrolled] = useState(false);
  const fetchCourseData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/course/' + id);
      if(data.success){
        setCourse(data.courseData);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
      
    }
  }
  const enrollCourse= async()=>{
    try {
      if(!userData){
      toast.warning("Please login to enroll in this course");
      return;
    }
    if(isAlredyEnrolled){
      return toast.warning('Already enrolled in this course');
    }
    const token = await getToken();
    console.log(backendUrl + '/api/user/purchase', course._id)
    const {data} = await axios.post(backendUrl + '/api/user/purchase', {courseId: course._id}, {headers:{Authorization:`Bearer ${token}`}});
    
    console.log(data, "purchase data");
    if(data.success){
      const {session_url} =data;
      console.log(session_url, "session url");
      window.location.replace(session_url)
      
    }
    else{
      toast.error(data.message);
    }
    } catch (error) {
      toast.error(error.message);
    }
    
  }
  useEffect(() => {
    fetchCourseData();
  }, [])
  useEffect(() => {
    if(userData && course){
      setIsAlredyEnrolled(userData.enrolledCourses.includes(course._id));
    }
  }, [userData, course])
  const [openSection, setOpenSection] = useState({})
  const toggleSection = (index) => {
    setOpenSection((prev) => (
      { ...prev, [index]: !prev[index] }
    ))

  }


  return (
    <>
   {
      course ? <div className='relative  sm:px-10 md:px-14 lg:px-36 py-4 px-8 flex flex-col-reverse md:flex-row gap-10 justify-between items-start text-left'>
      <div className='absolute top-0 left-0 h-60 w-full -z-1 bg-linear-to-b from-cyan-100/70 '></div>
      {/* left div */}
      <div className='max-w-2xl'>
        <h1 className='text-heading-text-small max-w-2xl font-semibold'>{course.courseTitle}</h1>
        <p className='text-gray-500 text-sm max-w-2xl' dangerouslySetInnerHTML={{ __html: course.courseDescription.slice(0, 180) }}></p>
        <div className='flex items-center space-x-2 mt-5'>
          <p>{calculateRating(course)}</p>
          <div className='flex '>
            {
              [...Array(5)].map((_, i) => {
                return i < Math.floor(calculateRating(course)) ? <img key={i} src={assets.star} alt="" className='w-3.5 h-3.5' /> :
                  <img key={i} src={assets.star_blank} alt="" className='w-3.5 h-3.5' />

              })
            }
          </div>
          <p className='text-blue-500'>({course.courseRatings.length} {course.courseRatings.length > 1 ? "ratings" : "rating"})</p>
          <p className='text-gray-500'>{course.enrolledStudents.length} {course.enrolledStudents.length > 1 ? "students" : "student"}</p>
        </div>
        <p>Course By <span className='text-blue-500 underline decoration-dotted'>{course.educator.name}</span></p>
        <div className='mt-10'>
          <h2 className='font-semibold text-xl'>Course Structure</h2>

          <p className='text-sm text-gray-500 md:text-md font-medium'>{course.courseContent.length} sections - {calculateTotalLecture(course)} {calculateTotalLecture(course) > 1 ? "lectures" : "lecture"} - {calculateDuration(course)} total duration</p>

          {
            course.courseContent.map((chapter, index) => {

              return (
                <div key={index} className='mt-3 ' >
                  <div className='flex justify-between items-center bg-gray-500/10 px-5 py-2 select-none' onClick={() => toggleSection(index)}>
                    <p className='text-gray-500 font-semibold flex gap-3 items-center'><img src={assets.down_arrow_icon} alt="" className={`${openSection[index] ? ' transform rotate-180' : ""}`} /> {chapter.chapterTitle}</p>
                    <div className='text-sm text-gray-500'>{calculateDuration(chapter)}</div>
                  </div>

                  <div className={`${openSection[index] ? 'max-h-26' : 'max-h-0'} overflow-hidden transition-all duration-300`}>
                    {
                      chapter.chapterContent.map((lecture,i) => {
                        return (
                          <div className='flex justify-between items-center px-5 py-2 ' key={i}>
                            <h3 className='flex gap-3 items-center text-gray-500 font-medium text-[15px]'><img src={assets.play_icon} alt="play icon" /> {lecture.lectureTitle}</h3>
                            <p className='text-sm text-gray-500'>{humanizeDuration(lecture.lectureDuration * 60 * 1000)}</p>
                          </div>
                        )
                      })
                    }
                  </div>


                </div>
              )
            })
          }


        </div>
        <div>
          <h3 className='text-xl font-medium mt-10 mb-3'>Course Description</h3>
          <p className='text-gray-500 text-sm md:text-default rich-text' dangerouslySetInnerHTML={{ __html: course.courseDescription }}></p>
        </div>


      </div>
      {/* right div */}
      <div className='max-w-[424px]  shadow-(--custom-card) rounded-t overflow-hidden md:rounded-none bg-white min-w-[300px] sm:min-w-[420px] mt-4 rounded'>
        <img src={course.courseThumbnail} alt="" />
        <div className='p-5'>
        <div >
         

          <div className='flex items-center gap-2'>
             <img src={assets.time_clock_icon} className='w-4 h-4' alt="" />
            <p className='text-red-500 '> <span className='font-medium'> 5 days</span> left at this price!</p>
          </div>
          <div className='flex gap-3 py-5 items-center'>
            <h2 className='text-2xl font-bold'>{currency} {(course.coursePrice - course.coursePrice * course.discount / 100).toFixed(2)}</h2>
            <p className='line-through font-medium text-gray-500'>{currency} {course.coursePrice }</p>
            <p className='font-medium text-gray-500'>{course.discount} % off</p>
          </div>
          <div className='flex pb-5 items-center'>
            <div className='flex   text-sm pr-3 items-center gap-2'>
              <img src={assets.star} className='w-3 h-3' alt="" />
              <p>{calculateRating(course)}</p>
            </div>
            <div className='h-3 w-px border border-gray-500/70'></div>
            <div className='flex   text-sm px-3 items-center gap-2'>
              <img src={assets.time_clock_icon} className='w-4 h-4' alt="" />
              <p>{calculateDuration(course)}</p>
            </div>
            <div className='h-3 w-px border border-gray-500/70'></div>

            <div className='flex  text-sm px-3 items-center gap-2'>
              <img src={assets.lesson_icon} className='w-4 h-4' alt="" />
              <p>{calculateTotalLecture(course)} {calculateTotalLecture(course) > 1 ? "Lessons" : "Lesson"}</p>
            </div>

          </div>

        </div>
        <button onClick={enrollCourse} className='w-full bg-blue-600 py-2 text-white rounded text-sm mb-5'>{isAlredyEnrolled? "Already Enrolled":"Enroll Now"}</button>
        <div>
          <h3 className='text-xl font-medium pb-5'>
            What's in this course?
          </h3>
          <ul className='list-disc text-gray-700 list-inside'>
            <li>Lifetime access with free updates</li>
            <li>Step by step hands on project-guidance.</li>
            <li>Downloadable resource and source code</li>
            <li>Quizzes to test your knowledge</li>
            <li>Certificate of completion</li>
            
          </ul>
        </div>

          </div>
      </div>
      

    </div> : <Loading />
  }
    <Footer />
</>
  )
}

export default CourseDetail
