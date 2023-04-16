import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LoginIcon from "@mui/icons-material/Login";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  function removeUser() {
    localStorage.removeItem("userRole");
    navigate("/");
  }

  const [showModal, setShowModal] = useState(false);

  const userRole = localStorage.getItem("userRole");

  return (
    <div>
      <Navbar
        className="shadow p-3 mb-5 bg-white rounded"
        style={{ background: "#e9ecef" }}
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="/">HCMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0" style={{ fontSize: "18px" }}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#action2">About Us</Nav.Link>
              <Nav.Link href="#action2">Contact Us</Nav.Link>
              {userRole === "user" && (
                <Nav.Link href="/user-check-reports">Reports</Nav.Link>
              )}
              {userRole === "user" && (
                <Nav.Link href="/user-medical-profile">Profile</Nav.Link>
              )}
            </Nav>
            <Nav style={{ fontSize: "18px" }}>
              {userRole == null && (
                <Nav.Link
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Login
                  <LoginIcon />
                </Nav.Link>
              )}
              {userRole !== null && (
                <Nav.Link onClick={removeUser}>
                  Logout
                  <LoginIcon />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal && <Login closeModal={setShowModal} />}
    </div>
  );
}

export default NavBar;
