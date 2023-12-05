import React, { useEffect, useState } from "react";
import MentorNavbar from "../mentor/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
const CombineLinks = () => {
    const [form, setForm] = useState();
    let { rollNo } = useParams();
    rollNo = parseInt(rollNo);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("auth-token");
            if (token) {
                try {
                    const response = await axios.post(
                        "http://localhost:80/api/mentor/auth/getParticularStudent",
                        {
                            rollNo,
                        },
                        {
                            headers: {
                                "auth-token": token,
                            },
                        }
                    );
                    const { success, message } = response.data;
                    if (success) {
                        setForm(message);
                    } else {
                        console.log(message[0]);
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log("No token available!!!");
            }
        };
        fetchData();
    }, []);
    const undertakingApprove = async (form_no, rollNo) => {
        if (form_no && rollNo) {
            const token = localStorage.getItem("auth-token");
            try {
                const response = await axios.post(
                    "http://localhost:80/api/mentor/undertakingForm/formApproval",
                    {
                        form_no,
                        rollNo,
                    },
                    {
                        headers: {
                            "auth-token": token,
                        },
                    }
                );
                const { success } = response.data;
                if (success) {
                    console.log("approved");
                } else {
                    console.log("not approved");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("please provide the rollno and form_no");
        }
    };
    // concern approve
    const ConcernApprove = async (form_no, rollNo) => {
        console.log(form_no)
        console.log(rollNo)
        if (form_no && rollNo) {
            const token = localStorage.getItem('auth-token');
            if (token) {
                const response = await axios.post('http://localhost:80/api/mentor/addressingConcerns/concernApproval', {
                    form_no,
                    rollNo
                }, {
                    headers: {
                        'auth-token': token
                    }
                })
                const { success, message } = response.data;
                if (success) {
                    console.log(message);
                }
                else {
                    console.log(message)
                }
            }
            else {
                console.log("No token available!!!")
            }
        }
        else {
            console.log("form_no or roll_no is missing!!!")
        }
    }
    const ConcernPDF = async (date) => {
        if (form && form.addressingConcerns) {
            const concern = form.addressingConcerns.find((ele) => ele.date === date)
            if (concern) {
                const content = `
        <div>
                <h2>Concerns Form</h2><br/><br/>
                <p><strong>RollNo:</strong>${form.rollNo}</p><br/><br/>
                <p><strong>Name:</strong>${form.name}</p><br/><br/>
                <p><strong>Query:</strong> ${concern.query}</p><br/><br/> <br/> <br/>
              </div>
        `;
                const pdfOptions = {
                    margin: 10,
                    filename: `Undertaking_Form_${form.date}.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                }
                html2pdf().from(content).set(pdfOptions).save();
            }
            else {
                console.log("Form not available on that particular date!!!");
            }
        }
        else {
            console.log("No form data available")
        }
    }
    if (!rollNo || !form) {
        // Check if form is undefined
        return <div className="text-center">Loading...</div>;
    }

    const handleDownloadPDF = (date) => {
        if (form && form.undertakingForm) {
            const f = form.undertakingForm.find((ele) => ele.date === date);
            if (f) {
                const content = `
      <div>
        <h2>Attendance Form</h2><br/><br/>
        <p><strong>RollNo:</strong>${form.rollNo}</p><br/><br/>
        <p><strong>Name:</strong>${form.name}</p><br/><br/>
        <p><strong>Reason for Low Attendance:</strong> ${f.reason}</p><br/><br/>
        <p><strong>Address:</strong> ${f.address}</p><br/><br/>
      </div>
    `;
                const pdfOptions = {
                    margin: 10,
                    filename: `Undertaking_Form_${form.date}.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                };
                html2pdf().from(content).set(pdfOptions).save();
            } else {
                console.error("Form not found for the specified date");
            }
        } else {
            console.error("No form data available");
        }
    };
    return (
        <>
            <div className=" bg-gray-200 min-h-screen">
                <MentorNavbar />
                {/*from here onwards all forms.... */}
                <div className="mx-auto py-8">
                    {/* Undertaking Form */}
                    <h3 className="text-xl font-semibold my-4 text-center">
                        Undertaking Forms
                    </h3>
                    <table className="mx-auto py-8  border border-black w-3/4">
                        <thead>
                            <tr>
                                <th className="border p-2 border-black text-center">Date</th>
                                <th className="border p-2 border-black text-center">PDF</th>
                                <th className="border p-2 border-black text-center">
                                    Approval Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(form)} */}
                            {form &&
                                form.undertakingForm &&
                                form.undertakingForm.length > 0 ? (
                                form.undertakingForm.map((ele, index) => (
                                    <tr key={index}>
                                        <td className="border p-2 border-black text-center">
                                            {ele.date}
                                        </td>
                                        <td className="border p-2 border-black text-center">
                                            <button
                                                onClick={() => handleDownloadPDF(ele.date)}
                                                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                            >
                                                Download
                                            </button>
                                        </td>
                                        <td className="border p-2 border-black text-center">
                                            {ele.approvalStatus ? (
                                                <p className="text-green-500">Approved</p>
                                            ) : (
                                                <p
                                                    onClick={() =>
                                                        undertakingApprove(ele.form_no, rollNo)
                                                    }
                                                >
                                                    {ele.approvalStatus ? (
                                                        <p>Approved</p>
                                                    ) : (
                                                        <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600">
                                                            Approve
                                                        </button>
                                                    )}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-black p-2 text-center" colSpan="3">
                                        No History Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* addressing Concerns.... */}
                    <h3 className="text-xl font-semibold text-center my-8">
                        Addressing Concerns
                    </h3>
                    <table className="mx-auto py-4 border border-black w-3/4">
                        <thead>
                            <tr>
                                <th className="text-center p-2 border border-black">Date</th>
                                <th className="text-center p-2 border border-black">PDF</th>
                                <th className="text-center p-2 border border-black">
                                    Approval Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(form.addressingConcerns.length)} */}
                            {form &&
                                form.addressingConcerns &&
                                form.addressingConcerns.length > 0 ? (
                                form.addressingConcerns.map((ele, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="border border-black p-2 text-center">
                                                {ele.date}
                                            </td>
                                            <td className="border border-black p-2 text-center"><button className="text-white bg-green-500 rounded py-1 px-2 hover:bg-green-600" onClick={() => ConcernPDF(ele.date)}>Download</button></td>
                                            <td className="border border-black p-2 text-center">{ele.approvalStatus ? (
                                                <p className="text-green-500">Approved</p>
                                            ) : (<button className="rounded bg-green-500 hover:bg-green-600 py-1 px-2 text-white" onClick={() => ConcernApprove(ele.form_no, rollNo)}>Approve</button>)}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        className="border border-black p-2 text-center"
                                        colSpan="3"
                                    >
                                        No History Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CombineLinks;