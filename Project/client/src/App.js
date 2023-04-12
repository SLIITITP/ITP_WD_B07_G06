import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMainPage from "./pages/userMainPage";
import UserHome from "./pages/userHome";
import AdimnSideBar from "./components/AdminSidebar";
import AdminMainPage from "./pages/adminMainPage";
import Staff from "./pages/staff";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <UserMainPage />
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
          <Route
            path="/admin"
            element={
              <AdminElement>
                <AdminMainPage />
              </AdminElement>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <Staff />
                </AdimnSideBar>
              </AdminElement>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

function PublicElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === null || userType === "user") {
    return <>{children}</>;
  } else {
    return <></>;
  }
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

function AdminElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "admin") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

export default App;
