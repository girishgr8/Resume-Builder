import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { Box, Button, Divider, Paper } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carousel1 from "../static/carousel1.png";
import carousel2 from "../static/carousel2.png";
import carousel3 from "../static/carousel3.png";
import carousel4 from "../static/carousel4.png";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Box>
        <Carousel
          responsive={responsive}
          infinite={true}
          showDots={true}
          autoPlay={true}
          autoPlaySpeed={3000}
        >
          <Paper>
            <img src={carousel1} height={400} width={400}></img>
          </Paper>
          <Paper>
            <img src={carousel2} height={400} width={400}></img>
          </Paper>
          <Paper>
            <img src={carousel3} height={400} width={400}></img>
          </Paper>
          <Paper>
            <img src={carousel4} height={400} width={400}></img>
          </Paper>
        </Carousel>
      </Box>
      <Divider></Divider>

      <br/><br/>
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="primary"
          // style={{ "&:hover": { backgroundColor: "transparent" } }}
        >
          Sign Up
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </main>
    </div>
  );
};

export default Home;
