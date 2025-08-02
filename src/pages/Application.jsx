import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";

const Applications = () => {

  

  let columns = [
    {
      name: "Job Title",
      value: "title",
      id: "bold",
    },
    {
      name: "Department",
      value: "department",
    },
    {
      name: "Location",
      value: "location",
    },
    {
      name: "Salary",
      value: "salary",
    },
    {
      name: "Status",
      value: "applicationStatus",
      id: "status",
    },
  ];

  const [applications, setApplications] = useState();

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/application/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setApplications(response.data);
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

export default Applications;
