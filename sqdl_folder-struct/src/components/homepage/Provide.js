// import React from "react";
// import "./Provide.css";
// import logo from "../../images/question.png";
// function Provide() {
//   return (
//     <div className="mainContainer">
//       <h1 className="mainHeading">What We Provide</h1>
//       {/* <h1 className={styles.bgHeading}>What I Do</h1> */}
//       <div className="main">
//         <div className="mainElement">
//           <div className="element">
//             <img className="icons" src={logo} alt="" />
//             <h2 className="subHeading">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </h2>
//           </div>
//           <div className="element">
//             <img className="icons" src={logo} alt="" />
//             <h2 className="subHeading">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </h2>
//           </div>
//           <div className="element">
//             <img className="icons" src={logo} alt="" />
//             <h2 className="subHeading">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </h2>
//           </div>
//           <div className="element">
//             <img className="icons" src={logo} alt="" />
//             <h2 className="subHeading">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Provide;
import React from "react";
import styled from "styled-components";
import phone from "../img/phone.svg";
import hero from "../img/hero6.png";
import ring1 from "../img/ring_orange.svg";
import message1 from "../img/message_pink.svg";
import message2 from "../img/message_blue.svg";
import { Fade } from "react-reveal";

function Provide() {
  return (
    <div className="mainContainer">
      <HeaderContentStyled>
        <Fade left cascade>
          <div className="left-content">
            <div className="right-content">
              <img src={hero} alt="" className="phone" />
              {/* <img src={ring1} alt="" className="ring1" />
            <img src={message1} alt="" className="message1" />
            <img src={message2} alt="" className="message2" /> */}
            </div>
          </div>
        </Fade>
        <Fade right>
          <div className="right-content">
            <div className="left-text-container">
              <h1 className="headingpara">Student Query Driven Learning</h1>
              <p className="white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                molestiae minus dicta ipsum atque est qui vel illo magni
                voluptates esse, e x commodi corporis quos odio libero
                temporibus, eveniet nisi.
              </p>
            </div>
          </div>
        </Fade>
      </HeaderContentStyled>
    </div>
  );
}

const HeaderContentStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .left-content {
    display: flex;
    align-items: center;
    padding-right: 3rem;
    .white {
      color: black;
    }
    h1 {
      color: black;
      font-size: 4rem;
      font-weight: 800;
      @media screen and (max-width: 700px) {
        font-size: 3rem;
      }
    }

    .white {
      padding: 1.4rem 0;
      line-height: 1.8rem;
    }
    
  }

 .right-content {
    position: relative;
    display: flex;
    justify-content: center;
    .phone {
      width: 100%;
      position:relative;
      bottom:5rem;
    }
    .white {
      padding: 1.4rem 0;
      line-height: 1.8rem;
      width:80%;
    }
    h1 {
      color: black;
      font-size: 4rem;
      font-weight: 800;
      @media screen and (max-width: 700px) {
        font-size: 3rem;
      }
  }

  //Header Animations
  .message1 {
    @keyframes move {
      0% {
        transform: translateY(0) rotate(0) scale(1) translateX(0);
      }
      50% {
        transform: translateY(-10px) rotate(20deg) scale(1.1) translateX(10px);
      }
      100% {
        transform: translateY(0) rotate(0deg) scale(1) translateX(0);
      }
    }
    @keyframes move2 {
      0% {
        transform: translateY(0) rotate(0) scale(1) translateX(0);
      }
      50% {
        transform: translateY(-10px) rotate(60deg) scale(1.1) translateX(10px);
      }
      100% {
        transform: translateY(0) rotate(0deg) scale(1) translateX(0);
      }
    }
  }
`;

export default Provide;
