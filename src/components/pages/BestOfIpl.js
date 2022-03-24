import React, { useEffect } from "react";
import { styled, Paper, Typography, Grid } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const videoList = [
  {
    src: "https://www.youtube.com/embed/yU1UUk2qWTo",
    animation: "zoom-in-down",
  },
  { src: "https://www.youtube.com/embed/iOqUSsDQO0s", animation: "zoom-in-up" },
  {
    src: "https://www.youtube.com/embed/nHkgH3hz5VY",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/_upV--0JfRU",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/LMz1ROd7P7g?start=10",
    animation: "zoom-in-up",
  },
  {
    src: "https://www.youtube.com/embed/5TfOE_dZqsQ",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/2LMAjqyhja0?start=13",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/nYfjRsHKw1M?start=5",
    animation: "zoom-in-up",
  },
  {
    src: "https://www.youtube.com/embed/ejx4QEP9h2E?start=13",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/sYoEofesPac",
    animation: "zoom-in-down",
  },
  { src: "https://www.youtube.com/embed/q0ZD1ItsTN8", animation: "zoom-in-up" },
  {
    src: "https://www.youtube.com/embed/-zXtUt5sV8M",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/adY9EFVWc1Q",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/EEenhrWt92Q?start=9",
    animation: "zoom-in-up",
  },
  {
    src: "https://www.youtube.com/embed/C4iLVrrnB2A",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/lIFodRLSdy0?start=12",
    animation: "zoom-in-down",
  },
  {
    src: "https://www.youtube.com/embed/Y797EVfDfxA?start=4",
    animation: "zoom-in-up",
  },
  {
    src: "https://www.youtube.com/embed/hv_MFT__hyY",
    animation: "zoom-in-down",
  },
];

const BestOfIpl = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div
      style={{ minHeight: "90vh", padding: "1rem 1rem", marginBottom: "2rem" }}
    >
      <Typography
        variant="h5"
        component="h2"
        align="center"
        sx={{ textDecoration: "underline", marginBottom: "1rem" }}
      >
        BEST OF IPL
      </Typography>

      <Grid container rowSpacing={3} spacing={3}>
        {videoList.map(({ src, animation }) => (
          <Grid data-aos={animation} key={src} item xs={12} sm={6} md={4}>
            <Item sx={{ height: "40vh" }}>
              <iframe
                width="100%"
                height="100%"
                src={src}
                title="YouTube video player"
                frameBorder="0"
                loading="lazy"
                fetchpriority="high"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
              ></iframe>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BestOfIpl;
