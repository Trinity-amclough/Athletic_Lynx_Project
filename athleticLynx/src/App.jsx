// import { useState } from 'react'
import './App.css'

// function Section(props) {
//   return (
//     <p>{props.uno}</p>
//     <p>{props.dos}</p>
//     <p>{props.tres}</p>
//   )
// }

// function Date(props) {
//   return (
//     <div className="individualDate">
//       <span>{props.description}</span>
//     </div>
//   )
// }
// function History(props) {
//   return (
//     <div className="individualHistory"> 
//       <span>{props.description}</span>
//     </div>
//   )
// }
function Section(props) {
  return (
    <div className="historySections">
      <h2 className="subtitles">{props.title}</h2>
      <div style={{paddingInline: "10px"}}>
        {props.records.map(([date,history], index) => (
            <p key={index}>On {date}, User {history}</p>
        ))}
      </div>
    </div>
  )
}
function App() {
  return (
    <div className='profilePage'>
      {/* may make a header */}
      <div className='profileInfo'>
        <div className='pfp'>Profile Photo</div>
        <div className='userInfo'>
          <span style={{fontSize: '40px', marginBlock: '5px'}}>User's Name</span>
          <span style={{paddingInline: "10px"}}>Located: User's Current City</span>
          <span style={{paddingInline: "10px"}}>Position: User's Current Position</span>
        </div>
        <div className='contact'>
          <span style={{fontSize: '35px', marginBlock: "5px" }}>Contact Info</span>
          <span style={{paddingInline: "10px"}}>Email: exampleEmail@gmail.com</span>
          <span style={{paddingInline: "10px"}}>Phone Number: (555)-555-5555</span>

          
          <p></p>
          <p></p>
        </div>
      </div>

      <div className='history'>
          <div className='historyBar'>
            <span style={{fontSize: '56px'}}>HISTORY</span>
            {/* Taskbar? */}
            <button className='editButton'>Edit History</button>
          </div>
          <div>
            <Section title="TEAM HISTORY:" 
            records={[["5/5/2025","joined Second Arbitrary Team"], 
              ["5/4/2025", "left First Arbitrary Team"], 
              ["3/6/2019", "joined First Arbitrary Team"]]}>
            </Section>
            <Section title="RECORD HISTORY:" 
              records={[["7/28/2024","set a new personal record for highest jump at 2.1 meters"],
               ["1/3/2022","set a new personal record for fastest 100 meter dash at 29.9 seconds"], 
               ["11/23/2020","set a new personal record for their lift weight at 320 lbs"], 
               ["4/23/2019","set a new personal record for longest jump at 4.2 meters"]]}>
            </Section>
            {/* <Section title="TEAM HISTORY:" dates={["Date: 5/5/2025","Date: 5/5/2025","Date: 3/6/2019"]} histories={["Joined: Arbitrary Team","Left: Second Arbitrary Team","Joined: First Arbitrary Team"]} ></Section> */}
            {/* <Section title="RECORD HISTORY:" todos={["Stretch for 15 minutes", "Plan your meal", "Review daily goals"]}></Section> */}
          </div>
      </div>
    </div>
  )
}

export default App

  //   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

