import React, { useEffect, useState } from "react";
import MentorNavbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const MentorHome = () => {
  const [display, setDisplay] = useState();
  // const [rollno,setRollNo]=useState('');
  // const handleClick=(roll)=>{
  //   setRollNo(roll)
  // }
  // useEffect(() => {
  //   const fetchData=async()=>{
  //     const token=localStorage.getItem('auth-token');
  //     if(token){
  //       try{
  //         const response=await axios.post('',{rollno},{
  //           headers:{
  //             'auth-token':token
  //           }
  //         })
  //         const {success,message}=response.data;
  //         if(success){

  //         }
  //         else{
  //           console.log(message)
  //         }
  //       }
  //       catch(err){
  //         console.log(err)
  //       }
  //     }
  //     else{
  //       console.log("no token available")
  //     }
  //   }
  //   fetchData();
  // },[rollno]
  // );
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:80/api/mentor/auth/getStudents",
            {
              headers: {
                "auth-token": token,
              },
            }
          );
          const { success, message } = response.data;
          if (success) {
            setDisplay(message);
          }
          else{
            console.log(message)
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  });
  return (
    <>
      <div className="bg-gray-200 min-h-screen" >
        <MentorNavbar />
        {/* Carousel */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-center items-center">
            <div className="carousel">
              <img
                src="https://d2n36fr2627nzy.cloudfront.net/test/images/logo.png"
                alt="CBIT logo Image"
              />
            </div>
          </div>
        </div>
        
        <table className="min-w-full border border-black">
          <thead>
            <tr>
              <th className="border p-2 border-black text-center">S.No</th>
              <th className="border p-2 border-black text-center">RollNo</th>
              <th className="border p-2 border-black text-center">Name</th>
              <th className="border p-2 border-black text-center">
                Approvals Left
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Adjust mapping here */}
            {display ? (
              display.map((ele, index) => (
                <tr key={index}>
                  <td className="border p-2 border-black text-center">{index + 1}</td>
                  <td className="border p-2 border-black text-center"><button className="hover:bg-blue-800 hover:text-white transition duration-300 px-3 py-2 rounded" ><Link to={`/combineLinks/${ele.rollNo}`}>{ele.rollNo}</Link></button></td>
                  {/* {console.log(ele.rollNo)} */}
                  <td className="border p-2 border-black text-center">{ele.name}</td>
                  <td className="border p-2 border-black text-center">1</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Not Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MentorHome;