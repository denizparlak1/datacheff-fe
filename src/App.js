import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from "./pages/user/WelcomePage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    {/* Add more routes for other pages or views */}
                </Routes>
            </div>
        </Router>
    );
}


export default App;
