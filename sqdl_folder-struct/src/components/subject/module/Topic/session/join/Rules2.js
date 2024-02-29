import React from 'react'

function rules() {
  return (
    <div className='border-2 bg-blue-gray-100 border-black w-70 h-70 p-6 mr-1 mt-24 ml-2 absolute top-0 left-0'>
        <h1 className='text-orange-900 font-bold text-2xl text-center'>Instructions</h1>
        <hr className='border-1 border-black'/>
        <ul className='list-disc'>
          <li>Do not click on submitted all my questions until you have posed all your question</li>
        </ul>
    </div>
  )
}

export default rules