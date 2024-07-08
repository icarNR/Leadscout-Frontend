import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LeadershipTable from "../../components/admin/LeadershipTable.jsx";
import Criteria from "../../components/admin/HomeCriteria.jsx";
import PageLayout from "../../layouts/APLayout.jsx";
import Profile from "../../components/admin/profile.jsx";
//import "./Dashboard.css";

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
        {
          /*
          .then((response) => {
            if (response.status == 403 || response.status !== 401) {
              throw new Error("Network response was not ok");
            }
            return response.data;
          })
          .catch((error) => {
            console.error("There was an error!", error);
            navigate("/LoginForm"); // Navigate to login form on error
          });*/
        }

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
        overflowY: "hidden",
        width: "100%",
      }}
    >
      <CssBaseline />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-row ">
          {/* left part */}
          <div className="flex flex-col items-center flex-grow">
            <div
              style={{ marginTop: "50px" }}
              className="w-full flex justify-center px-10  "
            >
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
            </div>
          </div>
          <div
            className="bg-cover bg-center w-[340px] flex flex-col items-start justify-top p-5"
            style={{ alignItems: "flex-start" }}
          >
            <div style={{ marginTop: "50px" }}>
              <Criteria onCriteriaChange={handleCriteriaChange} />
            </div>
          </div>
        </div>
      </div>
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
