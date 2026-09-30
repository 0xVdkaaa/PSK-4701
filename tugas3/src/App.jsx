import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Halaman pertama yang dibuka (Login) */}
                <Route path="/" element={<Login />} />
                
                {/* Halaman Admin */}
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}