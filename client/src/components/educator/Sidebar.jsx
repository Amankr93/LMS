import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { assets } from '../../assets/assets';
import { NavLink,  } from 'react-router-dom';

const Sidebar = () => {
  const {isEducator} = useContext(AppContext);
  const menuItems = [
    {name:'Dashboard', path:'/educator', icon:assets.home_icon},
    {name:'Add Courses', path:'/educator/add-course', icon:assets.add_icon},
    {name:'My Courses', path:'/educator/my-courses', icon:assets.my_course_icon},
    {name:'Student Enrolled', path:'/educator/student-enrolled', icon:assets.person_tick_icon}
  ]
  return isEducator &&(
    <div className='min-h-screen md:w-64 w-16 border-r border-gray-500 text-base flex flex-col py-3 gap-2'>
      {
        menuItems.map((item, index)=>(
          <NavLink to={item.path} key={index} end={item.path=== '/educator'} className={({isActive})=>`flex  items-center md:flex-row  flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive? 'border-r-[6px]  border-indigo-500/90':"hover:bg-indigo-100/90  hover:border-r-[6px] border-white  hover:border-indigo-300/90"}`}>
            <img src={item.icon} alt="" className='w-6 h-6'/>
            <p className=' md:block hidden text-center'>{item.name}</p>
          </NavLink>
        ))
      }
    </div>
  )
}

export default Sidebar
