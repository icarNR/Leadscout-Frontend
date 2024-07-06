import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LeadershipTable from "../../components/admin/LeadershipTable.jsx";
import Criteria from "../../components/admin/HomeCriteria.jsx";
import PageLayout from "../../layouts/APLayout.jsx";
import Profile from "../../components/admin/profile.jsx";
import "./Dashboard.css";

const server = import.meta.env.VITE_REACT_APP_SERVER_URL;

function Dashboard() {
  const [departmentValue, setDepartmentValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const accessToken = sessionStorage.getItem("access_token");


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${server}/departments`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleCriteriaChange = (criteria) => {
    setSelectedCriteria(criteria);
  };

  const handleSortChange = (value) => {
    setSortValue(value);
  };

  const handleRowClick = (profile) => {
    setSelectedProfile(profile);
  };

  const closeProfile = () => {
    setSelectedProfile(null);
  };

  const pageContent = (
    <div className="container border">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={9.5} style={{ width: "65vw" }}>
            {selectedProfile ? (
              <Profile profileData={selectedProfile} onClose={closeProfile} />
            ) : (
              <LeadershipTable
                selectedCriteria={selectedCriteria}
                departmentValue={departmentValue}
                sortCriteria={sortValue}
                onRowClick={handleRowClick}
              />
            )}
          </Grid>
          <Grid item xs={2.5} style={{ width: "35vw" }}>
            <Criteria onCriteriaChange={handleCriteriaChange} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );

  return (
    <PageLayout
      content={pageContent}
      departmentValue={departmentValue}
      setDepartmentValue={setDepartmentValue}
      departments={departments}
      sortValue={sortValue}
      setSortValue={handleSortChange}
    />
  );
}

export default Dashboard;
