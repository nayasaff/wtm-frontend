import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SearchIcon from "@mui/icons-material/Search";
import PostJob from "./PostJob";
import axios from "axios";
import Loading from "../components/Loading";

const JobSearch = () => {
  const role = localStorage.getItem("role");
  const [jobs, setJobs] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [searchTite, setSearchTitle] = useState();
  const [searchLocation, setSearchLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/jobs", {
          params: {
            status: "open",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setJobs(response.data);
        }
      } catch (err) {}
    };
    fetchData();
  }, []);

  console.log(searchTite);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/jobs", {
        params: {
          title: searchTite,
          location: searchLocation,
          status: "open",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setJobs(response.data);
      }
    } catch (err) {}
  };

  if (!jobs) return <Loading />;

  return (
    <>
      <div className="relative w-full h-80 overflow-hidden">
        {/* Background image with object-cover equivalent */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${require("../assets/banner.jpg")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            {/* Text */}
            <h1 className="text-5xl font-bold text-white">WTM Careers</h1>
          </div>
        </div>
      </div>
      <div className="py-6 sm:px-20 px-6">
        <div className="flex items-center sm:flex-nowrap flex-wrap">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Job Title"
            className="border flex-1 border-neutral-300 py-2 rounded-lg px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none"
          />
          <input
            type="text"
            name="search"
            placeholder="City, State, Country or Remote"
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border flex-1 border-neutral-300 py-2 rounded-lg px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none"
          />
          <div className="ml-2.5 flex items-center gap-2">
            <button
              onClick={() => handleSearch()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Search Job
            </button>
            {role === "admin" && (
              <button
                onClick={() => setOpenModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add Job
              </button>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-10 mt-6 ">
          {jobs.map((job) => (
            <JobCard job={job} />
          ))}
        </div>
        {openModal && <PostJob setJobs={setJobs} setOpenModal={setOpenModal} />}
      </div>
    </>
  );
};

export default JobSearch;
