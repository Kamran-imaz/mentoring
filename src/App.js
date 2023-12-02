import Home from "./components/student/Home";
import Marks from "./components/student/Marks";
import UndertakingForm from "./components/student/UndertakingForm";
import LateArrivalForm from "./components/student/LateArrivalForm";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Register from "./components/student/Register";
import Login from "./components/student/Login";
import Concerns from "./components/student/Concerns";
import MentorRegister from './components/mentor/Register';
import MentorLogin from "./components/mentor/Login";
import MentorHome from "./components/mentor/Home";
import CombineLinks from "./components/mentor/CombineLinks";
import StudentProfile from "./components/student/StudentProfile"

//boostrap link for carousel...
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
        <>
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path="/undertakingForm" exact element={ <UndertakingForm/>}/>
                <Route path="/marks" exact element={<Marks/>}/>
                <Route path="/lateArrival" exact element={ <LateArrivalForm /> }/>
                <Route path='/concerns' exact element={<Concerns/>}/>
                <Route path="/profile" exact element={<StudentProfile />} />
                <Route path="*" element={<h1>404 Not Found</h1>}/>

                {/* from here mentor routes.... */}
                
                <Route path="/mentorRegister" exact element={<MentorRegister/>}/>
                <Route path="/mentorLogin" exact element={<MentorLogin/>}/>
                <Route path="/mentorHome" exact element={< MentorHome/>}/>
                <Route path="/combineLinks/:rollNo" exact element={<CombineLinks/>}/>
                
            </Routes>
        </Router>
           
        </>
    );
}

export default App;
