export const StyledAuth = () =>
`
    /* background: inherit; */
    /* width: 450px;
    height: 550px; */
    position: fixed;
    overflow: hidden;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 200000;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: flex-start;
    transition: 400ms;
    animation: 400ms fadeIn;

  @media (max-width: 768px) {
      justify-content: center;
      align-items: center;
      position: fixed;
      /* overflow-y: scroll; */
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .modal-fadeout {
    animation: 400ms fadeOut;
  }
  
  .login-content {
    position: relative;
    color: #fff;
    background: #fff;
    border-radius: 7px;
    transition: 400ms ease-in-out;
    margin-top: 8%;
  }
  @media (max-width: 768px) {
    .login-content {
      /* margin-top: 15%; */
      width: 90%;
      margin-top: 0%;
      /* border-radius: 5px; */
    }
  }
  .login-content span {
    padding: 20px;
    width: 187px;
    text-align: center;
    font-size: 1.4rem;
    opacity: 0.9;
    color: #222;
    cursor: pointer;
    font-weight: 600;
    display: inline-block;
  }
  @media (max-width: 768px) {
    .login-content span {
      width: 50%;
    }
  }
  
  .login-content .not-current-view {
    opacity: 0.7;
    transition: 200ms ease-out;
    background: rgb(226, 226, 226);
    border: 1px solid #999;
    /* border-top-left-radius: 7px; */
  }
  #sign-up {
    border-top-left-radius: 7px;
  }
  #log-in {
    border-top-right-radius: 7px;
  }
  
  .login-content .not-current-view:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
  
  .login-content form {
    display: flex;
    flex-direction: column;
    margin: auto;
    -webkit-appearance: none;
    padding: 28px 5px 10px 5px;
  }
  @media (max-width: 768px) {
    .login-content form {
      max-width: 1000px;
      padding: 28px 0px;
    }
  }
  .login-content form label {
    margin-bottom: 7px;
    /* color: #bebebe; */
    color: #999;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    .login-content form label {
      width: 90%;
      margin: auto;
      margin-bottom: 7px;
    }
  }
  .login-content form input {
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 10px;
    /* background: rgba(255, 255, 255, 0.1); */
    -webkit-appearance: none;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    .login-content form input {
      width: 90%;
      margin: auto;
      margin-bottom: 20px;
    }
  }
  .login-content form input:valid {
    border: 1px solid #4163f2;
    opacity: 1;
  }
  
  #submit {
    margin-top: 10px;
    background-color: #4163f2;
    color: #fff;
    padding: 14px;
    font-size: 1rem;
    letter-spacing: 0.08rem;
    cursor: pointer;
    -webkit-appearance: none;
  }
  @media (max-width: 768px) {
    .login-content form #submit {
      width: 90%;
      margin: auto;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
  
  .form-oauth-providers {
    width: 100%;
    margin: auto;
    text-align: center;
    padding: 20px;
    padding-top: 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms ease-out;
    margin-bottom: 4px;
  }
  .form-oauth-providers a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 5px;
    background: rgb(226, 226, 226);
  }
  .form-oauth-providers:hover {
    opacity: 1;
    transition: 200ms ease-in;
  }
  .form-oauth-providers p {
    text-align: center;
    margin-left: 7px;
    color: #222;
    font-size: 2rem;
  }
  .form-oauth-providers img {
    max-width: 55px;
  }
  
  .close-modal {
    position: absolute;
    right: -60px;
    color: red;
    top: -10px;
    font-size: 6rem;
    cursor: pointer;
  }
  .close-modal img {
    width: 35px;
    height: 35px;
    opacity: 0.9;
    transition: 200ms ease-out;
  }
  .close-modal img:hover {
    transition: 200ms ease-in;
    opacity: 1;
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    .close-modal {
      right: 0px;
      top: -60px;
      /* top: 0;
      right: 20px;
      font-size: 4rem;
      z-index: 100000; */
    }
  }
`