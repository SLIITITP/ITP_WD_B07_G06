import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserHome from "./pages/userHome";
import MainPage from "./pages/mainPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PublicElement>
          <NavBar />
        </PublicElement>
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <MainPage />
              </PublicElement>
            }
          />
          <Route
            path="/user-home"
            element={
              <UserElement>
                <UserHome />
              </UserElement>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

function PublicElement({ children }) {
  return <>{children}</>;
}

function UserElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "user") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

export default App;
