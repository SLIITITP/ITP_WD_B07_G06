import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMainPage from "./pages/userMainPage";
import UserHome from "./pages/userHome";
import AdimnSideBar from "./components/AdminSidebar";
import AdminMainPage from "./pages/adminMainPage";
import DoctorMainPage from "./pages/doctorMainPage";
import CheckReports from "./pages/checkReports";
import MedicalProfile from "./pages/medicalProfile";
import Staff from "./pages/staff";
import Report from "./components/Report";
import UserStats from "./components/UserStats";
import AddAppointment from "./components/AddAppointment";
import AllAppointment from "./components/AllAppointment";
import UpdateAppointment from "./components/UpdateAppointment";
import DeleteAppointment from "./components/DeleteAppointment";

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
            path="/admin/user-stats"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UserStats />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/doctor-home"
            element={
              <DoctorElement>
                <DoctorMainPage />
              </DoctorElement>
            }
          />
          <Route
            path="/report"
            element={
              <DoctorElement>
                <AdimnSideBar>
                  <Report />
                </AdimnSideBar>
              </DoctorElement>
            }
          />
          <Route
            path="/user-check-reports"
            element={
              <UserElement>
                <CheckReports />
              </UserElement>
            }
          />
          <Route
            path="/user-appointment"
            element={
              <PublicElement>
                <AddAppointment/>
              </PublicElement>
            }
          />
          <Route
            path="/user-medical-profile"
            element={
              <UserElement>
                <MedicalProfile />
              </UserElement>
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
          <Route
            path="/admin/appointment"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <AllAppointment/>
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/update/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UpdateAppointment/>
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/delete/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <DeleteAppointment/>
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

function DoctorElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "doctor") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

export default App;
