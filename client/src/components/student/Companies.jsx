import React from 'react'
 import {assets} from '../../assets/assets'
const{accenture_logo,adobe_logo, microsoft_logo, paypal_logo,walmart_logo}=assets;
const Companies = () => {
  return (
    <div className='md:max-w-4xl mx-auto text-center md:mt-20 mt-10'>
      <h3 className='text-gray-500'>Trusted by learners from</h3>
      <div className='flex items-center w-full justify-center gap-10 flex-wrap mt-5' >
        {/* {
           companieslogo.map((curElem)=> <img src={curElem} alt="bjkj" className='w-30'/>
            
          )
        } */}
        <img src={accenture_logo} alt="" className='w-30' />
        <img src={microsoft_logo} alt="" className='w-30'/>
        <img src={adobe_logo} alt="" className='w-30'/>
        <img src={paypal_logo} alt="" className='w-30'/>
        <img src={walmart_logo} alt=""className='w-30' />
      </div>

    </div>
  )
}

export default Companies
