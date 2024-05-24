import { RiGroupLine } from "react-icons/ri";
import { PiIdentificationCard } from "react-icons/pi";
import { PiNotePencilDuotone } from "react-icons/pi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import React from "react";
import { MenuAppBarWithoutProgressBar } from "../components/admin/adminHeader";
import CssBaseline from "@mui/material/CssBaseline";
import ClippedDrawer from "../components/admin/adminSideNavbar";

const PageLayout = ({ content }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowY: "Hidden",
      }}
    >
      {/* Fixed header */}
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
        <MenuAppBarWithoutProgressBar />
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Fixed side navbar */}
        <div
          style={{
            width: "140px",
            height: "calc(100vh)",
            position: "fixed",
            top: "100px",
            left: 0,
            zIndex: 90,
            overflow: "hidden",
          }}
        >
          <ClippedDrawer />
        </div>
        <CssBaseline />
        {/* Content */}
        <div className="sm:ml-32 mt-16 flex-1 overflow-y-auto">
          {/* Add your main content here */}

          {content}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
