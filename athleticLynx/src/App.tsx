//@ts-ignore
import './App.css'
import { useEffect, useState, ChangeEvent } from 'react'
import { CircleUserRound } from 'lucide-react'
import { Image } from 'lucide-react'
import { UserRoundPen } from 'lucide-react'
import { SquarePen } from 'lucide-react'

import { User } from "@prisma/client"


// function Section(props) {
//   return (
//     <div style={{alignContent: "space-between", width: "1304px", marginInline: "37px", borderBottom: "1px solid #3B6255" }}>
//       <div style={{paddingInline: "10px"}}>
//         {props.records.map(([date, history], index) => (
//             <p key={index}>On {date}, User {history}</p>
//         ))}
//       </div>
//     </div>
//   )
// }

interface SectionProps {
  records: [string, string][];
}

function Section({ records }: SectionProps) {
  return (
    <div style={{ alignContent: "space-between", width: "1304px", marginInline: "37px", borderBottom: "1px solid #3B6255" }}>
      <div style={{ paddingInline: "10px" }}>
        {records.map(([date, history], index) => (
          <p key={index}>On {date}, User {history}</p>
        ))}
      </div>
    </div>
  );
}


// function Field(props) {
//   function handleChange(event) {
//     console.log(event)
//     props.setValue(prev => ({
//       ...prev,                          // keep all other fields
//       [props.attributeName]: event.target.value  // update only this field
//     }));
//     console.log(event.target.value)
//   }
//   return (
//     <div className="Field">
//       <input onChange={handleChange} value={props.value} type="text" className="inputField" placeholder={props.description} />
//       {/* <input type="text" className="inputField" placeholder={props.description} /> */}

//     </div>
//   )
// }

interface FieldProps {
  description: string;
  value: string | number;
  attributeName: keyof User;
  setValue: React.Dispatch<React.SetStateAction<User>>;
}

function Field({ description, value, attributeName, setValue }: FieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(prev => ({
      ...prev,
      [attributeName]: event.target.value
    }));
  }

  return (
    <div className="Field">
      <input
        onChange={handleChange}
        value={value}
        type="text"
        className="inputField"
        placeholder={description}
      />
    </div>
  );
}

function App() {
  // const [name, setName] = useState("")
  // const [age, setAge] = useState("")
  // const [city, setCity] = useState("")
  // const [position, setPosition] = useState("")
  // const [email, setEmail] = useState("")
  // const [phone, setPhone] = useState("")

  const [user, setUser] = useState<User>({
    id: 1,
    name: '', 
    age: 1, 
    city: 'San Antonio', 
    position: "Midfielder",
    email: "alice@example.com",
    phone: "210-555-5555",
    createdAt: new Date('2023-01-01')
  })

  // async function getUserInfo(){
  //   const response = await fetch("http://localhost:3000/api/user", {
  //     method: "GET", // Specify the method
  //     headers: {
  //       "Content-Type": "application/json", // Inform the server about the data format
  //     },
  //     body: JSON.stringify({email: "alice@example.com"}), // Convert the JS object to a JSON string
  //   });
  //   const data = await response.json()
  //   console.log(data)
  //   setUser(data.user)
  // }

  // useEffect(() => {
  //   getUserInfo()
  // }, [])

  async function getUserInfo(): Promise<void> {
    const response: Response = await fetch("http://localhost:3000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "alice@example.com" }),
    });

    const data: { user: User } = await response.json();
    console.log(data);
    setUser(data.user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function saveUpdates() {
    const data = {
      name: name
    }
    const response = await fetch("http://localhost:3000/api/updateUserInfo", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server about the data format
      },
      body: JSON.stringify(data), // Convert the JS object to a JSON string
    });
  }

  return (
    <div className='profilePage'>
      {/* may make a header */}
      <div className='profileInfo'>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div className='pfp'>
            <CircleUserRound size={170}/>
          </div>
          <div className='userInfo'>
            <Field description="Enter the Player's Name" value={user.name} attributeName={"name"} setValue={setUser}></Field>

            {/* <Field description="Enter the Player's Age" value={age} setValue={setAge}></Field> */}
            
            {/* <span style={{fontSize: '40px', marginBlock: '5px'}}>User's Name</span> */}
            <span style={{paddingInline: "10px"}}>User's Age</span>
            <span style={{paddingInline: "10px"}}>Located: User's Current City</span>
            <span style={{paddingInline: "10px"}}>Position: User's Current Position</span>
          </div>
        </div>

        <div style={{display: "flex", flexDirection: "row", width: "500px", gap: "20px"}}>
          <div>
            {/* <button style={{cursor: "pointer"}} onClick={saveUpdates}>
              <UserRoundPen/>
            </button> */}
          </div>

          <div className='contact'>
            <span style={{fontSize: '35px', marginBlock: "5px" }}>Contact Info</span>
            <span style={{paddingInline: "10px"}}>Email: exampleEmail@gmail.com</span>
            <span style={{paddingInline: "10px"}}>Phone Number: (555)-555-5555</span>
          </div>
        </div>
      </div>



      <div className='history'>
        <div className='historyBar'>
          <span style={{fontSize: '56px'}}>HISTORY</span>
          {/* Taskbar? */}
          <button className='editButton'>Edit History</button>
        </div>
        <div>
          {/* add edit button */}
          <Section 
            records={[
              ["5/5/2025","joined Second Arbitrary Team"], 
              ["5/4/2025", "left First Arbitrary Team"], 
              ["3/6/2019", "joined First Arbitrary Team"]
            ]}>
          </Section>
          
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

