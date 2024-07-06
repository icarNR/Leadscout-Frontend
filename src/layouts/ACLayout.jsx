import React from "react";
import { MenuAppBarWithoutProgressBar } from "../components/Admin/adminHeader2.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import ClippedDrawer from "../components/Admin/adminSideNavbar.jsx";

const PageLayout = ({
  content,
  handleDepartmentChange,
  handleSearchChange,
  handleMostUsedClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        overflowY: "hidden",
      }}
    >
      <div
        style={{
          height: "60px",
          backgroundColor: "lightblue",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <MenuAppBarWithoutProgressBar
          onDepartmentChange={handleDepartmentChange} 
          onSearchChange={handleSearchChange}
          onMostUsedClick={handleMostUsedClick}
        />
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: "140px",
            height: "calc(100vh - 60px)", // Adjusted to account for the header height
            position: "fixed",
            top: "60px", // Adjusted to start below the header
            left: 0,
            zIndex: 90,
            overflow: "hidden",
          }}
        >
          <ClippedDrawer />
        </div>
        <CssBaseline />
        <div
          className="sm:ml-32 sm:flex-1 overflow-hidden"
          style={{// Adjusted to align with the sidebar width
            marginTop: "6vw", // Adjusted to account for the header height
            paddingLeft: "20px", // Added padding for left alignment
            width: "100%", // Adjusted to fill remaining width
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
