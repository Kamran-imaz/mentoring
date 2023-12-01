import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function LateArrivalForm() {
    const [lateDate, setLateDate] = useState('');
    const [latePeriod, setLatePeriod] = useState('');
    const [lateSemester, setLateSemester] = useState('');
    const [lateReason, setLateReason] = useState('');
    const [reasonFile, setReasonFile] = useState(null);
    const [lateArrivals, setLateArrivals] = useState([{}]);
    const [error, setError] = useState('');
    const today = new Date();
    const handleDateChange = (e) => {
        setLateDate(e.target.value);
    };

    const handlePeriodChange = (e) => {
        setLatePeriod(e.target.value);
    };

    const handleSemesterChange = (e) => {
        setLateSemester(e.target.value);
    };

    const handleReasonChange = (e) => {
        setLateReason(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setReasonFile(file);
    };

    useEffect(() => {
    const fetchLateArrivals = async () =>{
        const response = await fetch("http://localhost:80/api/student/activities/lateArrivals",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });
        const data = await response.json();
        setLateArrivals(data.lateArrivals);
    }; 
    fetchLateArrivals();
    }, []);

    const handleSubmit = async () => {
        if (lateDate && latePeriod && lateSemester && lateReason && reasonFile) {
            const newLateArrival = {
                date: lateDate,
                period: latePeriod,
                semester: lateSemester,
                reason: lateReason,
                // reasonFile: reasonFile,
            };
            // setLateArrivals([...lateArrivals, newLateArrival]);
            // setLateDate('');
            // setLatePeriod('');
            // setLateSemester('');
            // setLateReason('');
            // setReasonFile(null);
            const response = await fetch("http://localhost:80/api/student/activities/addLateArrival",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token"),
                    },
                    body: JSON.stringify(newLateArrival),
                });
            const data = await response.json();
            console.log(data);
            console.log(data.lateArrivals);
            setLateArrivals(data.lateArrivals);
            setError("");
        }
        else {
            setError("Please fill all the fields");
            setTimeout(() => {
                setError("");
            }, 2500);
        }
    };

    return (
        <>
        <Navbar />
        <div className=" mx-auto py-8 bg-gray-200 min-h-max">
            <div className="mx-auto w-3/5 p-3 h-screen">
            <h2 className="text-2xl font-bold mb-4 text-center">Late Arrival Form</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block mb-2">Late Date:</label>
                <input
                    type="date"
                    value={lateDate}
                    onChange={handleDateChange}
                    className="border rounded p-2 w-full"
                    max={today}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Late Period:</label>
                <input
                    type="text"
                    value={latePeriod}
                    onChange={handlePeriodChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Late Semester:</label>
                <input
                    type="text"
                    value={lateSemester}
                    onChange={handleSemesterChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Reason for Late Arrival:</label>
                <textarea
                    value={lateReason}
                    onChange={handleReasonChange}
                    className="border rounded p-2 w-full"
                    rows="3"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Reason File:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="bg-black text-white py-2 px-4 rounded hover:bg-blue-800"
            >
                Submit
            </button>

            <h3 className="text-xl font-semibold my-4">Late Arrival History</h3>
            <table className="min-w-full border-2 border-black">
                <thead>
                    <tr>
                        <th className="border border-black p-2">Date</th>
                        <th className="border border-black p-2">Period</th>
                        <th className="border border-black p-2">Semester</th>
                        <th className="border border-black p-2">Reason</th>
                        <th className="border border-black p-2">Status</th>
                        {/* <th className="border border-black p-2">File</th> */}
                    </tr>
                </thead>
                <tbody>
                    {lateArrivals.length === 0 && (
                        <tr>
                            <td className="border border-black p-2 text-center" colSpan="5">
                                No late arrivals
                            </td>
                        </tr>
                    )}
                    {
                    lateArrivals.map((arrival, index) => (
                        <tr key={index}>
                            <td className="border border-black p-2 text-center">{new Date(arrival.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
}</td>
                            <td className="border border-black p-2 text-center">{arrival.period}</td>
                            <td className="border border-black p-2 text-center">{arrival.semester}</td>
                            <td className="border border-black p-2 text-center">{arrival.reason}</td>
                            <td className={`border border-black p-2 text-center`
                        + (arrival.status === 'pending' ? ' bg-yellow-400' : arrival.status === 'accepted' ? ' bg-green-400' : ' bg-red-400')
                        }>{arrival.status}</td>
                            {/* <td className="border border-black p-2">
                                {arrival.reasonFile && (
                                    <a
                                        href={URL.createObjectURL(arrival.reasonFile)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View File
                                    </a>
                                )}
                            </td> */}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
}

export default LateArrivalForm;
