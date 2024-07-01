import React, { useContext, useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputAdornment from '@mui/material/InputAdornment';
import logo from "../../assets/Group 20.png";
import SearchContext from "./SearchContext";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

const appbarStyles = {
  backgroundColor: "#404B69",
  color: "#00818A",
};

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
  alignItems: "center",
  padding: "4px",
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    paddingLeft: "0",
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

const sortOptions = [ 
  'Potential',
  'Competency',
];

export function MenuAppBarWithoutProgressBar({ percentage, onSearch, departmentValue, setDepartmentValue, departments = [], sortCriteria, setSortCriteria }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState(searchTerm);
  const searchInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortValue, setSortValue] = useState(sortCriteria || "");

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);
  
  useEffect(() => {
    setSortValue(sortCriteria); // Sync local state with prop value
  }, [sortCriteria]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentValue(event.target.value);
  };
  
  const handleSortChange = (event) => {
  const value = event.target.value;
  setSortValue(value);
  setSortCriteria(value);
};



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ ...appbarStyles }}>
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
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    ref={searchInputRef}
                    placeholder="Search for Employees"
                    inputProps={{ "aria-label": "search" }}
                    value={inputValue}
                    onChange={handleChange}
                  />
                </Search>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginLeft: 3 }}>
                <Selection
                  variant="standard" sx={{ width: "170px"}}
                >
                  <Select
                    labelId="sort-by-label"
                    id="sort-by"
                    value={sortValue}
                    onChange={handleSortChange} 
                    displayEmpty
                    disableUnderline
                    label="Sort"
                    inputProps={{ "aria-label": "Select department" }}
                    startAdornment={
                      <>
                        <InputAdornment position="start">
                          <SortIcon />
                        </InputAdornment>
                        <VerticalDivider />
                      </>
                    }
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "7px 3px",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>Sort By</em>
                    </MenuItem>
                    {sortOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Selection>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginLeft: 3 }}>
                <Selection
                  variant="standard"
                >
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
                        padding: "7px 0px",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>All Departments</em>
                    </MenuItem>
                    {departments.length > 0 &&
                      departments.map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
                        </MenuItem>
                      ))}
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
