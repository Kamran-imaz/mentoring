import React, { useState } from 'react';

function LateArrivalForm() {
    const [lateDate, setLateDate] = useState('');
    const [lateReason, setLateReason] = useState('');
    const [reasonFile, setReasonFile] = useState(null);
    const [lateArrivals, setLateArrivals] = useState([]);
    const [error, setError] = useState('');
    const [filterDate, setFilterDate] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const handleDateChange = (e) => {
        setLateDate(e.target.value);
    };

    const handleReasonChange = (e) => {
        setLateReason(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setReasonFile(file);
    };

    const handleFilterChange = (e) => {
        setFilterDate(e.target.value);
    };

    const handleSubmit = () => {
        if (lateDate && lateReason && reasonFile) {
            const newLateArrival = {
                date: lateDate,
                reason: lateReason,
                reasonFile: reasonFile,
            };
            setLateArrivals([...lateArrivals, newLateArrival]);

            // Reset form fields
            setLateDate('');
            setLateReason('');
            setReasonFile(null);
            setError('');
        } else {
            setError('Please provide a date, reason, and file.');
        }
    };



    return (
        <div className="p-4 w-3/5 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Late Arrival Form</h2>
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
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Submit
            </button>

            <h3 className="text-xl font-semibold my-4">Late Arrival History</h3>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Reason</th>
                        <th className="border p-2">File</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLateArrivals.map((arrival, index) => (
                        <tr key={index}>
                            <td className="border p-2">{arrival.date}</td>
                            <td className="border p-2">{arrival.reason}</td>
                            <td className="border p-2">
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LateArrivalForm;
