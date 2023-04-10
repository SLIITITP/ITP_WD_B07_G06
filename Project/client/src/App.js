import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserHome from "./pages/userHome";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/user-home" element={<UserHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
