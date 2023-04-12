import React, { useState } from "react";
import "../styles/staff.css";
import { FaTh, FaPlus, FaChartLine, FaSearch } from "react-icons/fa";
import AddSpecialist from "../components/AddSpecialist";
import ViewSpecialists from "../components/ViewSpecialists";

function Staff() {
  const [selected, setSelected] = useState("view");

  return (
    <div>
      <div>
        <div style={{ marginBottom: "50px" }}>
          <h1 style={{ textAlign: "center" }}>Staff Details</h1>
        </div>
        <div style={{ marginBottom: "50px" }}>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => setSelected("view")}
          >
            <FaTh className="icon" />
            <div className="text">View</div>
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => setSelected("add")}
          >
            <FaPlus className="icon" />
            <div className="text">Add</div>
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => setSelected("stats")}
          >
            <FaChartLine className="icon" />
            <div className="text">Stats</div>
          </button>
          <span
            style={{
              float: "right",
              display: "flex",
              height: "40px",
              marginTop: "15px",
            }}
          >
            <input className="form-control" />
            <button class="btn btn-outline-success" type="submit">
              <FaSearch />
            </button>
          </span>
        </div>
      </div>
      {selected === "view" && <ViewSpecialists />}
      {selected === "add" && <AddSpecialist />}
    </div>
  );
}

export default Staff;
