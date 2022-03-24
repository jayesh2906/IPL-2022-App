import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Alert,
  AlertTitle,
  Box,
  DialogContent,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  Slide,
  Snackbar,
  Skeleton,
} from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import wicket from "../../assets/wicket.png";
import batsman from "../../assets/batsman.png";
import allrounder from "../../assets/allrounder.png";
import bowler from "../../assets/bowler.png";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  playerGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.mode === "light" ? "#c4c4c4" : "grey",
    marginLeft: "1rem",
    marginBottom: "1rem",
    borderRadius: ".3rem",
    justifyContent: "space-between",
  },
  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    background: "whitesmoke",
    borderRadius: "50%",
  },
  checkBox: {
    cursor: "not-allowed",
    "&$checkBox": {
      color: "red",
    },
  },
  counter: {
    background: "green",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    padding: ".6rem",
    color: "white",
    fontWeight: "bold",
  },
}));

const SelectXi = () => {
  const [loading, setLoading] = useState(true);
  const { team } = useParams();
  const classes = useStyles();
  const [squad, setSquad] = useState([]);
  const [open, setOpen] = useState(false);
  const [playingXi, setPlayingXi] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (squad.length > 0) {
      setLoading(false);
    }
  }, [squad]);

  // Fetching squad detail
  useEffect(() => {
    const selectedSquad = JSON.parse(localStorage.getItem(`${team}`) || "[]");
    if (selectedSquad.length > 0) {
      setPlayingXi(true);
      setSquad(selectedSquad);
    } else {
      fetch("https://ipl-squad-server.herokuapp.com/teams")
        .then((response) => response.json())
        .then((data) => setSquad(data[team]))
        .catch((err) => console.log("ERROR", err));
    }
  }, []);

  // Validation of create xi rules
  const handleChange = (player, event) => {
    const updatedSquad = squad.map((defaultPlayer) =>
      defaultPlayer.name === player.name
        ? { ...defaultPlayer, isSelected: event.target.checked }
        : defaultPlayer
    );
    if (updatedSquad.filter((player) => player.isSelected).length > 11) {
      setMessage("Maximum 11 players allowed");
      setOpen(true);
      return;
    }

    if (
      updatedSquad.filter(
        (player) => player.role === "WK-Batsman" && player.isSelected
      ).length > 2
    ) {
      setMessage("Maximum 2 Wicket-keepers allowed");
      setOpen(true);
      return;
    }

    if (
      updatedSquad.filter(
        (player) => player.role === "Batsman" && player.isSelected
      ).length > 5
    ) {
      setMessage("Maximum 5 Batsmen allowed");
      setOpen(true);
      return;
    }

    if (
      updatedSquad.filter(
        (player) => player.role === "All-rounder" && player.isSelected
      ).length > 3
    ) {
      setMessage("Maximum 3 All-rounders allowed");
      setOpen(true);
      return;
    }

    if (
      updatedSquad.filter(
        (player) => player.role === "Bowler" && player.isSelected
      ).length > 5
    ) {
      setMessage("Maximum 5 Bowlers allowed");
      setOpen(true);
      return;
    }

    if (
      updatedSquad.filter(
        (player) => player.Nation === "Foreign" && player.isSelected
      ).length > 4
    ) {
      setMessage("Maximum 4 Overseas allowed");
      setOpen(true);
      return;
    }
    setSquad(updatedSquad);
  };

  // Validation of create xi rules and saving team
  const handleSaveTeam = () => {
    if (squad.filter((player) => player.isSelected).length !== 11) {
      setMessage("You must select 11 players");
      setOpen(true);
      return;
    }
    if (
      squad.filter(
        (player) => player.role === "WK-Batsman" && player.isSelected
      ).length < 1
    ) {
      setMessage("You must select atleast 1 Wicket-keeper");
      setOpen(true);
      return;
    }
    if (
      squad.filter((player) => player.role === "Batsman" && player.isSelected)
        .length < 3
    ) {
      setMessage("You must select atleast 3 Batsmen");
      setOpen(true);
      return;
    }
    if (
      squad.filter(
        (player) => player.role === "All-rounder" && player.isSelected
      ).length < 1
    ) {
      setMessage("You must select atleast 1 All-rounder");
      setOpen(true);
      return;
    }
    if (
      squad.filter((player) => player.role === "Bowler" && player.isSelected)
        .length < 3
    ) {
      setMessage("You must select atleast 3 Bowlers");
      setOpen(true);
      return;
    }
    localStorage.setItem(`${team}`, JSON.stringify(squad));
    setPlayingXi(true);
    setOpenSnackBar(true);
  };

  // Delete saved team
  const handleDelete = () => {
    setPlayingXi(false);
    const updatedSquad = squad.map((player) =>
      player.captain ? player : { ...player, isSelected: false }
    );
    setSquad(updatedSquad);
    localStorage.removeItem(`${team}`);
  };

  const SnackBar = () => (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={3000}
      onClose={() => {
        setOpenSnackBar(false);
      }}
    >
      <Alert
        onClose={() => {
          setOpenSnackBar(false);
        }}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        <span style={{ textTransform: "uppercase" }}>{team}</span> Playing Xi
        saved successfully!
      </Alert>
    </Snackbar>
  );

  const MessageDialog = () => (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => {
        if (reason && reason == "backdropClick") return;
        setOpen(false);
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
        <ErrorIcon
          color="primary"
          sx={window.innerWidth < 550 && { display: "none" }}
        />
        {message}
      </DialogTitle>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
          }}
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );

  const PlayersGrid = () => (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: "1rem",
            mx: "auto",
          }}
        >
          {[...Array(15)].map(() => (
            <Skeleton
              key={Math.random()}
              variant="rectangular"
              width={window.innerWidth > 550 ? "20%" : "92%"}
              height="25vh"
            />
          ))}
        </Box>
      ) : (
        squad.map((player) => (
          <Grid
            item
            lg={2}
            md={3}
            sm={4}
            key={player.name}
            xs={12}
            className={classes.playerGrid}
          >
            <img
              src={
                player.role === "Batsman"
                  ? batsman
                  : player.role === "Bowler"
                  ? bowler
                  : player.role === "WK-Batsman"
                  ? wicket
                  : allrounder
              }
              className={classes.image}
              alt="team image"
              loading="lazy"
              fetchpriority="high"
            />
            <Typography
              sx={{
                marginTop: ".5rem",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {player.name}
              {player.Nation === "Foreign" && (
                <AirplanemodeActiveIcon fontSize="small" />
              )}
            </Typography>
            <Checkbox
              checked={player.isSelected}
              disabled={player.captain}
              className={player.captain ? classes.checkBox : ""}
              onChange={(event) => handleChange(player, event)}
            />
          </Grid>
        ))
      )}
    </Grid>
  );

  const ButtonsGroup = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto",
        gap: ".5rem",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate(`/createxi`)}
        startIcon={window.innerWidth > 400 && <ArrowBackIcon />}
      >
        {window.innerWidth > 400 ? "Go Back" : "Back"}
      </Button>
      <Typography className={classes.counter}>
        {squad.filter((player) => player.isSelected).length}/11
      </Typography>
      <Button
        variant="contained"
        onClick={handleSaveTeam}
        startIcon={window.innerWidth > 400 && <LibraryAddIcon />}
      >
        {window.innerWidth > 400 ? "Save Team" : "Save"}
      </Button>
    </div>
  );

  const AlertRules = () =>
    loading ? (
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={window.innerWidth > 550 ? "12vh" : "0vh"}
        />
      </Box>
    ) : (
      <Alert severity="info" variant="outlined">
        <AlertTitle>Rules to follow</AlertTitle>
        <span>
          You can select 1-2 Wicket-keeper, 3-5 Batsman, 1-3 All-rounder, 3-5
          Bowler and max 4 Overseas player.
        </span>
      </Alert>
    );

  return (
    <div style={{ minHeight: "90vh", padding: "1rem 3rem" }}>
      {playingXi ? (
        <>
          <Dialog
            open={playingXi}
            TransitionComponent={Transition}
            keepMounted
            onClose={(event, reason) => {
              if (reason && reason == "backdropClick") return;
              setPlayingXi(false);
            }}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
          >
            <DialogTitle
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                textTransform: "uppercase",
                justifyContent: "center",
              }}
            >
              <SportsCricketIcon color="primary" /> {team} playing xi
            </DialogTitle>

            <DialogContent>
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                {squad
                  .filter((player) => player.isSelected)
                  .map((player) => (
                    <Grid
                      item
                      md={3}
                      sm={4}
                      xs={12}
                      key={player.name}
                      className={classes.playerGrid}
                    >
                      <img
                        src={
                          player.role === "Batsman"
                            ? batsman
                            : player.role === "Bowler"
                            ? bowler
                            : player.role === "WK-Batsman"
                            ? wicket
                            : allrounder
                        }
                        className={classes.image}
                        alt="team image"
                        loading="lazy"
                        fetchpriority="high"
                      />
                      <Typography
                        sx={{
                          marginTop: ".5rem",
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        {player.name}
                        {player.Nation === "Foreign" && (
                          <AirplanemodeActiveIcon fontSize="small" />
                        )}
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  setPlayingXi(false);
                }}
                startIcon={
                  <EditIcon fontSize="small" sx={{ marginTop: "-2px" }} />
                }
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={handleDelete}
                startIcon={
                  <DeleteIcon fontSize="small" sx={{ marginTop: "-3px" }} />
                }
              >
                Delete
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setPlayingXi(false);
                }}
                startIcon={
                  <CancelIcon fontSize="small" sx={{ marginTop: "-2px" }} />
                }
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <AlertRules />
          <PlayersGrid />
          <ButtonsGroup />
        </>
      )}
      <MessageDialog />
      <SnackBar />
    </div>
  );
};

export default SelectXi;
