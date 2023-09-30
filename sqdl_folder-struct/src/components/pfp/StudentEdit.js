import React, {useState, useRef} from 'react';

import {
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

const StudentEdit = ({data, updateData}) => {

    const [editForm, setEditForm] = useState(false);
    const [userData, setUserData] = useState(data)

    const nameRef = useRef(data.name);
    const emailRef = useRef('');
    const ernoRef = useRef('');
    const rnoRef = useRef('');

    const formData = [
        {
            label: "Name",
            Ref: nameRef,
            value: userData.name
        },
        {
            label: "Email",
            Ref: emailRef,
            value: userData.email
        },
        {
            label: "Enrollment Number",
            Ref: ernoRef,
            value: userData.enrollmentNumber
        },
        {
            label: "Roll Number",
            Ref: rnoRef,
            value: userData.rollNumber
        },
    ]

    const handleEdit = () => {
        setEditForm(true);
    }

    const handleSave = () => {
        setUserData(prev => {
            return {
                ...prev, name: nameRef.current.value, email: emailRef.current.value, 
                enrollmentNumber: ernoRef.current.value, rollNumber: rnoRef.current.value
            }
        });
        updateData(userData);
        setEditForm(false);
    }

  return (
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
            {formData.map(ele => {
                return <Input size="lg" label={ele.label} inputRef={ele.Ref} disabled={!editForm} value={ele.value}/>
            })}
        </div>
        <Button className="mt-6 mr-5" onClick={handleEdit}>
            Edit
        </Button>
        <Button className="mt-6" onClick={handleSave}> 
            Save
        </Button>
    </form>
  )
}

export default StudentEdit;