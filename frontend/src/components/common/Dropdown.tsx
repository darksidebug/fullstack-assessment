import { useState } from "react"
import CaretRight from "../../assets/icons/CaretRight"
import Sort from "../../assets/icons/Sort";

const Dropdown = ({ placeholder = 'Sort name', onSelect = (value: string) => {} }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      role="button"
      className={`relative min-w-[220px] py-2 px-3 border border-gray-300 rounded-lg cursor-pointer ${showMenu && 'outline-2 outline-indigo-400'}`}
      onClick={() => setShowMenu(state => !state)}
    >
      <Sort className="absolute top-2.5 left-2.5 text-gray-500 size-5" />
      <span className={`ml-7  ${!selectedItem ? 'text-gray-500/90' : ''}`}>{selectedItem || placeholder}</span>
      <CaretRight className={`absolute right-2 top-[11px] ${showMenu ? '-rotate-90' : 'rotate-90'} text-gray-500/90`} />
      {showMenu && (
        <div className="w-full p-[2px] absolute z-4 left-0 top-full shadow-md border border-gray-200 rounded-xl bg-white overflow-hidden">
          <div
            role="button"
            className="py-2 px-3 hover:bg-gray-50"
            onClick={() => {
              setSelectedItem('Sort Ascending');
              onSelect('asc');
            }}
          >
            Sort Ascending
          </div>
          <div
            role="button"
            className="py-2 px-3 hover:bg-gray-50"
            onClick={() => {
              setSelectedItem('Sort Descending');
              onSelect('desc');
            }}
          >
            Sort Descending
          </div>
          <div
            role="button"
            className="py-2 px-3 hover:bg-red-100 border-t border-gray-200"
            onClick={() => {
              setSelectedItem('');
              onSelect('null');
            }}
          >
            Clear sorting
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
