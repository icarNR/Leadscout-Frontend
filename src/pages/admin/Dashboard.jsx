import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Unstable_Grid2";
import LeadershipTable from "../../components/admin/LeadershipTable";
import Criteria from "../../components/admin/Criteria";
import PageLayout from "../../layouts/APLayout";
import "./Dashboard.css";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

function Dashboard() {
  const [departmentValue, setDepartmentValue] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/departments");
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

  const handleDepartmentChange = (event) => {
    setDepartmentValue(event.target.value);
  };

  const pageContent = (
    <div>
      <div className="container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8.5}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
                marginTop={3}
              >
                <h4 style={{ textAlign: "left", marginRight: "10px" }}>
                  Department:
                </h4>
                <FormControl
                  variant="standard"
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 1,
                    border: "3px solid #ced4da",
                    "&:hover": {
                      borderColor: "#80bdff",
                    },
                    "&.Mui-focused": {
                      borderColor: "#80bdff",
                    },
                    width: "200px", // Fix width of the dropdown
                  }}
                >
                  <Select
                    labelId="department-select-label"
                    id="department-select"
                    value={departmentValue}
                    onChange={handleDepartmentChange}
                    displayEmpty
                    disableUnderline
                    label="Department"
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "10px 14px",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {departments.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={3.5} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: 3 }}>
              <Box
                sx={{display:"flex",alignItems: "left", mb: 2 }}
                marginTop={3}
              >
                <Tooltip title="Those who have done both self-assessment and been observed by the supervisor are in black.">
                  <InfoIcon />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>

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
    </div>
  );

  return <PageLayout content={pageContent} pagename={"Dashboard"} />;
}

export default Dashboard;
