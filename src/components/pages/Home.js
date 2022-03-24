import React from "react";
import rcb from "../../assets/rcb.jpg";
import csk from "../../assets/csk.jpg";
import mi from "../../assets/mi.jpg";
import kkr from "../../assets/kkr.jpg";
import dc from "../../assets/dc.jpg";
import gt from "../../assets/gt.jpg";
import lsg from "../../assets/lsg.jpg";
import srh from "../../assets/srh.jpg";
import rr from "../../assets/rr.jpg";
import pbks from "../../assets/pbks.jpg";
import trophy from "../../assets/trophy.jpg";
import ipl from "../../assets/ipl.jpg";
import "./Home.css";
import { ImageList, ImageListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const imageList = [
  { classes: "span1", src: gt },
  { classes: "span2", src: kkr },
  { classes: "span3", src: pbks },
  { classes: "span4", src: rr },
  { classes: "span5", src: dc },
  { classes: "span6", src: mi },
  { classes: "span7", src: csk },
  { classes: "span8", src: rcb },
];

const imageListMobile = [
  rcb,
  csk,
  mi,
  dc,
  ipl,
  rr,
  kkr,
  trophy,
  gt,
  pbks,
  lsg,
  srh,
];

const useStyles = makeStyles((theme) => ({
  gallery: {
    minHeight: "90vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.mode === "light" ? "#edf1fd" : "black",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  mobileGallery: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.mode === "light" ? "#edf1fd" : "black",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  imageList: {
    border:
      theme.palette.mode === "light" ? "3px solid black" : "3px solid white",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.gallery}>
        <div className="contain">
          {imageList.map(({ classes, src }) => (
            <span key={classes} className={classes}>
              <img src={src} alt="team image" fetchpriority="high" />
            </span>
          ))}
        </div>
      </div>
      <div className={classes.mobileGallery}>
        <ImageList
          sx={{ width: "86%", height: "85vh", overflowY: "hidden" }}
          cols={3}
          rowHeight={130}
          gap={4}
        >
          {imageListMobile.map((src, index) => (
            <ImageListItem key={index} className={classes.imageList}>
              <img src={src} alt="Team image" fetchpriority="high" />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );
};

export default Home;
