//@ts-ignore
import './App.css'
import { User, History } from "@prisma/client"
import { useEffect, useState, ChangeEvent } from 'react'
import { CircleUserRound, SquarePen, UserRoundPen, Trash } from 'lucide-react'

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
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'Alice Johnson', 
    age: 1, 
    city: 'San Antonio', 
    position: "Midfielder",
    email: "alice@example.com",
    phone: "210-555-5555",
    createdAt: new Date('2023-01-01')
  })

  const [histories, setHistories] = useState<History[]>(
    [
      {
        id: 1,
        description: "ABC",
        createdAt: new Date('2023-01-01'),
        userId: user.id
      },
      {
        id: 2,
        description: "XYZ",
        createdAt: new Date('2023-01-01'),
        userId: user.id
      }
    ]
  );

  async function getUserInfo(): Promise<void> {
    const response: Response = await fetch(
      "http://localhost:3000/api/users?email=alice@example.com"
    );
    const data: { user: User } = await response.json();
    console.log(data);
    setUser(data.user);
  }
  async function getHistory(): Promise<void> {
    const response = await fetch(
      "http://localhost:3000/api/history?email=alice@example.com");
    const data = await response.json();
    setHistories(data.history);
  }
  useEffect(() => {
    getUserInfo();
    getHistory();
  }, []);

  function updateHistoryField(id: number, value: string): void {
    setHistories(prev =>
      prev.map(history => history.id === id ? { ...history, description: value } : history)
    );
  }

  function removeHistory(id: number): void {
    setHistories(prev => 
      prev.filter(history => history.id !== id));

    // delete from database
    fetch("http://localhost:3000/api/deleteHistory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }); 
  }

  async function saveAll(): Promise<void> {
    // Saves User Information
    const data: Omit<User, "id" | "createdAt"> = {
      name: user.name,
      age:  user.age,
      city: user.city,
      position: user.position,
      email: user.email,
      phone: user.phone,
    };
    await fetch("http://localhost:3000/api/updateUserInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Split histories into existing and new
    const existingHistories = histories.filter(h => h.id < 1000000000000);

    // // Update existing histories
    await fetch("http://localhost:3000/api/updateHistory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, histories: existingHistories }),
    });

    const newHistories = histories.filter(h => h.id >= 1000000000000);
    console.log("All histories:", histories.map(h => h.id));
    console.log("New histories:", newHistories);
    for (const h of newHistories) {
      console.log("Saving new history:", h); // check this in browser console
      if (h.description.trim() === "") continue;
      console.log("Saving new history part 2:", h); // check this in browser console
      const response = await fetch("http://localhost:3000/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, description: h.description }),
      });
      const result = await response.json();
      console.log("Saved new history:", result); // check this in browser console
    }

    await getHistory(); // refresh to get real ids from DB
  }
    
    // }
    // const dataH: Omit<History, 'id' | 'createdAt' | 'userId'>[] = 
    //   histories.map(history => ({
    //     description: history.description
    //   })
    // );
      // await fetch("http://localhost:3000/api/updateHistory", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: user.email, histories: dataH }),
      // });
    
  
  // const [extraFields, setExtraFields] = useState<{
  //   id: number; 
  //   label: string;
  //   value: string 
  // }[]>([]);

  function addField(): void {
    setHistories(prev => [...prev, {
      id: Date.now(),         // temporary id until saved
      description: "",
      createdAt: new Date(),
      userId: user.id
    }]);
  }
  // function addField(): void {
  //   setExtraFields(prev => [...prev, { 
  //     id: Date.now(),
  //     label: "",
  //     value: "" }]);
  // }
  // function updateExtraField(id: number, value: string): void {
  //   setExtraFields(prev =>
  //     prev.map(field => field.id === id ? { ...field, value } : field)
  //   );
  // }
  // function removeExtraField(id: number): void {
  //   setExtraFields(prev => prev.filter(field => field.id !== id));
  // }

  return (
    <div className='profilePage'>
      <div className='profileInfo'>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div className='pfp'>
            <CircleUserRound size={170}/>
          </div>
          <div className='userInfo'>
            <div style={{fontSize: '40px'}}>
              <Field 
                description="Enter the Player's Name" 
                value={user.name} 
                attributeName={"name"} 
                setValue={setUser}/>
            </div>
            <div style={{paddingInline: "10px", fontSize: "25px"}}>
              <Field 
                description="Enter the Player's Age" 
                value={user.age} 
                attributeName={"age"} 
                setValue={setUser}/>
              <Field 
                description="Enter the Player's Current City" 
                value={user.city} 
                attributeName={"city"} 
                setValue={setUser}/>
              <Field 
                description="Enter the Player's Team Position" 
                value={user.position} 
                attributeName={"position"} 
                setValue={setUser}/>
            </div>
          </div>
        </div>

        <div 
          style={{
            display: "flex", 
            flexDirection: "row", 
            width: "500px", 
            gap: "20px"
          }}>
          <div className='contact'>
            <span style={{fontSize: "35px", marginBlock: "5px" }}>
              Contact Info
            </span>
            <div style={{paddingInline: "10px", fontSize: "25px"}}>
              <Field 
                description="Enter the Player's Email" 
                value={user.email} 
                attributeName={"email"} 
                setValue={setUser}/>
              <Field 
                description="Enter the Player's Phone" 
                value={user.phone} 
                attributeName={"phone"} 
                setValue={setUser}/>
            </div>
          </div>
        </div>
      </div>

      <div className='history'>
        {/* Basically the header for the history section */}
        {/* History Title and add new history button */}
        <div className='historyBar'>
          <span style={{fontSize: '56px'}}>HISTORY</span>
          <button onClick={addField} className='button'
            style={{width: '220px'}}>
            <UserRoundPen/>
            ADD HISTORY
          </button>
        </div>
        {/* Contains the fields for the records and histories */}
        {/* Basically the body for the history section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center',
        }}>
          <div style={{
            width: '1304px',
            minHeight: '100px',
          }}>
            {histories.map(history => (
              <div 
                key={history.id} 
                style={{ 
                  display: 'flex',
                  minWidth: '300px',
                  gap: '10px',
                  paddingLeft: '10px',
                }}>
                <input
                  className="inputField"
                  type="text"
                  placeholder="Enter New Record or History"
                  value={history.description}
                  onChange={e => updateHistoryField(history.id, e.target.value)}
                  style={{width: '400px'}}
                />
                <button onClick={() => removeHistory(history.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '5px',
                    color: '#3B6255',
                  }}>
                  <Trash size={'40px'}/>
                </button>
              </div>
            ))}
          </div>

          <div style={{
            width: '1304px', 
            marginTop: '10px',
            borderTop: '1px solid #3B6255' 
          }}>
            <button className='button' 
              onClick={saveAll}
              style={{
                width: '300px', 
                height: '45px', 
                marginBlock: '10px',
                paddingInline: '10px'
              }}>
              <SquarePen style={{marginTop: '1px'}}/>
              Save Edits
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App