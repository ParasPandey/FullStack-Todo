import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  selectuser,
  logout,
  setLeftBox,
  selectLeftBox,
} from "../../Redux/UserSlice";
import Button from "@material-ui/core/Button";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectuser);
  const showLeftBox = useSelector(selectLeftBox);
  const openProfile = () => {
    setShowProfile(!showProfile);
  };
  const signoutUser = () => {
    localStorage.clear();
    dispatch(logout());
  };
  const handleLeftBox = () => {
    dispatch(
      setLeftBox({
        left_box: !showLeftBox,
      })
    );
  };
  return (
    <>
      <div className="app_my_navbar">
        <div className="app_left_nav">
          <ul className="app_left_options">
            <li>
              <IconButton onClick={handleLeftBox}>
                <MenuIcon />
              </IconButton>
            </li>
            <li className="off_list_item">
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
            <li className="off_list_item">
              <IconButton>
                <AddIcon />
              </IconButton>
            </li>
            <li className="off_list_item">
              <IconButton>
                <HelpOutlineOutlinedIcon />
              </IconButton>
            </li>
            <li className="off_list_item">
              <IconButton>
                <NotificationsActiveIcon />
              </IconButton>
            </li>
            <li>
              {/* <IconButton>
            <Avatar alt="Remy Sharp"  />
            </IconButton> */}
              <Avatar alt="Remy Sharp" onClick={openProfile} />
            </li>
          </ul>
        </div>
      </div>
      {showProfile && (
        <div className="user_profile">
          <div className="about_user">
            <Avatar alt="Remy Sharp" />
            <div className="user_name_email">
              <strong>{user?.username}</strong>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="signout_option">
            <Button variant="contained" color="secondary" onClick={signoutUser}>
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
