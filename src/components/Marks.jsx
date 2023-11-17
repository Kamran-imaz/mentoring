import React, { useState } from 'react';
import axios from 'axios';
const SemesterDetails = () => {
  const [semesters, setSemesters] = useState([]);
  const [currentSemester, setCurrentSemester] = useState({
    sem: '',
    gpa: '',
    backlogs: '',
    subject: '',
    overallCGPA: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSemester((prevSemester) => ({
      ...prevSemester,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (semesters.length < 8) {
      setSemesters((prevSemesters) => [...prevSemesters, currentSemester]);
      setCurrentSemester({
        sem: '',
        gpa: '',
        backlogs: '',
        subject: '',
        overallCGPA: '',
      });
    } else {
      alert('You can only add up to 8 semesters.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 border rounded-lg">
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
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={handleSave}
      >
        Save
      </button>

      {semesters.length > 0 && (
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
      )}
    </div>
  );
};

export default SemesterDetails;
