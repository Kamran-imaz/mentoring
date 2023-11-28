import Home from "./components/student/Home";
import Marks from "./components/student/Marks";
import UndertakingForm from "./components/student/UndertakingForm";
import LateArrivalForm from "./components/student/LateArrivalForm";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Register from "./components/student/Register";
import Login from "./components/student/Login";
import Concerns from "./components/student/Concerns";
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
                <Route path="*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </Router>
           
        </>
    );
}

export default App;
