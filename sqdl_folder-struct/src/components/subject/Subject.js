import React from "react";

const data = [
    {
        _id: "649ed88026d3408b3bb558e5",
        name: "Database Management System",
        description: "teaches about how datas are managed inside database",
        createdBy: "Rivu Naskar",
        createdAt: "2023-06-30T13:28:32.219Z",
        updatedAt: "2023-06-30T13:28:32.219Z",
        subjectId: "SUB115",
        __v: 0
    },
    {
        _id: "649ed8b826d3408b3bb558e8",
        name: "Computer Networks",
        description: "Computer networking refers to interconnected computing devices that can exchange data and share resources with each other.",
        createdBy: "Rivu Naskar",
        createdAt: "2023-06-30T13:29:28.467Z",
        updatedAt: "2023-06-30T13:29:28.467Z",
        subjectId: "SUB063",
        __v: 0
    },
    {
        _id: "649eddce7640c026e1f9ba88",
        name: "Object Oriented Programming",
        description: "Object-oriented programming is based on the concept of objects. In object-oriented programming data structures, or objects are defined, each with its own properties or attributes. ",
        createdBy: "Rivu Naskar",
        createdAt: "2023-06-30T13:51:10.113Z",
        updatedAt: "2023-06-30T13:51:10.113Z",
        subjectId: "SUB248",
        __v: 0
    },
    {
        _id: "649eddf17640c026e1f9ba8b",
        name: "Engineering Mathamatics ",
        description: "Maths done by Engineers ",
        createdBy: "Rivu Naskar",
        createdAt: "2023-06-30T13:51:45.208Z",
        updatedAt: "2023-06-30T13:51:45.208Z",
        subjectId: "SUB339",
        __v: 0
    }
]


const SubjectCard = ({name, description, createdBy})=>{
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 flex-shrink-0">
      <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <div className="flex-grow"></div> {/* Fill remaining space */}
        <div className="flex items-end">
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    )
}

const SubjectPage = () => {

  return (
    <div>
    <h2 className='italic font-semibold text-xl flex justify-center p-2 pt-5'>Choose Subjects</h2>
    <div className="card-container ml-5 m-2 p-2 flex flex-wrap -mx-2">
    {data.map((data) => (
        <SubjectCard
        name={data.name}
        description={data.description}
        createdBy={data.createdBy}
        />
    ))}
</div>
</div>
  );
};


export default SubjectPage