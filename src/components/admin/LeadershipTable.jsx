import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import "./LeadershipTable.css";
import SearchContext from "./SearchContext.jsx";

const server = "http://127.0.0.1:8000";

const LeadershipTable = ({
  selectedCriteria,
  departmentValue,
  sortCriteria,
  onRowClick,
}) => {
  const [leadershipData, setLeadershipData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortedRows, setSortedRows] = useState([]);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    async function fetchLeadershipData() {
      try {
        const accessToken = sessionStorage.getItem("access_token");

        // Default parameters if session data is not available
        const params = {
          department: departmentValue || "", // Use default value or empty string
          session_data: "", // Empty string or default session data behavior
        };
        const sessionData = sessionStorage.getItem("selectedCriteria");
        if (sessionData) {
          const sessionData = JSON.parse(
            sessionStorage.getItem("selectedCriteria")
          );
          params.session_data = JSON.stringify(Object.fromEntries(sessionData));
        }

        const response = await axios
          .get(`${server}/src/component/admin/LeadershipTable/`, {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            if (response.status == 403 || response.status == 401) {
              throw new Error("Network response was not ok");
            }
            return response.data;
          })
          .catch((error) => {
            console.error("There was an error!", error);
            navigate("/LoginForm"); // Navigate to login form on error
          });

        const dataWithId = response.data.map((item, index) => ({
          ...item,
          id: item.id || `${index}`,
          user_id: item.user_id ? item.user_id.toString() : `${index}`,
        }));

        setLeadershipData(dataWithId);
      } catch (error) {
        console.error("Error fetching leadership data:", error);
        setLeadershipData([]); // Set empty array in case of error
      }
    }

    fetchLeadershipData();
  }, [selectedCriteria, departmentValue]);

  useEffect(() => {
    let sortedData = [...leadershipData];
    if (sortCriteria === "Potential") {
      sortedData.sort((a, b) => b.potential - a.potential);
    } else if (sortCriteria === "Competency") {
      sortedData.sort((a, b) => b.competency - a.competency);
    }
    setSortedRows(sortedData);
  }, [sortCriteria, leadershipData]);

  const filteredData = sortedRows.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.user_id &&
        item.user_id
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const handleRowClick = (row) => {
    onRowClick(row); // Call the parent component's handler
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    {
      field: "picture",
      headerName: "",
      renderCell: (params) => (
        <img
          src={params.value || "default_image_path"}
          alt={params.row.name}
          style={{
            width: "35px",
            height: "35px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    { field: "name", headerName: "Name" },
    { field: "user_id", headerName: "ID" },
    { field: "position", headerName: "Position" },
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
    {
      field: "competency",
      headerName: "Competency",
      renderCell: (params) => (
        <div style={{ color: "#00818A" }}>{params.value}%</div>
      ),
    },
  ];

  return (
    <Paper style={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        style={{ maxHeight: "calc(100vh - 240px)", minHeight: "35vw" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  padding: "8px",
                  height: "55px",
                },
              }}
            >
              {columns.map((column) => (
                <TableCell style={{ color: "#00818A" }} key={column.field}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    height: "35px", // Adjust this value to your desired row height
                    "& td, & th": {
                      padding: "8px", // Adjust this value to your desired cell padding
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.renderCell
                        ? column.renderCell({
                            row,
                            value: row[column.field],
                          })
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LeadershipTable;
