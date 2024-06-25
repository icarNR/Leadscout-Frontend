import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Profile from "./profile"; // Import the Profile component
import "./LeadershipTable.css";
import SearchContext from "./SearchContext";

const LeadershipTable = ({ selectedCriteria, departmentValue }) => {
  const [leadershipData, setLeadershipData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null); // State to hold selected profile data
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    async function fetchLeadershipData() {
      try {
        const params = {
          department: departmentValue,
          session_data: JSON.stringify(Object.fromEntries(selectedCriteria)),
        };
        const response = await axios.get(
          "http://127.0.0.1:8000/src/component/admin/LeadershipTable/",
          { params }
        );
        const dataWithId = response.data.map((item, index) => ({
          ...item,
          id: item.id || index,
        }));
        setLeadershipData(dataWithId);
      } catch (error) {
        console.error("Error fetching leadership data:", error);
      }
    }

    fetchLeadershipData();
  }, [selectedCriteria, departmentValue]);

  const filteredData = leadershipData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRowClassName = (params) => {
    return params.row.observed && params.row.allowed_assess
      ? "black-row"
      : "red-row";
  };

  const handleRowClick = (params) => {
    setSelectedProfile(params.row); // Set the selected profile data
  };

  const closeProfile = () => {
    setSelectedProfile(null); // Close the profile modal
  };

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
    { field: "name", headerName: "Name", width: 250 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "currentPosition", headerName: "Current Position", width: 250 },
    { field: "potential", headerName: "Potential", width: 100 },
    { field: "competency", headerName: "Competency", width: 100 },
  ];

  return (
    <div style={{ height: 500, position: "relative" }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        getRowClassName={getRowClassName}
        onRowClick={handleRowClick} // Add onRowClick handler
      />
      {selectedProfile && (
        <div className="profile-modal">
          <button className="close-modal-btn" onClick={closeProfile}>
            &times;
          </button>
          <Profile profileData={selectedProfile} />
        </div>
      )}
    </div>
  );
};

export default LeadershipTable;
