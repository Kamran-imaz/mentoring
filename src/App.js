<<<<<<< HEAD
import LateArrivalForm from "./components/LateArrivalForm";
import StudentProfile from "./components/StudentProfile";

function App() {
    return (
        <>
            <LateArrivalForm />
            <StudentProfile />
=======
import Marks from "./components/Marks";
import UndertakingForm from "./components/UndertakingForm";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
    return (
        <>
        <Router>
            <Routes>
                <Route path="/undertakingForm" exact element={ <UndertakingForm/>}/>
                <Route path="/marks" exact element={<Marks/>}/>
            </Routes>
        </Router>
           
>>>>>>> 477c8daaf9684f6d453f46bc52de659c2f83917a
        </>
    );
}

export default App;
