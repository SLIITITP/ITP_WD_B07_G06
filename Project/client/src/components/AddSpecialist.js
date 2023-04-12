import React, { useState } from "react";
import axios from "axios";

export default function AddSpecialist() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newSpecialist = {
      name,
      specialization,
      experience,
    };

    axios
      .post("http://localhost:8070/specialist/add", newSpecialist)
      .then(() => {
        alert("Specialist was added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label for="name">Specialist Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Specialist Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label for="specialization">Specialization</label>
          <input
            type="text"
            className="form-control"
            id="specialization"
            placeholder="Enter Specialization"
            onChange={(e) => {
              setSpecialization(e.target.value);
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label for="experience">Experience</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            placeholder="Enter Experience"
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
