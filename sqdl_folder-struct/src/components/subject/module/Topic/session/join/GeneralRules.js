import React from 'react'

const GeneralRules = ({className, rules}) => {
  return (
    <div className={`border-2 bg-blue-gray-100 border-black p-4 mr-1 mt-20 ml-2 absolute top-0 left-0 ${className}`}>
        <h1 className='text-orange-900 font-bold text-2xl text-center'>Instructions</h1>
        <hr className='border-1 border-black'/>
        <ul className='list-disc'>
          {rules.map(rule => <li>{rule}</li>)}
        </ul>
    </div>
  )
}

export default GeneralRules