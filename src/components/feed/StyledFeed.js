export const StyledFeed = () =>
  `
  .post {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 0 1px 40px;
  border-radius: 8px;
  background: #fff;
}
.post-user-info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid lightgray;
  .post-user-pic {
    height: 60px;
    width: 60px;
    margin-right: 15px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  
    @media(max-width: 500px) {
      height: 40px;
      width: 40px;
      align-self: flex-start;
      img {
        height: 40px;
        width: 40px;
      }
    }
  }

  h2 {
    margin-bottom: -5px;
    font-size: 1.7rem;
    font-weight: 500;
    @media(max-width: 500px) {
      font-size: 1.5rem;
    }
  }
  .post-date {
    font-size: 1.4rem;
    opacity: 0.8;
    font-weight: normal;
    margin-left: 7px;
    @media(max-width: 500px) {
      font-size: 1.3rem;
    }
  }
  .post-thoughts {
    margin-top: 3px;
    font-size: 2rem;
    @media(max-width: 500px) {
      font-size: 1.7rem;
      line-height: 1.25;
    }
  }
}
.post-content {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgrey;
  img {
    max-height: 500px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.title-and-description {
  padding: 15px 25px;
  @media(max-width: 600px) {
    padding: 15px 10px;
  }
  h2 {
    margin-bottom: 10px;
    font-size: 2.6rem;
    // font-weight: 500;
    opacity: 0.8;
    transition: 100ms ease-out;
    line-height: 1.3;
    @media(max-width: 500px) {
      font-size: 1.8rem;
      margin-bottom: 5px;
    }
    &:hover {
      opacity: 1;
      transition: 100ms ease-in;
    }
    @media(max-width: 960px) {
      font-size: 2.4rem;
    }
    @media(max-width: 650px) {
      font-size: 2rem;
    }
  }
  p {
    opacity: 0.8;
    line-height: 1.6;
    @media(max-width: 500px) {
      font-size: 1.6rem;
    }
  }
  .post-root-url {
    display: inline-block;
    opacity: 0.8;
    margin-bottom: 10px;
    font-size: 1.7rem;
    &:hover {
      opacity: 1;
    }
    @media(max-width: 500px) {
      font-size: 1.6rem;
    }
  }
}
i {
  cursor: pointer;
  min-width: 42px;
  max-width: 42px;
  span {
    margin-left: 5px;
    height: 20px;
    font-family: Roboto, sans-serif;
    font-size: 2rem;
  }
}
.likes-and-save {
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-bottom: 10px;
  @media(max-width: 600px) {
    justify-content: space-between;
    margin: 0 10px 10px;
   }
}
.like_num {
  margin-left: -15px;
}
.save {
  display: flex;
  margin-left: 30px;
  cursor: pointer;
  &:hover {
    h3 {
      opacity: 1;
      transition: 200ms ease-in;
    }
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  h3 {
    opacity: 0.8;
    font-size: 1.7rem;
    transition: 200ms ease-out;
  }
}
.heart-red {
  color: #e94856;
  /* background: rgba(255, 0, 0, 0.4); */
  width: 15.99px;
  /* border-radius: 9px; */
}
`
