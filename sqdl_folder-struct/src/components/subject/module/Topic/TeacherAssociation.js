import React from 'react'
import {
    Input,
    Typography,
    Textarea,
    Card,
    Button,
    Breadcrumbs,
    Select,
    Option
  } from "@material-tailwind/react";
function TeacherAssociation() {
  return (
    <div className="bgForm align-center flex flex-col items-center p-8">
        {/* <div className="bg-white rounded-lg">
          <Breadcrumbs className="">
            <a href="/course" className="">
              Courses
            </a>
            <a href={"/course/" + subjectid} className="">
              {session.parentModule.parentSubject.name}
            </a>
            <a href={"/course/" + subjectid} className="">
              {session.parentModule.name}
            </a>
            <a href="#" className="">
              <span className="text-blue-800">New Session</span>
            </a>
          </Breadcrumbs>
        </div> */}
        <br />
        <div className="formDiv bg-white border-blue-800 border-4 rounded-lg py-10 items-center justify-center flex w-4/5">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" className="text-center text-black">
              Teacher Association
            </Typography>

            <form className="form mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input label="Teacher name"></Input>
                <Input label="Division"></Input>
                <Input label="Semester"></Input>
                <Select variant="outlined" label="Year">
                  <Option>FE</Option>
                  <Option>SE</Option>
                  <Option>TE</Option>
                  <Option>BE</Option>
                </Select>
                <Input label="subject"></Input>

                <Button>Submit</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
  )
}

export default TeacherAssociation