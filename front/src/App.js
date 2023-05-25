import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MapPage } from "./MapPage/mapPage";
import { LoginPage } from "./LoginPage";
import { useSelector } from "react-redux";

function App() {
  const setMyLocation = useSelector((state) => state.map.myLocation);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {!!setMyLocation ? (
          <Route path="/map" element={<MapPage />} />
        ) : (
          <Route
            path="/map"
            element={
              <h2>
                Something wrong, <a href="/"> get back to login page.</a>
              </h2>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
