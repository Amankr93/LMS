import React, { useEffect, useState } from 'react'

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(null);
  const handleRating = (i) => {
    setRating(i + 1);
    onRate(i + 1);
  }
  useEffect(() => {
    if (initialRating) {
      setRating(initialRating)
    }
  }, [])
  return (
    <div>
      <div className='flex gap-1'>
        {
          [...Array(5)].map((_, i) => (
            <span key={i} className={`text-xl ${i + 1 <= rating ? 'text-yellow-500' : 'text-gray-500 '} cursor-pointer `} onClick={() => handleRating(i)}>&#9733;</span>
          ))
        }

      </div>

    </div>
  )
}

export default Rating
