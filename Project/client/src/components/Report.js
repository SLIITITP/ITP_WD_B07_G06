import React, { useEffect, useState } from "react";

function Report() {
  const email = localStorage.getItem("userEmail");
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    async function fetchReportData(id) {
      const response = await fetch(
        `http://localhost:8070/report/get-reports/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);
      if (data) {
        setReportData(data.report);
      }
    }

    fetchReportData(email);
  }, [email]);

  return (
    <div>
      <div>
        {reportData.map((report, index) => {
          return (
            <div
              className="card"
              style={{ width: "60%", margin: "auto", marginBottom: "20px" }}
              key={index}
            >
              <div className="card-header">
                <h3>Report ID : {report.id}</h3>
              </div>
              <div className="card-body" style={{ display: "flex" }}>
                <div style={{ width: "70%" }}>
                  <h5 className="card-title">
                    {"Patient Name :" + report.patientName}
                  </h5>
                  <h5 className="card-title">
                    {"Doctor Name :" + report.doctorName}
                  </h5>
                  <br />
                  <br />
                  <br />
                  <button className="btn btn-success" disabled>
                    {report.status}
                  </button>
                </div>
                <div>
                  <img
                    src={report.reportURL}
                    alt="Report"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Report;
