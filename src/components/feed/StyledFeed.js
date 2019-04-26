export const StyledFeed = () =>
  ` 
  .post {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 40px;
  border-radius: 8px;
  background: #fff;
}
.post-user-info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid lightgray;
  a {
    height: 60px;
    width: 60px;
    margin-right: 15px;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  h2 {
    font-weight: 500;
    margin-bottom: -5px;
  }
  .post-date {
    font-size: 1.3rem;
    opacity: 0.8;
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
    font-weight: 500;
    line-height: 1.3;
  }
  p {
    opacity: 0.8;
    line-height: 1.6;
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
`;
