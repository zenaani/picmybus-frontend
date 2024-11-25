import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import DetailedPage from "./pages/DetailedPage/DetailedPage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/details/:id" element={<DetailedPage />} />
                <Route path="/aboutus" element={<AboutUsPage/>}/>
                <Route path="/feedback" element={<FeedbackPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
