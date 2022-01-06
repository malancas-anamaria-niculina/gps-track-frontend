import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import MapPage from "./Components/MapPage"
import Login from "./Components/Login"

function App() {
  const [existToken, tokenExists] = useState(false);

  useEffect(async () => {
    console.log(existToken);
    tokenExists(localStorage.getItem("token").length > 0);
    console.log(existToken ? "yes" : "no");
  }, []);

  return (
    <div className="App" style={{ height: '100vh', width: '100%' }}>
      <header>
        <h1>
          Proiect SCD
        </h1>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login tokenExists={tokenExists}/>} />
        <Route path="/dashboard" element={
          existToken ? (<MapPage />) : (<Navigate to="/login" />)
        } />
      </Routes>

    </div>
  );
}

export default App;
