// import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import MockWindow from './components/MockWindow'
import ChatBox from './components/ChatBox'
function App() {
  return (
    <div className="flex flex-col h-screen max-h-[100vh]">
      <NavBar className="flex-none"/>
      <div className="flex flex-row mx-4 my-4 space-x-4 flex-grow overflow-auto">
        <MockWindow className="flex-1" />
        <ChatBox className="flex-1" />
      </div>
      <Footer className="flex-none"/>
    </div>
  )
}

export default App
