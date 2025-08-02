import React from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const navigateToJobDescription = () => {
    navigate(`/job/${job.id}`, {
      state: job,
    });
  };

  return (
    <div className="flex border border-gray-300 rounded-md shadow-lg">
      <div className="px-6 py-4 w-full">
        <div className="flex flex-col">
          <div className="text-base text-gray-600">Technology</div>
          <h3 className="text-2xl font-semibold">{job.title}</h3>
        </div>
        <div className="flex gap-1 mt-2 items-center">
          <LocationPinIcon sx={{ fontSize: "20px" }} />
          <h3 className="text-lg">{job.location}</h3>
        </div>
          <div
            onClick={() => navigateToJobDescription()}
            className="flex items-center gap-2 mt-6 cursor-pointer hover:text-blue-600"
          >
            <h3>See Details</h3>
            <ArrowForwardIcon sx={{ fontSize: "18px", marginTop: "0.25rem" }} />
          </div>
      </div>
    </div>
  );
};

export default JobCard;
