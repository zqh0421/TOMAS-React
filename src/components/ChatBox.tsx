import { useState, useEffect, useRef } from 'react';
import ChatList, { ChatItem } from "./ChatList";
import InputBox, { InputBoxRef } from "./InputBox";
import * as fakeData from '/src/assets/fakeData.json'

const ChatBox = (props: { className: string }) => {
  const [chatHistory, setChatHistory] = useState<Array<ChatItem>>([])
  const inputRef = useRef<InputBoxRef>(null); 
  useEffect(() => {
    // initialize
    setChatHistory(fakeData.chatHistory)
  }, []);

  const handleSend = () => {
    const inputValue = inputRef.current?.getInputValue(); // Access the inputValue using the ref
    inputValue && setChatHistory([...chatHistory, {
      id: 123,
      name: "You",
      content: inputValue
    }])
    inputRef.current?.clearInput(); // Clear the input box
  };

  return (
    <div  className={`flex flex-col mb-1 ${props.className}`}>
      <ChatList className="flex-grow" chatHistory={chatHistory} />
      <InputBox ref={inputRef} onSend={handleSend} />
    </div>
  )
}

export default ChatBox;