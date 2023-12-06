import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MentorNavbar from './Navbar';
const StudentProfileMentor = () => {
    let rollNo=useParams();
    rollNo=parseInt(rollNo.rollNo);
    console.log(rollNo)
    const [forms, setForms] = useState();
    const [cgpa,setCgpa]=useState();
    console.log(forms)
    useEffect(()=>{
        const fetchData=async()=>{
            const token=localStorage.getItem('auth-token');
            if(token){
                const response=await axios.post('http://localhost:80/api/mentor/auth/getParticularStudent',{
                    rollNo
                },{
                    headers:{
                        'auth-token':token
                    }
                })
                const {success,message}=response.data;
                if(success){
                    setForms(message)
                    console.log(forms)
                    // if(forms.marks.length>0){
                    //     let latestCgpa=forms.marks[forms.marks.length-1].overallgpa
                    //     setCgpa(latestCgpa)
                    // }
                    // else{
                    //     setCgpa("NULL")
                    // }
                }
                else{
                    setForms(message)
                }
            }
            else{
                console.log("No token available!!!")
            }

        }
        fetchData();
    })

  return (
    <>
      <MentorNavbar/>
      <div className="mx-auto py-8 bg-gray-200 min-h-screen overflow-auto">
        <div className="">
            <h3 className='text-xl font-semibold text-center'>Student Profile</h3>
            {/* <p><strong>Name</strong>{forms.name}</p>
            <p><strong>RollNo</strong>{forms.rollNo}</p>
            <p><strong>College</strong>{forms.college}</p>
            <p><strong>Branch</strong>{forms.branch}</p>
            <p><strong>CGPA</strong></p> */}
        </div>
        <table className='mx-auto border border-black w-3/4'>
            <thead>
                <tr>
                    <th className='text-center border border-black py-2'>Semester</th>
                    <th className='text-center border border-black py-2'>GPA</th>
                    <th className='text-center border border-black py-2'>Backlog</th>
                    <th className='text-center border border-black py-2'>Backlog Subjects</th>
                </tr>
            </thead>
            <tbody>
                {forms && forms.marks ? (
                    forms.marks.map((mark,index)=>{
                        <tr key={index}>
                            <td>{mark.semester}</td>
                            <td>{mark.gpa}</td>
                            <td>{mark.backlogs}</td>
                            <td>{mark.subject}</td>
                        </tr>
                    })
                ):(<td>No History Found</td>)}
            </tbody>
        </table>
      </div>
    </>
  )
}

export default StudentProfileMentor
