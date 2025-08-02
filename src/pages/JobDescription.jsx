import React, { useRef, useState } from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import axios from "axios";
import Modal from "../components/Modal";

const JobDescription = () => {
  const location = useLocation();
  const fileRef = useRef();
  const [coverLetter, setCoverLetter] = useState();
  const [resumeText, setResumeText] = useState();
  const job = location.state;
  const [openModal, setOpenModal] = useState();

  const formatDescription = (description) => {
    if (!description) return null;

    return description.split("\n").map((line, index) => (
      <div key={index}>
        {line.trim() || <br />} {/* Renders a <br /> if the line is empty */}
      </div>
    ));
  };

  const navigate = useNavigate();



  // const readPdf = async (file) => {
  //   const reader = new FileReader();
  //   reader.onload = async (e) => {
  //     const typedArray = new Uint8Array(e.target.result);

  //     // Initialize PDF.js
  //     pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

  //     try {
  //       const pdf = await pdfjsLib.getDocument(typedArray).promise;
  //       let fullText = "";

  //       // Extract text from each page
  //       for (let i = 1; i <= pdf.numPages; i++) {
  //         const page = await pdf.getPage(i);
  //         const textContent = await page.getTextContent();
  //         const text = textContent.items.map((item) => item.str).join(" ");
  //         fullText += text + "\n";
  //       }

  //       console.log("Extracted PDF Text:", fullText);
  //       return fullText;
  //     } catch (err) {
  //       console.error("Error reading PDF:", err);
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  const handleSubmit = async () => {
    try {

      const response = await axios.post(
        "http://localhost:8000/application",
        {
          jobId: job.id,
          resumeText,
          coverLetter,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setOpenModal(true);
        setTimeout(() => {
          setOpenModal(false);
          navigate("/home");
        }, 2000);
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const role = localStorage.getItem("role");

  const openFile = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  return (
    <div className="w-full items-center flex justify-center flex-col mt-4">
      <div className="sm:px-0 px-3 sm:w/1/2 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">{job.title}</h2>
          <h4 className="text-xl font-semibold">${job.salary}/month</h4>
        </div>
        <div className="flex items-center mt-2 gap-1">
          <LocationPinIcon sx={{ fontSize: "20px" }} />
          <h3 className="text-xl font-medium">{job.location}</h3>
        </div>
        <div className="mt-4 text-xl font-medium">Description : </div>
        <div className="text-lg mt-1">{formatDescription(job.description)}</div>
        <div className="mt-4 space-y-4">
          <h3 className="text-2xl font-bold">To Apply : </h3>
          <div>
            <h2 className="mt-4 text-xl font-medium">Resume</h2>

            <textarea
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              id="message"
              rows="4"
              class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write cover letter here"
            ></textarea>
          </div>
          <div>
            <h2 className="mt-4 text-xl font-medium">Cover Letter</h2>
            <textarea
              value={coverLetter}
              onChange={(event) => setCoverLetter(event.target.value)}
              id="message"
              rows="4"
              class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write cover letter here"
            ></textarea>
            {/* <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write cover letter here"></textarea> */}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleSubmit()}
            disabled={role === "admin"}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:to-blue-300"
          >
            Submit
          </button>
        </div>
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          openModal={openModal}
          message="Your application was send to WTM"
          success={true}
        />
      )}
    </div>
  );
};

{
  /* <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" />
    </label>
</div>  */
}
export default JobDescription;
