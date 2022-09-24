import React, { useEffect, useState } from "react";
import MatchCard from "../MatchCard";
import { getMatches } from "../../api/Api";
import { Skeleton, Box } from "@mui/material";

const Schedule = () => {
  const [matchList, setMatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data from api
  useEffect(() => {
    getMatches()
      .then((data) =>
        setMatchList(
          data?.data?.matchList?.sort((b, a) => {
            return new Date(a.dateTimeGMT) - new Date(b.dateTimeGMT);
          })
        )
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "90vh" }}>
      {loading ? (
        <Box
          sx={{
            margin: "1rem auto",
            display: "flex",
            justifyContent: "center",
            width: "70%",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Skeleton variant="rectangular" width="100%" height="35vh" />
          <Skeleton variant="rectangular" width="100%" height="35vh" />
          <Skeleton variant="rectangular" width="100%" height="35vh" />
        </Box>
      ) : (
        matchList.map((match) => <MatchCard key={match.id} match={match} />)
      )}
    </div>
  );
};

export default Schedule;
