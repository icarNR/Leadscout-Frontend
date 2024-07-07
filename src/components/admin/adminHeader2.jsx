import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/Group 20.png";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputAdornment from '@mui/material/InputAdornment';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import TextField from "@mui/material/TextField";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3px",
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.94),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: "45px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#696969",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
    color: "#696969",
  },
  "&::placeholder": {
    color: "#696969",
  },
}));

const Selection = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "3px",
  border: "1px solid #ced4da",
  height: "45px",
  display: "flex",
  alignItems: "left",
  padding: "4px",
  paddingLeft: "8px",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    paddingLeft: "6px",
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.94),
  },
  "&.Mui-focused": {
    backgroundColor: alpha(theme.palette.common.white, 0.94),
  },
  width: "200px",
}));

const VerticalDivider = styled("div")(({ theme }) => ({
  height: "28px",
  width: "1px",
  backgroundColor: "#00818A",
  margin: "0 10px 0 0",
}));

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
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search by id"
                    inputProps={{ "aria-label": "search" }}
                    value={value}
                    onChange={handleSearchChange}
                  />
                </Search>
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
                <Selection variant="standard">
                  <Select
                    labelId="department-select-label"
                    id="department-select"
                    value={departmentValue}
                    onChange={handleDepartmentChange}
                    displayEmpty
                    disableUnderline
                    label="Department"
                    startAdornment={
                      <>
                        <InputAdornment position="start">
                          <FilterAltIcon />
                        </InputAdornment>
                        <VerticalDivider />
                      </>
                    }
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "7px 14px", // Add padding to space the text and icon properly
                        textAlign: "center", // Align text to the left
                      },
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
                  </Select>
                </Selection>
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
