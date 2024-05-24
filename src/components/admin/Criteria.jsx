import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import "./Criteria.css";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  backgroundColor: theme.palette.primary.main,
  width: 330,
  color: theme.palette.primary.contrastText,
  margin: "0 5px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const rows = [
  { checked: false, Status: "programming", Current: 8 },
  { checked: false, Status: "communication", Current: 4 },
  { checked: false, Status: "SQL", Current: 3 },
  { checked: false, Status: "leadership", Current: 8 },
];

export default function Criteria({ onCriteriaChange }) {
  const [showList, setShowList] = useState(false);
  const [showQuickCriteria, setShowQuickCriteria] = useState(false);
  const [checkedState, setCheckedState] = useState({
    programming: false,
    communication: false,
    SQL: false,
    leadership: false,
  });

  const handleToggle = () => {
    setShowList(!showList);
  };

  const handleCheckboxChange = (event, index) => {
    const { checked } = event.target;
    const updatedRows = [...rows];
    updatedRows[index].checked = checked;
    setCheckedState({ ...checkedState, [updatedRows[index].Status]: checked });
  };

  const handleDoneClick = () => {
    setShowQuickCriteria(!showQuickCriteria);
    const selectedCriteria = rows
      .filter((row) => row.checked)
      .map((row) => row.Status);
    console.log("Selected criteria:", selectedCriteria);
    onCriteriaChange(selectedCriteria);
  };

  const toggleQuickCriteria = () => {
    setShowQuickCriteria(!showQuickCriteria);
  };

  return (
    <div className="criteria-container">
      {showQuickCriteria && (
        <div className="quick-criteria-overlay">
          <div className="quick-criteria-content">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={toggleQuickCriteria}
                sx={{ color: "#FFFFFF" }}
              >
                Cancel
              </Button>
            </div>
            <h3 style={{ textAlign: "left" }} className="whiteText">
              Select skill
            </h3>

            <Table
              aria-label="simple table"
              component={Paper}
              sx={{
                backgroundColor: "#007791",
                borderRadius: 4,
                padding: "10px",
                width: "800px",
              }}
            >
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.checked}
                            onChange={(event) =>
                              handleCheckboxChange(event, index)
                            }
                          />
                        }
                        label={row.Status}
                        className="whiteText"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <br />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleDoneClick}
                sx={{ backgroundColor: "#007791" }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <FormGroup>
        <div class style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "black", marginRight: "10px" }}>Criteria</span>
          <FormControlLabel
            control={<Switch checked={showList} onChange={handleToggle} />}
          />
        </div>

        {showList && (
          <Table
            aria-label="simple table"
            component={Paper}
            sx={{ backgroundColor: "#007791" }}
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left" className="whiteText">
                  Skills
                </TableCell>
                <TableCell align="left" className="whiteText">
                  Current
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} sx={{ height: "5px" }}>
                  <TableCell component="th" scope="row" className="whiteText">
                    <Checkbox
                      checked={row.checked}
                      onChange={(event) => handleCheckboxChange(event, index)}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    className="whiteText" 
                    sx={{ height: "5px" }}
                  >
                    {row.Status}
                  </TableCell>
                  <TableCell align="right" className="whiteText">
                    {row.Current}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <br />
        <Stack direction="column" spacing={2}>
          <CustomButton
            onClick={toggleQuickCriteria}
            sx={{ backgroundColor: "#007791" }}
          >
            Quick Criteria
          </CustomButton>
          <CustomButton sx={{ backgroundColor: "#007791" }}>
            Browse Criteria
          </CustomButton>
        </Stack>
      </FormGroup>
    </div>
  );
}
