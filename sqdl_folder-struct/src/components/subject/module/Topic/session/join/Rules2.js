import React from 'react'

function rules() {
  return (
    <div className='border-2 bg-blue-gray-100 border-black w-2/5 h-[23%] p-4 mr-1 mt-20 ml-2 absolute top-0 left-0'>
        <h1 className='text-orange-900 font-bold text-2xl text-center'>Instructions</h1>
        <hr className='border-1 border-black'/>
        <ul className='list-disc'>
          <li>At a time you can write only one question</li>
          <li>Click on "Submit question" button. after writing each question</li>
          <li>Assign appropriate tag and pririty to each question.</li>
          <li>5 is Highest priority and 1 is lowest priority.</li>
          <li>Do not click on submitted all my questions until you have posed all your question</li>
        </ul>
    </div>
  )
}

export default rules