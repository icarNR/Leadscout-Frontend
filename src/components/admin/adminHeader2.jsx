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
import Button from "@mui/material/Button";

export function MenuAppBarWithoutProgressBar({ onDepartmentChange, onSearchChange, onMostUsedClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState("");
  const [departmentValue, setDepartmentValue] = React.useState("All");

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onSearchChange(inputValue); // Pass the search value up
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value;
    setDepartmentValue(selectedDepartment);
    onDepartmentChange(selectedDepartment);
  };

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
                }}
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
                  label="Search by id"
                  variant="standard"
                  value={value}
                  onChange={handleSearchChange}
                  sx={{
                    marginRight: "16px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Box sx={{ minWidth: "180px" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log("Most Used button clicked");
                    onMostUsedClick(); // Notify about the click
                  }}
                  sx={{
                    minWidth: "180px",
                    marginRight: "16px",
                  }}
                >
                  Most Used
                </Button>
              </Box>
              <Box>
                <TextField
                  id="department-select"
                  select
                  label="Department"
                  value={departmentValue}
                  onChange={handleDepartmentChange}
                  variant="standard"
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    width: "180px",
                  }}
                >
                  <MenuItem key="All" value="All">
                    All
                  </MenuItem>
                  <MenuItem key="IT" value="IT">
                    IT
                  </MenuItem>
                  <MenuItem key="HR" value="HR">
                    HR
                  </MenuItem>
                  <MenuItem key="Management" value="Management">
                    Management
                  </MenuItem>
                </TextField>
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

export default MenuAppBarWithoutProgressBar;
