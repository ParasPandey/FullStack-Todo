import React from "react";
import "./../../CssFiles/MainTodo/Navbar.css";
// import logo from "./../../assets/images/logo.png";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";

const Navbar = () => {
  const history = useHistory();
  return (
    <div className="app_my_navbar">
      <div className="app_left_nav">
        <ul className="app_left_options">
          <li>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </li>
          <li>
            <IconButton>
              <HomeIcon />
            </IconButton>
          </li>
          <li>
            <TextField
              id="standard-start-adornment"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </li>
        </ul>
      </div>
      <div className="app_right_nav">
        <ul className="app_right_options">
          <li>
            <IconButton>
              <AddIcon />
            </IconButton>
          </li>
          <li>
            <IconButton>
              <HelpOutlineOutlinedIcon />
            </IconButton>
          </li>
          <li>
            <IconButton>
              <NotificationsActiveIcon />
            </IconButton>
          </li>
          <li>
            {/* <IconButton>
            <Avatar alt="Remy Sharp"  />
            </IconButton> */}
            <Avatar alt="Remy Sharp" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
