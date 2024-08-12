import { log } from "console";
import React from "react";
import main from "../assets/images/main.avif";
import  Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from "../Components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span>App
          </h1>
          <p>
            Welcome to Jobster! Your ultimate job tracking companion. Jobster
            simplifies your job search by helping you organize applications,
            track progress, and manage deadlines with ease. Stay on top of your
            job hunt with intuitive features, real-time updates, and
            personalized reminders. Elevate your job search experience with
            Jobster—where finding your next opportunity becomes a breeze.
          </p>
          <Link to="/register" className="btn btn-hero">Login/register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
