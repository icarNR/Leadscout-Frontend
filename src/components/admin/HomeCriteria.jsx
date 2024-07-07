import React, { useState, useEffect } from "react";
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
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./Criteria.css";

const server = "http://127.0.0.1:8000";

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

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#007791", // Remove border in default state
    },
    "&:hover fieldset": {
      borderColor: "white", // Show border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Show border when focused
    },
    backgroundColor: "#007791",
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
});

export default function Criteria({ onCriteriaChange }) {
  const [rows, setRows] = useState([]);
  const [showQuickCriteria, setShowQuickCriteria] = useState(false);
  const [skillsFromStorage, setSkillsFromStorage] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token"); // Retrieve the access token
        const response = await axios.get(`${server}/skills`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
          },
        });
        const skills = response.data.map((skill) => ({
          checked: false,
          Status: skill,
          Current: 0,
        }));
        setRows(skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const storedCriteria = sessionStorage.getItem("selectedCriteria");
    if (storedCriteria) {
      setSkillsFromStorage(JSON.parse(storedCriteria));
    }
  }, []);

  useEffect(() => {
    onCriteriaChange(skillsFromStorage);
  }, [skillsFromStorage, onCriteriaChange]);

  const handleCheckboxChange = (event, index) => {
    const { checked } = event.target;
    const updatedRows = [...rows];
    updatedRows[index].checked = checked;
    setRows(updatedRows);
  };

  const handleDoneClick = () => {
    setShowQuickCriteria(!showQuickCriteria);
    const selectedCriteria = rows
      .filter((row) => row.checked)
      .map((row) => row.Status);

    const criteriaWithDefaults = selectedCriteria.map((skill) => [skill, 0]);

    // Clear sessionStorage before setting new criteria
    sessionStorage.removeItem("selectedCriteria");

    sessionStorage.setItem(
      "selectedCriteria",
      JSON.stringify(criteriaWithDefaults)
    );
    setSkillsFromStorage(criteriaWithDefaults);

    console.log("Selected criteria:", criteriaWithDefaults);
    onCriteriaChange(criteriaWithDefaults);
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    if (!/^\d*$/.test(value)) {
      return; // Only allow numbers
    }

    const updatedSkills = [...skillsFromStorage];
    updatedSkills[index][1] = value !== "" ? Number(value) : 0; // Ensure the value is a number and not empty
    setSkillsFromStorage(updatedSkills);
    sessionStorage.setItem("selectedCriteria", JSON.stringify(updatedSkills));
  };

  return (
    <div className="criteria-container">
      {showQuickCriteria && (
        <div className="quick-criteria-overlay">
          <div className="quick-criteria-content">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => setShowQuickCriteria(false)}
                sx={{ color: "#FFFFFF" }}
              >
                Cancel
              </Button>
            </div>
            <h3 style={{ textAlign: "left" }} className="whiteText">
              Select skill
            </h3>

            <div
              style={{
                maxHeight: "32vw",
                width: "18vw",
                overflowY: "auto",
                marginBottom: "10px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                padding: "10px",
                backgroundColor: "#007791",
              }}
            >
              <Table
                aria-label="simple table"
                component={Paper}
                sx={{
                  backgroundColor: "#007791",
                  borderRadius: 4,
                }}
              >
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        height: "30px", // Adjust this value to your desired row height
                        "& td, & th": {
                          padding: "8px", // Adjust this value to your desired cell padding
                        },
                      }}
                    >
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
            </div>

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
        {skillsFromStorage.length > 0 && (
          <>

            <div
              style={{
                maxHeight: "20vw", // Set the maximum height for the table
                overflowY: "auto", // Add vertical scroll for overflow
              }}

            //<Table
              //aria-label="simple table"
              //component={Paper}
              //sx={{ backgroundColor: "#649DAD", width: "100%" }}

            >
              <Table
                aria-label="simple table"
                component={Paper}
                sx={{ backgroundColor: "#007791", width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="whiteText">
                      Skills
                    </TableCell>
                    <TableCell align="left" className="whiteText">
                      Current
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skillsFromStorage.map((skill, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        height: "30px", // Adjust this value to your desired row height
                        "& td, & th": {
                          padding: "8px", // Adjust this value to your desired cell padding
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        className="whiteText"
                        sx={{ height: "5px" }}
                      >
                        {skill[0]}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="whiteText"
                        width="100px"
                      >
                        <CustomTextField
                          value={skill[1]}
                          onChange={(event) => handleInputChange(event, index)}
                          variant="outlined"
                          size="small"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <br />

           // <Stack direction="column" spacing={2} alignItems="flex-end">
          //    <Button
         //       variant="contained"
         //       onClick={handleEditClick}
            //    sx={{ backgroundColor: "#00818A", width: "5vw" }}
          //    >
                {isEditing ? "Save" : "Edit"}
           //   </Button>
           // </Stack>

          </>
        )}

        <br />
        <Stack direction="column" spacing={2}>
          <CustomButton
            onClick={() => setShowQuickCriteria(true)}
            sx={{ backgroundColor: "#00818A", width: "100%" }}
          >
            Quick Criteria
          </CustomButton>
          <CustomButton sx={{ backgroundColor: "#00818A", width: "100%" }}>
            Browse Criteria
          </CustomButton>
        </Stack>
      </FormGroup>
    </div>
  );
}
