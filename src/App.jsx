import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login'; 
import { TempoReal } from './components/TempoReal'; 
import { Tecnico } from './components/Tecnico';
import { Configuracao } from './components/Configuracao';
import { Relatorios } from './components/Relatorios';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/TempoReal" element={<TempoReal />} />
                <Route path="/Tecnico" element={<Tecnico />} />
                <Route path="/Relatorios" element={<Relatorios />} />
                <Route path="/Configuracao" element={<Configuracao />} />
            </Routes>
        </Router>
    );
}

export default App;
