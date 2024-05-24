import LeadershipTable from "../../components/admin/LeadershipTable";
import Criteria from "../../components/admin/Criteria";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "./Dashboard.css";
import PageLayout from "../../layouts/APLayout";

function Dashboard() {
  const [selectedCriteria, setSelectedCriteria] = useState([]);

  const handleCriteriaChange = (criteria) => {
    setSelectedCriteria(criteria);
  };

  const pageContent = (
    <div>
      <div className="container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid style={{ width: "80%"   }}>
              {" "}
              <LeadershipTable selectedCriteria={selectedCriteria} />
            </Grid>
            <Grid style={{ width: "20%" }}>
              {" "}
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
