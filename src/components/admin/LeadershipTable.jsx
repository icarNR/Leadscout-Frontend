import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./LeadershipTable.css";

const LeadershipTable = ({ selectedCriteria }) => {
  const [leadershipData, setLeadershipData] = useState([]);

  useEffect(() => {
    async function fetchLeadershipData() {
      let apiUrl = `http://127.0.0.1:8000/src/component/admin/LeadershipTable/`;
      // Check if selectedCriteria is empty
      console.log("Selected criteria:", selectedCriteria);
      if (selectedCriteria) {
        // Construct the API URL dynamically based on the selected criteria
        apiUrl += `?skill=${selectedCriteria.join(",")}`;
      }

      const response = await axios.get(apiUrl);
      console.log("Leadership data:", response.data);
      setLeadershipData(response.data);
    }

    fetchLeadershipData();
  }, [selectedCriteria]);

  const columns = [
    {
      field: "picture",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 300 },
    { field: "id", headerName: "ID", width: 200 },
    { field: "currentPosition", headerName: "Current Position", width: 300 },
    { field: "potential", headerName: "Potential", width: 150 },
    { field: "competency", headerName: "Competency", width: 150 },
  ];

  return (
    <div style={{ height: 750 }}>
      <DataGrid
        rows={leadershipData}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default LeadershipTable;
