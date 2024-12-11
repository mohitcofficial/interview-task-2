import React from "react";
import classes from "./HomePage.module.css";
import Header from "../../components/header/Header";
import BlogSection from "../../components/BlogSection";

function HomePage() {
  return (
    <div className={classes.container}>
      <Header />
      <BlogSection />
    </div>
  );
}

export default HomePage;
