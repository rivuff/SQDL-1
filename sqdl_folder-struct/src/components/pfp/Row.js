import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Typography } from '@material-tailwind/react'
const Row = ({obj}) => {
    const [state, updateState] = useState(
        {
            name: '',
            createdBy: '',
            _id: obj,
            fetched: false
        }
    )
        if (!state.fetched){
            //fetch subject data
            axios.post('http://localhost:5000/api/v1/subject/getID', { _id: obj }, { headers: { "Content-type": "application/json" } })
                .then((response) => {
                    const data = response.data.data
                    updateState({ ...state, name: data.name, createdBy: data.createdBy, _id: data._id, fetched:!state.fetched })

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    return (
        <>
            <tr className='m-2'>
                <td>
                    <a href={'/subject/'+state._id}>
                        <Typography variant="md" color="blue-gray" className="font-normal text-blue-600 underline">
                            {state.name}
                        </Typography>
                    </a>
                </td>
                <td>
                    <Typography variant="md" color="blue-gray" className="font-normal">
                        {state.createdBy}
                    </Typography>
                </td>
            </tr>
        </>
    )
    
}

export default Row