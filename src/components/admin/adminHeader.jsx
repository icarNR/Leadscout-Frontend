import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/Group 20.png";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export function MenuAppBarWithoutProgressBar({ percentage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState("");
  const [filterValue, setFilterValue] = React.useState("Potential"); // State for the Filter select
  const [departmentValue, setDepartmentValue] = React.useState(""); // State for the Department select

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  
  const handleDepartmentChange = (event) => {
    setDepartmentValue(event.target.value);
  };

  const options = ["Potential", "Competency", "Experience"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                width: { xs: "100px", sm: "180px" },
                flexShrink: { xs: 1, sm: 0 },
              }}
            >
              <img
                src={logo}
                alt="LeadScoutLogo"
                style={{
                  marginRight: "16px",
                  width: "100%",
                  objectFit: "contain",
                }} // Adjust width and margin as needed
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box>
                <TextField
                  id="standard-basic"
                  label="Search for Emp by name"
                  variant="standard"
                  sx={{
                    marginRight: "16px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Box>
                <FormControl
                  variant="standard"
                  sx={{
                    marginRight: "16px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    width: "180px",
                  }}
                >
                  <InputLabel id="filter-select-label"></InputLabel>
                  <Select
                    labelId="filter-select-label"
                    id="filter-select"
                    value={filterValue}
                    onChange={handleFilterChange}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 2,
                      width: "180px",
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  variant="standard"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    width: "180px",
                  }}
                >
                  <InputLabel id="department-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="department-select-label"
                    id="department-select"
                    value={departmentValue}
                    onChange={handleDepartmentChange}
                  >
                    <MenuItem key="department1" value="department1">
                      Department 1
                    </MenuItem>
                    <MenuItem key="department2" value="department2">
                      Department 2
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 34, height: 34 }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
