import React, { useEffect, useState } from 'react'
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from 'axios'

import TeacherInvite from './TeacherInvite';
import AdminPopover from './AdminPopover';
import LoadingRow from './LoadingRow';
import Row from './Row';


const TeacherTable = () => {
    const [state, setState] = useState({
        isLoading: true,
        data: []
    })
    
    async function fetchTeacherData() { //= async(req,res)=>{
        const res = {
            headers: {
                "Content-type": "application/json",
            }
        }
        axios.get(`http://localhost:5000/api/v1/user/getall`, res).then((response) => {
            let allusers = response.data.data
            let allteachers = []
            allusers.forEach((user) => {
                if ((user.type) == 'student') {
                    allteachers.push(user)
                }
            })
            setState({ ...state, isLoading: false, data: allteachers });
        }).catch((error) => {
            {
                console.log(error)
            }
        })
    }
    if (state.isLoading) {
        fetchTeacherData()
    }
    return (
        <div>
            <Card className="h-full w-full items-center overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left border-spacing-2 border-slate-500 p-2">
                    <thead>
                        <tr className='h-20px'>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Name
                                </Typography>
                            </th>    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Enrollment Number
                                </Typography>
                            </th>    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Roll Number
                                </Typography>
                            </th>    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                </Typography>
                            </th><th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.isLoading
                            ? <LoadingRow cols={6} />
                            : state.data.map((object) => {
                                return (
                                    <Row _id={object._id} key={object._id} handler = {fetchTeacherData}></Row>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

export default TeacherTable