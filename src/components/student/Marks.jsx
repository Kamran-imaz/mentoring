import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SemesterDetails = () => {
  const [currentSemester, setCurrentSemester] = useState({
    sem: "",
    gpa: "",
    backlogs: "",
    subject: "",
    overallCGPA: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSemester((prevSemester) => ({
      ...prevSemester,
      [name]: value,
    }));
  };

  const handleSave = async() => {
    const { sem, gpa, backlogs, subject, overallCGPA } = currentSemester;
    try{
    if (sem && gpa && backlogs && subject && overallCGPA) {
      const token=localStorage.getItem('auth-token')
      const response=await axios.post('http://localhost:80/api/student/marks',{currentSemester},{
        headers:{
          'auth-token':token
        }
      })
      const {success,message}=response.data;
      if(success){
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else{
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setCurrentSemester({
        sem: "",
        gpa: "",
        backlogs: "",
        subject: "",
        overallCGPA: "",
      });
    } 
    else
    {
      toast.error("Some fields are missing!!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  catch(err){
    console.log(err)
  }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto py-8 bg-gray-200">
        <div className="max-w-3xl mx-auto mt-8 p-8 border rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Marks Form</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Semester:</label>
            <input
              type="text"
              name="sem"
              value={currentSemester.sem}
              onChange={handleInputChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">GPA:</label>
            <input
              type="text"
              name="gpa"
              value={currentSemester.gpa}
              onChange={handleInputChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Backlogs:</label>
            <input
              type="text"
              name="backlogs"
              value={currentSemester.backlogs}
              onChange={handleInputChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subject:</label>
            <input
              type="text"
              name="subject"
              value={currentSemester.subject}
              onChange={handleInputChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Overall CGPA:</label>
            <input
              type="text"
              name="overallCGPA"
              value={currentSemester.overallCGPA}
              onChange={handleInputChange}
              className="border w-full p-2 rounded"
            />
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={handleSave}
          >
            Save
          </button>

          {/* {semesters.length > 0 && (
        <table className="mt-8 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Semester</th>
              <th className="p-2">GPA</th>
              <th className="p-2">Backlogs</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Overall CGPA</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester, index) => (
              <tr key={index}>
                <td className="p-2">{semester.sem}</td>
                <td className="p-2">{semester.gpa}</td>
                <td className="p-2">{semester.backlogs}</td>
                <td className="p-2">{semester.subject}</td>
                <td className="p-2">{semester.overallCGPA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SemesterDetails;
