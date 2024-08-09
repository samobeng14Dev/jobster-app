import { log } from "console";
import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="logo" className="logo" />
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
          <button className="btn btn-hero">Login/register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
const Wrapper=styled.main`
nav{
  width: var(--fluid-width);
  max-width: var(--max-width);
  height: var(--nav-height);
  display: flex;
  align-items: center;
}
.page{
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
  margin-top: -3rem;
}
h1{
  font-weight: 700;
  span{
    color: var(--clr-primary-5);
  }
  p{
    color: var(--clr-grey-600);
  }
  .main-img{
    display: none;
  }
}
`

export default Landing;
