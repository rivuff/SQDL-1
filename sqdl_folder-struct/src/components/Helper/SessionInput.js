import React from 'react'

const SessionInput = (props) => {
  return (
    <input 
        type={props.type}
        className='text-xl p-5 border-none rounded-xl w-3/5 placeholder:text-[14px] placeholder:text-black'
        placeholder={props.placeholder}
    />
  )
}

export default SessionInput