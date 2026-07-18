import React, { useContext, useState } from 'react'
import { Search, SearchIcon } from 'lucide-react'
import AppContext from '../../context/AppContext';




const SearchBar = ({data}) => {
  const { navigate } = useContext(AppContext)
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input)
  }

  const [input, setInput] = useState(data? data: '');
  return (
    <form className='flex items-center border py-1 border-gray-500/20 rounded md:max-w-xl max-w-sm  w-full h-12 md:h-14' onSubmit={(e) => submitHandler(e)}>
      <Search width={'40px'} className='text-gray-500 px-2' />

      <input type="text" className='outline-none w-full h-full text-gray-500/80'

        placeholder='Search for courses'
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <button className='bg-blue-600 text-white md:px-10 px-7 md:py-3 py-2 mx-1 rounded-sm text-sm '>Search</button>
    </form>

  )
}

export default SearchBar
