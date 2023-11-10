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
           
        </>
    );
}

export default App;
