import React, { useEffect, useState } from "react";
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
import { styled, Grid, Paper, Skeleton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const teamImage = [
  { name: "rcb", src: rcb },
  { name: "csk", src: csk },
  { name: "mi", src: mi },
  { name: "kkr", src: kkr },
  { name: "dc", src: dc },
  { name: "gt", src: gt },
  { name: "lsg", src: lsg },
  { name: "srh", src: srh },
  { name: "rr", src: rr },
  { name: "pbks", src: pbks },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "90vh",
    padding: "1rem 2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 1rem",
    },
  },
}));

const CreateXi = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className={classes.container}>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {teamImage.map(({ name, src }) => (
          <Grid key={name} item md={3} sm={4} xs={6}>
            {loading ? (
              <>
                <Skeleton variant="square" width="100%" height="40vh" />
              </>
            ) : (
              <Item>
                <img
                  src={src}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="team image"
                  fetchpriority="high"
                  loading="lazy"
                />
                <Button
                  onClick={() => navigate(`/selectxi/${name}`)}
                  size="small"
                  variant="contained"
                >
                  CREATE {name} XI
                </Button>
              </Item>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CreateXi;
