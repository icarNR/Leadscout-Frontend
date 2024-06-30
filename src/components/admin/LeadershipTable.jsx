import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import Profile from "./profile.jsx"; // Import the Profile component
import "./LeadershipTable.css";
import SearchContext from "./SearchContext.jsx";


const server = "http://127.0.0.1:8000";
const LeadershipTable = ({ selectedCriteria, departmentValue, sortCriteria }) => {
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
          `${server}/src/component/admin/LeadershipTable/`,
          { params }
        );
        let dataWithId = response.data.map((item, index) => ({
          ...item,
          id: item.id || `${index}`, // Ensure every item has an id
          user_id: item.user_id ? item.user_id.toString() : `${index}`
        }));

        // Sorting logic based on sortCriteria if it's set
        if (sortCriteria === "Potential") {
          dataWithId = dataWithId.sort((a, b) => b.potential - a.potential); // Sort potential descending
        } else if (sortCriteria === "Competency") {
          dataWithId = dataWithId.sort((a, b) => b.competency - a.competency); // Sort competency descending
        }

        setLeadershipData(dataWithId);
      } catch (error) {
        console.error("Error fetching or sorting leadership data:", error);
      }
    }

    fetchLeadershipData();
  }, [selectedCriteria, departmentValue, sortCriteria]);

  const filteredData = leadershipData.filter(
    (item) =>
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.user_id && item.user_id.toString().toLowerCase().includes(searchTerm.toLowerCase())) // Ensure user_id is converted to string
  );

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
          src={params.value || "default_image_path"} // Add a default image path
          alt={params.row.name}
          style={{ width: "40px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "user_id", headerName: "ID", width: 100 },
    { field: "position", headerName: "Position", width: 300 }, // Update field name
    {
      field: "potential",
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          Potential
          <Tooltip title="Those who have done both self-assessment and been observed by the supervisor are in black.">
            <InfoIcon style={{ marginLeft: 4 }} />
          </Tooltip>
        </div>
      ),
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            color: params.row.observed ? "black" : "red",
          }}
        >
          {params.value}%
        </div>
      ),
    },
    { field: "competency", headerName: "Competency", width: 150 },
  ];

  return (
    <div style={{ height: 750, position: "relative" }}>
      <DataGrid
        rows={filteredData}
        columns={columns}
        pagination
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
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

