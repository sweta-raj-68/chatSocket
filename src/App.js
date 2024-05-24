import "./App.css";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import SampleApp from "./sample/Sample";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home"
// import ChatPage from "./Components/ChatBody"
import ChatPage from "./Components/ChatPage"

const socket = socketIO.connect("http://localhost:4000");

function App() {
  

  return (
    <BrowserRouter>
      <div>
        <SampleApp/>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
