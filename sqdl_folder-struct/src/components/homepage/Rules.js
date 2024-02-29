import React from 'react'

function rules() {
  return (
    <div className='border-2 bg-blue-gray-100 border-black w-70 h-70 p-6 mr-1 mt-20 absolute top-0 right-0'>
        <h1 className='text-orange-900 font-bold text-2xl text-center'>Instructions</h1>
        <hr className='border-1 border-black'/>
        <ul className='list-disc'>
          <li>Already assigned means teacher is teaching a subject</li>
          <li>Associate Teacher means no teacher is teaching this subject</li>
        </ul>
    </div>
  )
}

export default rules