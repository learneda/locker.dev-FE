export const StyledSidebar = () => `
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
border-radius: 5px;
background: #fff;
position: fixed;
top: 105px;
width: 300px;
z-index: 200;

.user {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 18px 0;
  background-color: #4064f2;
  position: relative;
  height: 80px;
  margin-bottom: 50px;

  img {
    position: absolute;
    top: 30px;
    border: 3px solid #fff;
    border-radius: 50%;
    height: 100px;
    object-fit: cover;
    width: 100px;
  }
}

.user-bio {
  flex-direction: column;
  flex-wrap: wrap;
  padding: 15px 8%;
  margin: 0 auto;
  @media (max-width: 1350px) {
    width: 100%;
  }
  h3 {
    margin: 0 auto;
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  p {
    line-height: 25px;
    margin-bottom: 15px;
    img {
      width: 18px;
      height: 18px;
      margin-right: 5px;
      margin-bottom: -3px;
    }
  }

  mark {
    background-color: transparent;
    color: #333;
  }

  .follow-btn-grp {
   display: flex;
   justify-content: center;
    width: 100%;
    margin-bottom: 20px;
    button {
      padding: 5px 10px;
      font-weight: 700;
      border: transparent;
      border-radius: 5px;
      background-color: #3f65f2;
      color: white;
      cursor: pointer;
      transition: 200ms ease-out;
      font-size: 1.4rem;
    }
  }

  .edit-profile-link {
    margin-bottom: 3.5px;
    a {
      font-size: 1.4rem;
      font-weight: 700;
      color: #6d767e;
      transition: 200ms ease-out;

      &:hover {
        color: #3f65f2;
        transition: 200ms ease-in;
      }
    }
  }
}
.profile-stats {
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 1400px) {
    /* flex-direction: column; */
    flex-wrap: wrap;
  }
  a {
    margin-right: 12px;
    cursor: pointer;
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    cursor: pointer;
    transition: 200ms ease-out;
    :not(:last-child) {
      margin-right: 12px;
    }
    
    &:hover {
      color: #3f65f2;
      transition: 200ms ease-in;
      li:nth-of-type(2) {
        opacity: 1;
      }
    }
    li {
      font-size: 1.6rem;
    }
    li:nth-of-type(2) {
      opacity: 0.7;
      // text-align:center
      transition: 200ms ease-out;
    }
  }
.sidebar-followers {
  margin-right: 0px
}
}
.follow-stats-dropdown {
  position: absolute;
  top: 240px;
  left: 0;
  right: 0;
  background: #fff;
  width: 100%;
  overflow: auto;
  transition: 200ms height ease-in-out;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 0 0 5px 5px;
  .caret-up {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 3px;
    top: 10px;
    cursor: pointer;
  }
  a {
    margin: 15px 0;
    &:hover {
      h2 {
        opacity: 1;
        transition: 200ms ease-in;
      }
    }
  }
  .follow {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
  h2 {
    font-size: 1.8rem;
    opacity: 0.7;
    transition: 200ms ease-out;
  }
}
`
