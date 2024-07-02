import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LeadershipTable from "../../components/admin/LeadershipTable.jsx";
import Criteria from "../../components/admin/Criteria.jsx";
import PageLayout from "../../layouts/APLayout.jsx";
import "./Dashboard.css";


const server = "http://127.0.0.1:8000"

function Dashboard() {
  const [departmentValue, setDepartmentValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${server}/departments`);
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

  const pageContent = (
    <div className="container border">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <LeadershipTable
              selectedCriteria={selectedCriteria}
              departmentValue={departmentValue}
            />
          </Grid>
          <Grid item xs={3}>
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
    />
  );
}

export default Dashboard;
