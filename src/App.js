import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import MapPage from "./Components/MapPage"
import Login from "./Components/Login"

function App() {

  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <header>
        <h1>
          Proiect SCD
        </h1>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<MapPage />} />
      </Routes>

    </div>
  );
}

export default App;
