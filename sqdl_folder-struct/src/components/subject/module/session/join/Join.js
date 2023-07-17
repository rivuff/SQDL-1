import React, { useState } from 'react'
import { check } from '../../../../Cookies'
import { useParams } from 'react-router-dom'
import { GLOBAL_URL } from '../../../../config'
import axios from 'axios'
import Creator from './Creator'

const Join = () => {
    const [auth,setAuth] = useState(null)
    let user = check()
    let params = useParams()
    const res = {
        headers: {
            "Content-type": "application/json",
        }
    }
    async function detail (){
        let subject = await axios.post(GLOBAL_URL + 'subject/getByID', { _id: params.subjectid }, res)
        let session = await axios.post(GLOBAL_URL + 'session/get', { _id: params.sessionid }, res)
        //removing HTTP headers from response
        subject = subject.data.data 
        session = session.data.data
        if (session.createdBy == user._id && user.type =='teacher'){ //user is the creator of session
            setAuth( 'Creator')
        }

        else if (user.type == 'student'){
            if (session.approved_request.includes(user._id)){
                setAuth('Allowed')
                //redirect
            }
            else if (session.access_request.includes(user._id)){
                setAuth('Requested')
                //redirect
            }
            else if (session.blocked_request.includes(user._id)){
                setAuth('Blocked')
                //redirect
            }
            else if (user.subjects.includes(subject._id) && user.allowedBy.includes(session.createdBy)){
                //function to add to  allowed access
                console.log('Allowed Access....')
                let aa = session.approved_request
                aa.push(user._id)
                axios.post(GLOBAL_URL+'session/update',{approved_request: aa, _id: session._id},res)
                .then((response)=>{
                    console.log(response)
                    setAuth( 'Allowed')
                })
            }
            else {
                //function to add to access reqeust
                console.log('Requesting access...')
                let ra = session.access_request
                ra.push(user._id)
                console.log(ra)
                axios.post(GLOBAL_URL + 'session/update', { access_request: ra, _id: session._id }, res)
                    .then((response) => {
                        setAuth('Requested access')
                    })
            }
        }
        else{
            setAuth( 'Not Authorized')
        }
    }
    if (auth != 'Creator' || auth != 'Allowed'){
        setTimeout(()=>{
            detail() //wait 10 seconds before updating status
        }, 10000)
    }
    if (auth == 'Creator'){
        return <Creator/>
    }
    if (auth == 'Allowed'){
        //render allowed page
    }    
    if (auth == 'Requested'){
        return(
            <div className='text-center h-screen flex flex-col items-center justify-center'>
                You have requested access for this subject. Once {session.conductedBy} approves, you will be able to join
            </div>
        )
    }    if (auth == 'Blocked'){
        return (
            <div className='text-center h-screen flex flex-col items-center justify-center'>
                    You have been blocked from this subject. Please reach out to {session.conductedBy} for assistance
            </div>
        )
    }
}

export default Join