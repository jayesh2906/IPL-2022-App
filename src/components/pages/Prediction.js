import React, { useState } from "react";
import "./Prediction.css";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import bgnight from "../../assets/bgnight.jpg";
import bgday from "../../assets/bgday.jpg";

const teams = [
  "RCB",
  "CSK",
  "MI",
  "RR",
  "DC",
  "PBKS",
  "SRH",
  "LSG",
  "KKR",
  "GT",
  "TRY",
  "AGAIN",
];

const useStyles = makeStyles((theme) => ({
  arrow: {
    width: 0,
    height: 0,
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderTop: "50px solid",
    borderTopColor: "white",
    position: "absolute",
    left: "50%",
    top: "-1px",
    zIndex: "1",
  },
  container: {
    minHeight: "90vh",
    position: "relative",
    backgroundImage:
      theme.palette.mode === "light" ? `url(${bgday})` : `url(${bgnight})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "1rem 0",
  },
}));

const Prediction = () => {
  const classes = useStyles();
  const [name, setName] = useState("circle");

  const startRotate = () => {
    setName("circle start-rotate");
    setTimeout(() => {
      setName("circle start-rotate stop-rotate");
    }, Math.floor(Math.random() * (3000 - 2000 + 1) + 2000));
  };

  return (
    <div className={classes.container}>
      <div className={classes.arrow}></div>
      <ul className={name}>
        {teams.map((team) => (
          <li className="list" key={team}>
            <div className="text">{team}</div>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ marginTop: "2.5rem" }}
          onClick={startRotate}
          startIcon={<RotateRightIcon />}
        >
          Spin
        </Button>
      </div>
    </div>
  );
};

export default Prediction;
