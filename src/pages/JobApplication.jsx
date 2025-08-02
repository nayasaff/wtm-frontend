import React, { use } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { useParams } from "react-router-dom";

const JobApplications = () => {
  const [applications, setApplications] = useState();

  let columns = [
    {
      name: "Name",
      value: "fullName",
      id: "bold",
    },
    {
      name: "email",
      value: "email",
    },
    {
      name: "Resume Text",
      value: "resumeText",
    },
    {
      name: "Cover Letter",
      value: "coverLetter",
    },
    {
      name: "Action",
      id: "action",
      buttons: [
        {
          name: "Reject",
          css: "bg-red-600 rounded-md hover:bg-red-500 text-white px-2 py-1",
          onClick: () => handleStatusUpdate("rejected"),
        },
      ],
    },
  ];

  const { jobId } = useParams();

  const handleStatusUpdate = async (status, applicationId) => {
    try {
      const response = await axios.patch(
        `http:localhost:8000/application/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setApplications((prev) =>
          prev.filter((app) => {
            return app.id !== applicationId;
          })
        );
      }
    } catch (err) {}
  };

  const updateBulkApplications = async (applications) => {
    try {

        let applicationIds = applications.map(app => app.id)
      const response = await axios.patch(
        `http:localhost:8000/application/bulk`,
        applicationIds,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {}
  };

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/application/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setApplications(response.data);
          updateBulkApplications(response.data)
        }
      } catch (err) {}
    };

    fetchDate();
  }, []);

  return (
    <div className="px-10 py-8">
      <Table columns={columns} data={applications} />
    </div>
  );
};

export default JobApplications;
