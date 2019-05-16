export const StyledEditModal = () =>
  `width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20000;
    overflow: auto; 
    .close-modal-x {
      position: absolute;
      top: 10px;
      right: 15px;
      color: red;
      font-size: 6rem;
      cursor: pointer;
      opacity: 0.9;
      transition: 200ms ease-out;
     
    img {
      width: 35px;
      height: 35px;
    }
      &:hover {
        opacity: 1;
        transition: 200ms ease-in;
      }
    }
    .edit-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 700px;
      width: 90%;
      margin: 80px auto;
      color: #444;
      background: #fff;
      padding-bottom: 10px;
      border-radius: 15px;
      position: relative;
      @media (max-width: 650px) {
        margin: 60px auto;
      }
    }
    .edit-form input,
    .edit-form label,
    #post-description {
      width: 95%;
      margin: auto;
      border-radius: 6px;
    }
    .edit-form input {
      border: none;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 1.6rem;
      border: 1px solid lightgrey;
      &:focus {
        outline: none;
      }
    }
    #edit-submit {
      background: #4163f2;
      border: none;
      color: #fff;
      padding: 10px 5px;
      border-radius: 6px;
      margin: 10px auto;
      font-size: 1.8rem;
      cursor: pointer;
    }
    .edit-form label {
      margin-bottom: 3px;
      font-size: 1.6rem;
    }
    .form-title {
      text-align: center;
      background: #4163f2;
      color: #fff;
      padding: 15px;
      margin-bottom: 15px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      h3 {
        font-size: 2.1rem;
      }
    }
    #post-description {
      margin-bottom: 10px;
      resize: none;
      padding: 10px;
      font-size: 1.6rem;
      font-family: inherit;
      border: 1px solid lightgrey;
      &:focus {
        outline: none;
      }
    }
  `
