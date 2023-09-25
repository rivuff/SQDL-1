import React from 'react'
import ReactDOM from "react-dom";

const Backdrop = ({children}) => (
    <div className="fixed top-0 left-0 z-30 h-screen w-full bg-black opacity-50">
        {children}
    </div>
)

const BackdropModel = () => {
  return (
    <>
        {
            ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root')
            )
        }
    </>
  )
}

export default BackdropModel