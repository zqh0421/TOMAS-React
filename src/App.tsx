// import { useState } from 'react'
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MockWindow from "./components/MockWindow";
import ChatBox from "./components/ChatBox";
import { useEffect, useState } from "react";
import {
  ActionComponent
} from "./apis/chat";

function App() {
  const [stage, setStage] = useState("");
  const [curHTML, setCurHTML] = useState("")
  const [component, setComponent] = useState<ActionComponent | null>(null);
  useEffect(() => {
    if (stage === "questionForSelect") {
      setCurHTML(`<h1>${stage}</h1>${component && component.html!=null && component.html!=undefined && component.html}`)
    } else if (stage) {
      setCurHTML(`<h1>${stage}</h1>`)
    } else {
      setCurHTML(`<h1>Empty</h1>`)
    }
  }, [stage])

  return (
    <div className='flex flex-col h-screen max-h-[100vh]'>
      <NavBar className='flex-none' />
      <div className='flex flex-row mx-4 my-4 space-x-4 flex-grow overflow-auto'>
        <MockWindow className='flex-1' stage={stage} setStage={setStage} html={curHTML} />
        <ChatBox className='flex-1' stage={stage} setStage={setStage} component={component} setComponent={setComponent} />
      </div>
      <Footer className='flex-none' />
    </div>
  );
}

export default App;
