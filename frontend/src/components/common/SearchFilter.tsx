import type { ChangeEvent } from 'react'
import Search from '../../assets/icons/Search'

const SearchFilter = ({ onChange = (e: ChangeEvent<HTMLInputElement>) => {}}) => {
  return (
    <div className='relative'>
      <input
          type="text"
          className='w-full py-2 pl-9 pr-4 border border-gray-300 focus:outline-2 outline-indigo-400 rounded-lg'
          placeholder='Search...'
          onChange={onChange}
        />
        <Search className='absolute left-2.5 top-[11px] text-gray-500' />
    </div>
  )
}

export default SearchFilter
