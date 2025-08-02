import axios from "axios";
import React, { useState } from "react";

const PostJob = ({ setOpenModal, setJobs, job, isEdit = false }) => {
  const [jobForm, setJobForm] = useState(isEdit ? job : null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setJobForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/jobs/${job.id}`,
        {
          ...jobForm,
          salary: Number(jobForm.salary),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setJobs((prev) =>
        prev.map((j) => {
          if (j.id === job.id) {
            return jobForm;
          } else {
            return j;
          }
        })
      );
      console.log("here2");
      setOpenModal(false);
    } catch (err) {}
  };

  const handleSubmit = async () => {
    if (isEdit) {
      try {
       await axios.patch(
          `http://localhost:8000/jobs/${job.id}`,
          {
            ...jobForm,
            salary: Number(jobForm.salary),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );  

        console.log("here")
        setJobs((prev) =>
          prev.map((j) => {
            if (j.id === job.id) {
              return jobForm;
            } else {
              return j;
            }
          })
        );
        setOpenModal(false)
       
      } catch (err) {
        console.log(err)
      }
      
      
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/jobs",
          {
            ...jobForm,
            salary: Number(jobForm.salary),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          setJobs((prev) => [...prev, response.data]);
          setOpenModal(false);
        }
      } catch (err) {}
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-96 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h3 className="text-xl font-medium mb-4">
                {isEdit ? "Edit" : "Create"} Job
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="My Group"
                    name="title"
                    value={jobForm.title}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="This group is for..."
                    name="description"
                    value={jobForm.description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Salary
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Salary"
                    name="salary"
                    value={jobForm.salary}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Location
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Location"
                    name="location"
                    value={jobForm.location}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Department
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="depeartment"
                    name="department"
                    value={jobForm.department}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <label className="text-sm font-medium text-gray-900">
                    Type
                  </label>

                  <select
                    name="status"
                    onChange={(e) => handleChange(e)}
                    value={jobForm.status}
                    className="appearance-none border border-gray-300 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 sm:ml-3 sm:w-auto"
              >
                {isEdit ? "Edit" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
