import React, { useState } from "react";
import "../styles/staff.css";
import { FaTh, FaPlus, FaChartLine, FaSearch } from "react-icons/fa";
import AddSpecialist from "../components/AddSpecialist";
import ViewSpecialists from "../components/ViewSpecialists";
import UpdateSatff from "../components/UpdateSatff";

function Staff() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("view");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState({});

  async function deleteMember(id) {
    const response = await fetch(
      `http://localhost:8070/specialist/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.status === "User deleted") {
      alert("User deleted");
      window.location.reload(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    if (name === "") {
      alert("Required");
    } else {
      async function searchDetails(id) {
        const response = await fetch(
          `http://localhost:8070/specialist/get/${id}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (data.status === "Found User") {
          setShow(true);
          setDetails(data);
        } else if (data.status === "NotFound User") {
          alert("User not found");
          setName("");
          window.location.reload(false);
        }
      }

      searchDetails(name);
    }
  }

  return (
    <div>
      <div>
        <div style={{ marginBottom: "50px" }}>
          <h1 style={{ textAlign: "center" }}>Staff Details</h1>
        </div>
        <div style={{ marginBottom: "50px" }}>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setSelected("view")}
          >
            <FaTh className="icon" />
            <div className="text">View</div>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setSelected("add")}
          >
            <FaPlus className="icon" />
            <div className="text">Add</div>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setSelected("stats")}
          >
            <FaChartLine className="icon" />
            <div className="text">Stats</div>
          </button>
          <form noValidate onSubmit={handleSearch}>
            <span
              style={{
                float: "right",
                display: "flex",
                height: "40px",
                marginTop: "15px",
              }}
            >
              <input
                className="form-control"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <button className="btn btn-outline-success" type="submit">
                <FaSearch />
              </button>
            </span>
          </form>
        </div>
      </div>
      {details !== {} && show === true && (
        <div>
          <table
            className="table table-primary table-striped table-hover"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Specialization</th>
                <th scope="col">Experience</th>
                <th scope="col" colSpan={2}>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.specialist.name}</td>
                <td>{details.specialist.experience}</td>
                <td>{details.specialist.specialization}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteMember(details.specialist._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-danger"
            onClick={() => {
              setName("");
              setShow(false);
              window.location.reload(false);
            }}
          >
            Back
          </button>
        </div>
      )}
      {selected === "view" && show === false && <ViewSpecialists />}
      {selected === "add" && show === false && <AddSpecialist />}
      {showModal && (
        <UpdateSatff closeModal={setShowModal} details={details.specialist} />
      )}
    </div>
  );
}

export default Staff;
