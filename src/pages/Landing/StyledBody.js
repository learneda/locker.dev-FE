export const Feature = () => ` 
padding: 70px 0;
img {
  width: 80%;
}
@media (max-width: 500px) {
  padding: 35px 0;
}

.try-learnlocker {
  margin: 120px 0;
  @media(max-width: 960px) {
    margin: 80px 0;
  }
   @media(max-width: 960px) {
    margin: 80px 0;
  }
  @media(max-width: 768px) {
    margin: 50px 0;
  }
  @media(max-width: 500px) {
    margin: 20px 0;
  }
  h2 {
    margin-bottom: 40px;
    font-size: 4rem;
    font-weight: 700;
    line-height: 50px;
  }
  .create-acct-btn {
    font-size: 2.5rem;
    cursor: pointer;
  }
}
`;

export const FeatureTitle = () => `
font-size: 5rem;
  font-weight: 500;
  line-height: 3.5rem;
  @media (max-width: 1015px) {
    line-height: 1.3;
  }
  @media (max-width: 500px) {
    font-size: 3.5rem;
    margin-bottom: 40px;
  }
`;

export const FeaturesContainer = () => `
display: flex;
justify-content: space-between;
flex-wrap: wrap;
@media (max-width: 1100px) {
  justify-content: space-around;
}
.feature-card {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 32%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background: #fff;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 30px;
  @media (max-width: 1100px) {
    width: 45%;
  }
}
img {
  width: 200px;
}
h4 {
  font-size: 2.4rem;
  max-width: 80%;
  text-align: center;
  margin: 20px 0;
}
@media (max-width: 500px) {
  flex-direction: column;
  .feature-card {
    width: 90%;
    margin: auto;
    margin-bottom: 30px;
  }
}
`;

export const StyledCallToAction = () => `
min-height: 82vh;
  padding: 0px 0;
  display: flex;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .landing-img {
    width: 50%;
    @media (max-width: 992px) {
      width: 80%;
    }
    @media (max-width: 900px) {
      width: 95%;
    }
  }
  .landing-content {
    width: 60%;
    margin-top: 50px;
    margin-right: 10px;

    @media (max-width: 1450px) {
      margin-top: 30px;
    }

    @media (max-width: 1280px) {
      margin-top: 20px;
    }

    @media (max-width: 992px) {
      margin: 20px 0 40px;
      width: 80%;
      .get-started {
        vertical-align: super;
        margin-left: 20px;
        padding: 15px 18px;
      }
    }
    @media (max-width: 900px) {
      width: 95%;
    }
    @media (max-width: 650px) {
      width: 85%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .get-started {
      @media (max-width: 650px) {
        padding: 10px;
        font-size: 1.6rem;
        width: 100%;
        margin-left: 0;
      }
    }
  }
  h1 {
    padding-bottom: 45px;
    font-size: 8rem;
    line-height: 8.5rem;
    font-weight: 700;
    @media (max-width: 1450px) {
      font-size: 7rem;
    }
    @media (max-width: 1280px) {
      font-size: 6rem;
    }
    @media (max-width: 992px) {
      display: inline;
    }
    @media (max-width: 768px) {
      font-size: 6rem;
      line-height: 7rem;
    }
    @media (max-width: 650px) {
      font-size: 5.5rem;
      padding-bottom: 10px;
      text-align: center;
    }
    @media (max-width: 580px) {
      font-size: 4.7rem;
      line-height: 6rem;
    }
    @media (max-width: 500px) {
      font-size: 3.8rem;
      line-height: 5rem;
      /* padding-bottom: 20px; */
    }
    @media (max-width: 370px) {
      font-size: 3.2rem;
      line-height: 4.5rem;
    }
  }
  .landing-video {
    width: 100%;
    border: 3px solid #fff;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .landing-img img {
    width: 100%;
    margin-bottom: -7px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .down-arrow {
    position: absolute;
    bottom: 20px;
    width: 50px;
    left: 50%;
    transform: translateX(50%);
    animation: bounce 2s infinite;
    cursor: pointer;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

export const StyledFooter = () => `
width: 100%;
display: flex;
justify-content: space-between;
padding: 50px 0;

@media (max-width: 588px) {
  justify-content: flex-start;
  flex-direction: column;
}

.footer-links {
  width: 600px;

  @media (max-width: 805px) {
    width: 350px;
  }
  @media (max-width: 680px) {
    width: 300px;
  }

  nav {
    display: flex;
    width: 100%;
    justify-content: space-between;

    @media (max-width: 688px) {
      justify-content: flex-start;
      flex-direction: column;
    }

    a {
      width: 40%;
      cursor: pointer;

      @media (max-width: 588px) {
        margin-bottom: 2rem;
      }
    }
  }
}

.copyright-text {
  @media (max-width: 588px) {
    margin-bottom: 1.5rem;
  }
}
`;
