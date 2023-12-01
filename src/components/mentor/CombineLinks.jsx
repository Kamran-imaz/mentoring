import React from 'react'
import MentorNavbar from '../mentor/Navbar'
import { Link } from 'react-router-dom'
const CombineLinks = () => {
  return (
    <>
      <div className=" bg-gray-200">
      {/* Navigation */}

      <MentorNavbar />

      

      {/* Main content */}

      {/* Undertaking Form */}
      <div
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        id="undertakingForm"
      >
        <h2 className="text-2xl font-bold mb-4">
          <Link  to="" className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800">
            Undertaking Form
          </Link>
        </h2>
        {/* {resultUndertaking !== undefined && resultUndertaking !== null ? (
          <span className="px-3">You have <strong className="text-red-500">{resultUndertaking}</strong> forms which are not approved</span>
        ) : (
          <span className="text-green-500">No pending forms.</span>
        )} */}
      </div>

      {/* Addressing Concerns */}
      <div
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        id="addressingConcerns"
      >
        <h2 className="text-2xl font-bold mb-4"><Link to="/concerns" className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800">Addressing Concerns</Link></h2>

        {/* {resultConcern!==undefined && resultConcern!==null ? (<span className="px-3">You have <strong className="text-red-500">{resultConcern}</strong> forms which are not approved</span>):(<span className="text-green-500">No pending forms.</span>)} */}
      </div>

      {/* Achievements */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="achievements">
      <h2 className="text-2xl font-bold mb-4"><Link to="" className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800">Late Arrival</Link></h2>
       
     </div>
      
      {/* Marks */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="marks">
        <h2 className="text-2xl font-bold mb-4"><Link to="" className="hover:text-white transition duration-300 px-3 py-2 rounded hover:bg-blue-800">Marks</Link></h2>
      </div>
    </div>
    </>
  )
}

export default CombineLinks