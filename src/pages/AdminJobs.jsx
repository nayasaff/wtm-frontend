import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axios from "axios"
import PostJob from "./PostJob";
import { replace, useNavigate } from "react-router-dom";



const AdminJobs = () =>{

    const [jobs, setJobs] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [jobToEdit, setJobToEdit] = useState()

    const navigate = useNavigate()

    let columns = [
    {
        name : "Title",
        value : "title",
        id : "bold"
    },
    {
        name : "Department",
        value : "department"
    },
    {
        name : "Location",
        value : "location"
    },
    {
        name : "Salary",
        value : "salary"
    },
    {
        name : "Status",
        value : "status"
    },
    {
        name : "No. of Applicants",
        value : "applications",
        isList : true

    },
    {
        name : "Action",
        id : "action",
        buttons : [{
            name : "Edit",
            css : "border border-primary rounded-md hover:bg-gray-200 text-primary px-2 py-1",
            onClick : (row)=> handleEditEvent(row)
        }, {
            name : "Delete",
            css : "bg-red-600 rounded-md hover:bg-red-500 text-white px-2 py-1"
        }]
    },
    {
        name : "View",
        id : "action",
        buttons : [{
            name : "View Applications",
            css : "bg-green-600 rounded-md hover:bg-green-500 text-white px-2 py-1",
            onClick : (row)=> navigateToJobApplication(row)
        }]
    },

    
]

    const navigateToJobApplication = (row)=>{
        navigate(`applications/${row.id}`, { replace: true })
    }

    useEffect(()=>{
        const fetchData = async()=> {
            try{
                const response = await axios.get("http://localhost:8000/jobs",{
                headers : {
                  "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
              }, )
    
              if(response.status === 200) {
                setJobs(response.data)
              }
            }
            catch(err){

            }
        }
        fetchData()
    }, [])

    const handleEditEvent = (job)=>{
        setJobToEdit(job)
        setOpenModal(true)
    }

    console.log(jobToEdit)

    return(
        <div className="px-10 py-8">
        <Table columns={columns} handleEditEvent={handleEditEvent} data={jobs}/>
        {openModal && <PostJob setJobs={setJobs} setOpenModal={setOpenModal} job={jobToEdit} isEdit={true} />}
        </div>
    );
}

export default AdminJobs