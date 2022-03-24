const API_KEY = "f5b756e1-b13e-4073-8298-3f3b6ca5567d";

// Fetching match info from "cricketdata" Rest Api
export const getMatches = () => {
  const url = `https://api.cricapi.com/v1/series_info?apikey=${API_KEY}&offset=0&id=47b54677-34de-4378-9019-154e82b9cc1a`;

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log("ERROR", err));
};

export const getMatchInfo = (id) => {
  const url = `https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${id}`;

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log("ERROR", err));
};
