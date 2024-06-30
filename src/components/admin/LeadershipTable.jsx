import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import Profile from "./profile.jsx"; // Import the Profile component
import "./LeadershipTable.css";
import SearchContext from "./SearchContext.jsx";

const server = "http://127.0.0.1:8000"
const LeadershipTable = ({ selectedCriteria, departmentValue }) => {};

export default LeadershipTable;

