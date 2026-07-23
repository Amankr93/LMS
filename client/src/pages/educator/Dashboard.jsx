import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import AppContext from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const {currency, backendUrl, isEducator, getToken}= useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)
  const fetchDashboardData = async() => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard', { headers: { Authorization: `Bearer ${token}` } })
      if(data.success){
        setDashboardData(data.dashboardData)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if(isEducator){
      fetchDashboardData();
    }
    
  }, [isEducator])
  return dashboardData ? (
    <div className='flex flex-col p-4 items-start justify-between md:p-8 md:pb-0 pt-8 pb-0'>
      <div className='flex flex-wrap gap-5 items-center '>
        <div className='flex gap-3 p-4 border border-blue-100 rounded-lg  w-56'>
          <img src={assets.patients_icon} alt="" className='w-12 h-12 rounded-full ' />
          <div>
            <p className='text-2xl text-gray-800'>{dashboardData.enrolledStudentsData.length}</p>
            <p className='text-gray-500 text-base'>Total Enrollments</p>
          </div>
        </div>
        <div className='flex gap-3 p-4 border border-blue-100 rounded-lg  w-56'>
          <img src={assets.appointments_icon} alt="" className='w-12 h-12 rounded-full ' />
          <div>
            <p className='text-2xl text-gray-800 font-semibold'>{dashboardData.totalCourses}</p>
            <p className='text-gray-500 text-base'>Total Courses</p>
          </div>
        </div>
        <div className='flex gap-3 p-4 border border-blue-100 rounded-lg  w-56'>
          <img src={assets.earning_icon} alt="" className='w-12 h-12 rounded-full ' />
          <div>
            <p className='text-2xl text-gray-800 font-semibold'>{currency} {dashboardData.totalEarnings}</p>
            <p className='text-gray-500 text-base'>Total Earnings</p>
          </div>
        </div>

      </div>
      <div className='mt-5'>
        <h1 className='pb-4 text-lg font-medium'>Latest Enrollments</h1>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden roundesd-md bg-white border border-gray-500/20'>
          <table className='md:table-fixed text-left table-auto w-full overflow-hidden'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm'>
              <tr >
                <th className='px-4 py-3 font-semibold  hidden sm:table-cell'>#</th>
                <th className='px-4 py-3 font-semibold'>Student Name</th>
                <th className='px-4 py-3 font-semibold'> Course Title</th>
              </tr>
            </thead>
            <tbody className='text-gray-500'>
              {
                dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr className='border-b border-gray-500/20 ' key={index}>
                    <td className='hidden md:table-cell px-4 py-3'>
                      {index+1}

                    </td>
                    <td className='px-4 py-3 flex items-center gap-2 truncate'>
                      <img src={item.student.imageUrl} alt="" className='w-10 h-10' />
                      <p>{item.student.name}</p>
                    </td>
                    <td className='px-4 py-3'>
                      {item.courseTitle}
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard
