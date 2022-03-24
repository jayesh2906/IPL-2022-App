import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Switch,
  styled,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  [theme.breakpoints.down("md")]: {
    width: 58,
    height: 32,
  },
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    [theme.breakpoints.down("md")]: {
      width: 28,
      height: 28,
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    marginTop: ".3rem",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  menuIcon: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    width: "70px",
    height: "40px",
    objectFit: "contain",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
      transition: "all 1s",
    },
    "&:active": {
      transform: "scale(1.3)",
    },
  },
}));

const Navbar = ({ handleTheme }) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname.substring(1));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mobile menu for small screen devices
  const MobileMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem component={Link} onClick={handleClose} to="/">
        HOME
      </MenuItem>
      <MenuItem component={Link} onClick={handleClose} to="/schedule">
        SCHEDULE
      </MenuItem>
      <MenuItem component={Link} onClick={handleClose} to="/prediction">
        PREDICTION
      </MenuItem>
      <MenuItem component={Link} onClick={handleClose} to="/bestofipl">
        BEST OF IPL
      </MenuItem>
      <MenuItem component={Link} onClick={handleClose} to="/createxi">
        CREATE XI
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#e53935" }}>
        <Toolbar>
          <div style={{ flexGrow: "1", padding: ".5rem 0" }}>
            <img
              src={logo}
              onClick={() => {
                setActive("home");
                navigate("/");
              }}
              className={classes.logo}
              alt="team image"
              fetchpriority="high"
            />
          </div>
          <div className={classes.sectionDesktop}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={() => {
                setActive("home");
              }}
              sx={
                (active === "" || active === "home") && {
                  background: "#d86765",
                }
              }
            >
              HOME
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/schedule"
              onClick={() => {
                setActive("schedule");
              }}
              sx={active === "schedule" && { background: "#d86765" }}
            >
              SCHEDULE
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/prediction"
              onClick={() => {
                setActive("prediction");
              }}
              sx={active === "prediction" && { background: "#d86765" }}
            >
              PREDICT WINNER
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/bestofipl"
              onClick={() => {
                setActive("bestofipl");
              }}
              sx={active === "bestofipl" && { background: "#d86765" }}
            >
              BEST OF IPL
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/createxi"
              onClick={() => {
                setActive("createxi");
              }}
              sx={
                (active === "createxi" || active.includes("selectxi")) && {
                  background: "#d86765",
                }
              }
            >
              CREATE XI
            </Button>
          </div>
          <div className={classes.menuIcon}>
            <SportsCricketIcon
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </div>
          <div>
            <MaterialUISwitch sx={{ m: 1 }} onClick={handleTheme} />
          </div>
        </Toolbar>
      </AppBar>
      {MobileMenu}
    </>
  );
};

export default Navbar;
