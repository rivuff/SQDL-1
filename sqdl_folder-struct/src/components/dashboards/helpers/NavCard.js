import React from 'react'

const NavCard = (props) => {
   console.log(props);

  return (
    <div className={"py-10 h-screen flex flex-col gap-10 bg-gradient-to-r from-teal-200 to-teal-400 " + props.className}>
        { props.children }
    </div>
  )
}

export default NavCard