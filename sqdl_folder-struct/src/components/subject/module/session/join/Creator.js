import {React, useState} from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import {Drawer, Typography, IconButton, Button} from '@material-tailwind/react';
const Creator = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [sessionData, setSession] = useState()
  const [approved, setApproved] =  useState([])
  const [blocked, setBlocked] =  useState([])
  const [requested, setRequested] =  useState([])

  async function getSession(){
    return null
  }
  if (sessionData == null){
    getSession()
  }
  setInterval(()=>{getSession()}, 5000) //periodically fetch session data to reflect updates
  return (    
    <div>
    <Button onClick={openDrawer}>Manage Students</Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4" placement = 'top'>
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Students
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-row">
          <div className='flex-col w-1/3 overflow-y-auto'>
            Approved
            
          </div>
          <div className='flex-col w-1/3 overflow-y-auto'>
            Requested Access
          </div>
          <div className='flex-col w-1/3 overflow-y-auto'>
            Blocked
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default Creator