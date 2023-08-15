import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MockWindow from "./components/MockWindow";
import ChatBox from "./components/ChatBox";
import { ChatItem } from "./components/ChatList";
import { useState, useRef } from "react";
import type { ActionComponent, AnswerResponse } from "./apis/chat";
import { getChat } from "./apis/chat";
import { SendRef } from "./components/ChatBox";

function App() {
  const [stage, setStage] = useState("");
  const [component, setComponent] = useState<ActionComponent | null>(null);
  const [components, setComponents] = useState<ActionComponent[] | null>(null);
  const [componentOrComponents, setComponentOrComponents] = useState<"component" | "components" | "error">("error");
  const [curContent, setCurContent] = useState<string | undefined>("")
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<ChatItem>>([]); // real data from database
  const [shownChatList, setShownChatList] = useState<Array<ChatItem>>([]); // shown data in the chatbox
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionValue, setActionValue] = useState<string>("");
  const [open, setOpen] = useState<"confirm" | "input" | "">("");
  const sendRef = useRef<SendRef>(null);

  const getChatHistory = async () => {
    try {
      return await getChat();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const dataUpdate = (res: AnswerResponse) => {
    setStage(res.type);
    if (res.component !== undefined) {
      setComponent(res.component)
      setComponentOrComponents("component")
    } else if (res.components != undefined) {
      setComponents(res.components)
      setComponentOrComponents("components")
    } else {
      setComponentOrComponents("error")
      console.error("No component(s) available!")
    }
    if (res.actionValue) setActionValue(res.actionValue);
    (async () => {
      setChatHistory(await getChatHistory());
      setIsProcessing(false);
    })();
  }

  return (
    <div className='flex flex-col h-screen max-h-[100vh]'>
      <NavBar className='flex-none' />
      <div className='flex flex-row mx-4 my-4 space-x-4 flex-grow overflow-auto'>
        <MockWindow
          className='flex-1'
          stage={stage} setStage={setStage}
          content={curContent}
          component={component} setComponent={setComponent}
          components={components} setComponents={setComponents}
          componentOrComponents={componentOrComponents} setComponentOrComponents={setComponentOrComponents}
          isProcessing={isProcessing} setIsProcessing={setIsProcessing}
          inputValue={inputValue} setInputValue={setInputValue}
          dataUpdate={dataUpdate}
          actionValue={actionValue}
          onSend={sendRef.current?.handleSend}
          handleKeyPress={sendRef.current?.handleKeyPress}
          open={open}
          setOpen={setOpen}
        />
        <ChatBox
          className='flex-1'
          stage={stage} setStage={setStage}
          component={component} setComponent={setComponent}
          components={components} setComponents={setComponents}
          componentOrComponents={componentOrComponents} setComponentOrComponents={setComponentOrComponents}
          setCurContent={setCurContent}
          dataUpdate={dataUpdate}
          inputValue={inputValue} setInputValue={setInputValue}
          chatHistory={chatHistory} setChatHistory={setChatHistory}
          shownChatList={shownChatList} setShownChatList={setShownChatList}
          isProcessing={isProcessing} setIsProcessing={setIsProcessing}
          actionValue={actionValue} setActionValue={setActionValue}
          getChatHistory={getChatHistory}
          ref={sendRef}
          setOpen={setOpen}
        />
      </div>
      <dialog id='transcriptionNotSupportedModal' className='modal'>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>Notice</h3>
          <p className='py-4'>
            Your browser is not supported for transcription. Please use Google
            Chrome or Microsoft Edge instead.
          </p>
          <div className='modal-action'>
            <button className='btn'>Close</button>
          </div>
        </form>
      </dialog>
      <Footer className='flex-none' />
    </div>
  );
}

export default App;
