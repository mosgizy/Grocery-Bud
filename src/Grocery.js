import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"

const Grocery = ({item,deleteBtn,editBtn}) => {
  return (
      <div className="flex flex-row justify-between mt-3 px-3.5 rounded-md transition delay-250 ease-in-out hover:bg-gray-200">
          <p className='text-xl capitalize tracking-wider'>{ item}</p>
          <div className="btns">
              <button className='text-xs text-green-400'>
                  <FontAwesomeIcon icon={faPenToSquare} onClick={editBtn} />
              </button>
              <button className='ml-3 text-xs text-red-400'>
                  <FontAwesomeIcon icon={faTrash} onClick={deleteBtn} />
              </button>
          </div>
      </div>
  )
}

export default Grocery
