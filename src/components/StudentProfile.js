import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = ({ match }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/auth/getStudentDetails");
        setStudent(response.student);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [match.params.studentId]);

  if (!student) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">{student.name}'s Profile</h2>
      <p className="mb-2">Roll No: {student.rollno}</p>
      <p className="mb-4">Semester: {student.semester}</p>

      <h3 className="text-xl font-bold mb-2">Marks</h3>
      <ul className="list-disc pl-4 mb-4">
        {student.marks.map((mark, index) => (
          <li key={index}>Semester {index + 1}: {mark} marks</li>
        ))}
      </ul>

      <h3 className="text-xl font-bold mb-2">Achievements</h3>
      <p className="mb-4">{student.achievements}</p>

      <h3 className="text-xl font-bold mb-2">Late Arrivals</h3>
      <p>{student.lateArrivals}</p>
    </div>
  );
};

export default StudentProfile;
