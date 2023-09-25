// import React, { useState } from "react";
// import CountUp from "react-countup";
// import logo1 from "../../images/org.png";
// import logo2 from "../../images/teacher.png";
// import logo3 from "../../images/student.png";
// import "./Counter.css";
// import ScrollTrigger from "react-scroll-trigger";
// function Counter() {
//   const [counterOn, setCounterOn] = useState(false);
//   return (
//     <ScrollTrigger
//       onEnter={() => setCounterOn(true)}
//       onExit={() => setCounterOn(false)}
//     >
//       <div
//         style={{
//           width: "100%",
//           background: "black",
//           marginTop: "10px",
//           color: "white",
//           padding: "50px",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "2rem",
//             fontWeight: "600",
//             textAlign: "center",
//           }}
//         >
//           Trusted by &nbsp;
//           {counterOn && <CountUp start={0} end={100} duration={2} delay={0} />}+
//           Organisations &nbsp;&nbsp;
//           {counterOn && <CountUp start={0} end={500} duration={2} delay={0} />}+
//           Teachers &nbsp;&nbsp;
//           {counterOn && <CountUp start={0} end={1000} duration={2} delay={0} />}
//           + Students
//         </h1>
//       </div>
//       <div className="mainContainer">
//         <h1 className="mainHeading">Trusted By</h1>
//         {/* <h1 className={styles.bgHeading}>What I Do</h1> */}
//         <div className="main">
//           <div className="mainElement">
//             <div className="element">
//               <img className="icons" src={logo1} alt="" />
//               <h1 className="counterText">
//                 {counterOn && (
//                   <CountUp start={0} end={100} duration={2} delay={0} />
//                 )}
//                 + Colleges
//               </h1>
//             </div>
//             <div className="element">
//               <img className="icons" src={logo2} alt="" />
//               <h1 className="counterText">
//                 {counterOn && (
//                   <CountUp start={0} end={500} duration={2} delay={0} />
//                 )}
//                 + Teachers
//               </h1>
//             </div>
//             <div className="element">
//               <img className="icons" src={logo3} alt="" />
//               <h1 className="counterText">
//                 {counterOn && (
//                   <CountUp start={0} end={1000} duration={2} delay={0} />
//                 )}
//                 + Students
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ScrollTrigger>
//   );
// }

// export default Counter;
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

// export default Provide
