export const StyledBookmarks = () =>
  `
display: flex;
margin-top: 20px;
margin-bottom: 35px;
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
border-radius: 6px;
background-color: #fff;
max-height: 250px;
height: 220px;
position: relative;
.date-like-heart {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 12px;
  justify-content: space-between;
  // min-width: 330px;
  width: 300px;
  @media (max-width: 450px) {
    width: 90%;
   }
  @media (max-width: 390px) {
   width: 100%;
   left: 4px;
  }
}

@media (max-width: 1450px) {
  /* max-height: initial; */
  height: 220px;
}
@media (max-width: 1250px) {
  flex-direction: column;
  max-height: none;
  height: 100%;
}
.delete-icon {
  cursor: pointer;
  // opacity: 0.8;
  width: 17px;
  height: 17px;
  margin-right: 5px;
}
.like {
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: 200ms ease-out;
  margin-right: 5px;
  // opacity: 0.8;
}
a {
  text-decoration: none;
  color: #444;
}
.post-content {
  margin: 0 5px;
  padding: 15px;
  // position: relative;
  @media (max-width: 450px) {
     position: relative;
    }
}

img {
  border-radius: 6px 0 0px 6px;
  width: 320px;
  height: 100%;
  object-fit: cover;

  @media (max-width: 1500px) {
    width: 270px;
  }
  @media (max-width: 1250px) {
    max-width: 100%;
    max-height: 400px;
    width: 100%;
    border-radius: 6px;
    border-radius: 6px 6px 0 0;
  }
}
p {
  max-width: 600px;
  margin: 10px 0 0;
  font-size: 1.5rem;
  word-break: break-word;
  line-height: 1.5;
  /* border: 1px solid lightblue; */
  // height: 70px;
  @media (max-width: 1250px) {
    margin: 10px 0 0;
  }
  @media (max-width: 960px) {
    max-width: initial;
  }
  @media (max-width: 450px) {
    // margin-bottom: 25px;
  }
}
.post-root-url {
  display: inline-block;
  opacity: 0.8;
  margin-bottom: 30px;
  font-size: 1.5rem;
  &:hover {
    opacity: 1;
  }
}
h1 {
  margin: 0px auto;
  font-size: 2.3rem;
  font-weight: 700;
  max-width: 600px;
  line-height: 1.2;
  margin-right: 10px;
  /* border: 1px solid pink; */
  max-height: 55px;
  overflow: hidden;

  @media (max-width: 1250px) {
    margin: 0;
  }
  @media (max-width: 960px) {
    max-width: initial;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
    max-height: 50px;
  }
  @media (max-width: 450px) {
   margin-right: 20px;
  }
}
.formatted-date {
  font-size: 1.2rem;
  opacity: 0.8;
  position: relative;
  // margin-right: 30px;
}
.edit-modal {
  height: 100vh;
  width: 100vw;
}
.edit-icon {
  position: absolute;
  right: 15px;
  bottom: 12px;
  width: 25px;
  cursor: pointer;
  height: 25px;
  // z-index: 1; 
  background: #fff;
  img {
    height: 25px;
    width: 25px;
  }
  @media (max-width: 450px) {
  top: 10px;
  right: 10px;
  }
}

.rec-span {
  margin-right: 15px;
  // opacity: 0.8;
  font-size: 1.2rem;
}

.del-span {
  margin-right: 5px;
  // opacity: .8;
  font-size: 1.2rem;
}
.save-to-profile {
  display: flex;
  cursor: pointer;
  opacity: 0.8;
  transition: 200ms ease-out;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
  .add-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 5px;
    }
}
.share-to-feed {
  display: flex;
  // margin-right: 20px;
  opacity: 0.8;
  transition: 200ms ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
align-items: center;
  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  span {
    font-size: 1.2rem;
  }
}
.delete-bookmark {
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: 200ms ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
}

`;
