import React from 'react'
import { dummyTestimonial, assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const TestimonialSection = () => {
  return (
    <div className='flex items-center  flex-col space-y-5 px-7'>
      <h2 className='max-w-xl font-semibold text-3xl text-center text-gray-800'>Testimonials</h2>
      <p className='text-gray-500 text-center max-w-2xl font-medium'>Hear from our learners as they share their journeys of transformation, success and how our platform has made a difference in their lives</p>
      <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-7 px-20 items-center md:px-25 sm:px-30'>
        {dummyTestimonial.map((testimonial, index) => {
          return (
            <div className='flex flex-col border border-gray-100 shadow-2xl space-y-5  rounded-lg max-w-[300px] ' key={index}>
              <div className='flex gap-5 h-14 bg-gray-500/10 px-5 py-2 '>
                <img src={testimonial.image} alt="" />
                <div className='flex flex-col justify-center '>
                  <h3 className='text-lg font-medium text-gray-800/90'>{testimonial.name}</h3>
                  <p className='text-base text-gray-500'>{testimonial.role}</p>
                </div>

              </div>
              <div className='flex px-5'>
                {
                  [...Array(5)].map((_, i) => {
                    return i < Math.floor(testimonial.rating) ? <img key={i} src={assets.star} alt="" className='w-3.5 h-3.5' /> : <img src={assets.star_blank} key={i} alt="" className='w-3.5 h-3.5'  />
                  })
                }
              </div>
              <p className='text-gray-500 text-base px-5'>{testimonial.feedback}</p>
              <Link to={"/"} className="text-blue-400  underline decoration-dotted mt-5 mb-2 px-5">Read more</Link>

            </div>
          )
        })

        }

      </div>

    </div>
  )
}

export default TestimonialSection
