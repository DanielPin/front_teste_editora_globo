import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/Nav.module.css";

export function Nav() {
  let navigate = useNavigate();

  const logar = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={style.nav}>
          <Link to="/">
            <ArrowBackIosNewIcon fontSize="large"></ArrowBackIosNewIcon>
          </Link>
          <ArrowBackIosNewIcon
            component="div"
            sx={{ flexGrow: 1 }}
          ></ArrowBackIosNewIcon>
          <a onClick={logar} style={{ cursor: "pointer" }}>
            <LogoutIcon></LogoutIcon>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
