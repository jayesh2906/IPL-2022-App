import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import vs from "../assets/vs.png";
import {
  Divider,
  Card,
  Box,
  CardActions,
  CircularProgress,
  CardContent,
  DialogTitle,
  Button,
  Typography,
  CardHeader,
  Grid,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";
import { getMatchInfo } from "../api/Api";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
  cardstyle: {
    margin: "1rem auto",
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    border: "1px solid gray",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  vsImage: {
    width: "50%",
    height: "15vh",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  typography: {
    display: "block",
  },
  cardHeader: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

const MatchCard = ({ match }) => {
  const classes = useStyles();
  const [matchInfo, setMatchInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetching match detail
  const handleClickOpen = (id) => {
    setLoading(true);
    getMatchInfo(id).then((data) => setMatchInfo(data.data));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (matchInfo) {
      setLoading(false);
    }
  }, [matchInfo]);

  const ScoreDialog = () => (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Match Detail...</DialogTitle>
      {loading ? (
        <Box
          sx={{ display: "grid", placeItems: "center", marginBottom: "1rem" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DialogContent>
          <DialogContentText>
            <Typography component={"span"} className={classes.typography}>
              <b>Status:</b> {matchInfo.status}
            </Typography>
            <Typography component={"span"} className={classes.typography}>
              <b>Venue:</b> {matchInfo.venue}
            </Typography>
            {matchInfo.score && (
              <>
                <Typography component={"span"} className={classes.typography}>
                  <b>Toss Winner:</b> {matchInfo.tossWinner}
                </Typography>
                <Typography component={"span"} className={classes.typography}>
                  <b>Toss Choice:</b> {matchInfo.tossChoice}
                </Typography>
                <Divider />
                {matchInfo.score.length > 0 && (
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: ".5rem",
                      textAlign: "center",
                      fontWeight: "bold",
                      display: "block",
                    }}
                    component={"span"}
                  >
                    Score Card
                  </Typography>
                )}
                <Grid container spacing={2} alignItems="center">
                  {matchInfo.score.map(({ inning, r, w, o }, index, array) => (
                    <Grid key={inning} item xs={6}>
                      <Typography
                        component={"span"}
                        className={classes.typography}
                      >
                        <b>Team:</b>
                        {array[1 - index]["inning"].split(" ").at(0)}
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.typography}
                      >
                        <b>Run:</b>
                        {r}
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.typography}
                      >
                        <b>Wicket:</b> {w}
                      </Typography>
                      <Typography
                        component={"span"}
                        className={classes.typography}
                      >
                        <b>Over:</b> {o}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClose}
          startIcon={<CloseIcon sx={{ marginTop: "-3px" }} />}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  const ScheduleCard = () => (
    <Card key={match.id} variant="outlined" className={classes.cardstyle}>
      <CardHeader
        className={classes.cardHeader}
        title={match.name}
        subheader={`${match.date.split("-").reverse().join("-")}, ${
          new Date(match.dateTimeGMT).getHours() -
          7 +
          ":" +
          new Date(match.dateTimeGMT).getMinutes()
        }0 PM`}
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5} className={classes.gridItem}>
            <Typography variant="h5">{match.teams[0]}</Typography>
          </Grid>
          <Grid item xs={2} className={classes.gridItem}>
            <img
              className={classes.vsImage}
              src={vs}
              alt="vs image"
              loading="lazy"
              fetchpriority="high"
            />
          </Grid>
          <Grid item xs={5} className={classes.gridItem}>
            <Typography variant="h5">{match.teams[1]}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleClickOpen(match.id)}
          sx={{ mx: "auto", display: "flex", alignItems: "center" }}
          variant="contained"
          startIcon={<VisibilityIcon sx={{ marginTop: "-1px" }} />}
        >
          SHOW DETAIL
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <>
      <ScheduleCard />
      <ScoreDialog />
    </>
  );
};

export default MatchCard;
