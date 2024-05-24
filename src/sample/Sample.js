
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");

function SampleApp() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    socket.on("newpostCreated", (data) => {
      console.log("newpostCreated", data);
      getData()
    });
 
  }, []);
async function getData(){
    try{
  const res = await fetch("http://localhost:4000/api/getPost");
  const data = await res.json();
  setData(data.userPost);}
  catch(err){
    console.log(err);
  }
}
console.log(data , "data =====================");
  useEffect(() => {
    getData();
  }, []);
  async function handlepost() {
    console.log(message);
    try {
      const res = await fetch("http://localhost:4000/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });
      setMessage("");
      const data = await res.json();
      console.log("================", data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Learn React</p>
        {/* <button
          onClick={() => socket.emit("click", "hello from client socket id")}
        >
          Click
        </button> */}
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => handlepost()}>Send</button>
        </div>
      {data.map((e)=><p>{e.message}</p>)}
      </header>
    </div>
  );
}

export default SampleApp;
