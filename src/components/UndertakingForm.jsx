import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios'
function UndertakingForm() {
  // const [rollNo, setRollNo] = useState('');
  const [reason, setReason] = useState('');
  const [address, setAddress] = useState('');
  const [forms, setForms] = useState([]);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];
  
  // const handleRollNoChange = (e) => {
  //   setRollNo(e.target.value);
  // };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    if ( reason && address) {
      const newForm = {
        date: today,
        // rollNo,
        reason,
        address,
      };

      // Send form data to the backend
      console.log("before axios")
      try {
        await axios.post('http://localhost:80/api/student/undertakingForm', newForm); // Update the endpoint accordingly
        setForms([...forms, newForm]);

        // Reset form fields
        // setRollNo('');
        setReason('');
        setAddress('');
        setError('');
      } catch (error) {
        console.error('Error submitting form:', error);
        setError('Error submitting form. Please try again.');
      }
    } else {
      setError('Please provide Roll No, Reason, and Address.');
    }
  };
  console.log("After axios")

  const handleDownloadPDF = (date) => {
    const form = forms.find((f) => f.date === date);

    if (form) {
      const content = `
      <div>
        <h2>Attendance Form</h2>
        <p><strong>Reason for Low Attendance:</strong> ${form.reason}</p>
        <p><strong>Address:</strong> ${form.address}</p>
      </div>
    `;

      const pdfOptions = {
        margin: 10,
        filename: `Undertaking_Form_${form.date}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().from(content).set(pdfOptions).save();
    }
  };

  
  return (
    <div className="p-4 w-3/5 mx-auto" id='pdf-content'>
      <h2 className="text-2xl font-bold mb-4">Attendance Form</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="mb-4">
        {/* <label className="block mb-2">Roll No:</label>
        <input
          type="text"
          value={rollNo}
          onChange={handleRollNoChange}
          className="border rounded p-2 w-full"
        /> */}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Reason for Low Attendance:</label>
        <textarea
          value={reason}
          onChange={handleReasonChange}
          className="border rounded p-2 w-full"
          rows="3"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address:</label>
        <textarea
          value={address}
          onChange={handleAddressChange}
          className="border rounded p-2 w-full"
          rows="3"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      <h3 className="text-xl font-semibold my-4">Previous Forms</h3>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Roll No</th>
            <th className="border p-2">Download PDF</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <tr key={index}>
              <td className="border p-2">{form.date}</td>
              {/* <td className="border p-2">{form.rollNo}</td> */}
              <td className="border p-2">
                <button
                  onClick={() => handleDownloadPDF(form.date)}
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default UndertakingForm;
