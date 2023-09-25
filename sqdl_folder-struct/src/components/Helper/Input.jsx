import React from 'react'

const Input = (props) => (
    <input 
        ref={props.inputRef}
        type={props.type} 
        placeholder={props.placeholder} 
        className='p-2 font-xl outline-none border-2 w-full border-black hover:scale-110' 
    />
)

export default Input