import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: ".8rem",
  },
  grid: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  social: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: ".4rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginTop: ".4rem",
    },
  },
  anchor: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container sx={{ width: "90%", mx: "auto" }}>
        <Grid item xs={12} sm={6} className={classes.grid}>
          <p>JayeshChoudhary </p>
          <CopyrightIcon fontSize="small" />
          <span>2022</span>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.social}>
          <a
            href="https://www.linkedin.com/in/jayesh-choudhary-72444518b/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://jayeshchoudhary779.github.io/Portfolio.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <LanguageIcon />
          </a>
          <a
            href="https://www.instagram.com/insta__jc/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://github.com/jayesh2906"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.facebook.com/jayesh.choudhary.9461"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <FacebookIcon />
          </a>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
