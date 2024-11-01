import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './paginas/Login'; 
import { TempoReal } from './paginas/TempoReal'; 
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/TempoReal" element={<TempoReal />} />
            </Routes>
        </Router>
    );
}

export default App;
