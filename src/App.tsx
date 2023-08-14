// import { useState } from 'react'
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MockWindow from "./components/MockWindow";
import ChatBox from "./components/ChatBox";
import { ChatItem } from "./components/ChatList";
import { useEffect, useState } from "react";
import type { ActionComponent, AnswerResponse } from "./apis/chat";
import { getChat, confirmAnswer } from "./apis/chat";
import { Modal, Button } from 'antd';

function App() {
  const [stage, setStage] = useState("");
  const [curHTML, setCurHTML] = useState("")
  const [component, setComponent] = useState<ActionComponent | null>(null);
  const [components, setComponents] = useState<ActionComponent[] | null>(null);
  const [componentOrComponents, setComponentOrComponents] = useState<"component" | "components" | "error">("error");
  const [curContent, setCurContent] = useState<string | undefined>("")
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<ChatItem>>([]); // real data from database
  const [shownChatList, setShownChatList] = useState<Array<ChatItem>>([]); // shown data in the chatbox
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionValue, setActionValue] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [confirmLoadingYes, setConfirmLoadingYes] = useState(false);
  const [confirmLoadingNo, setConfirmLoadingNo] = useState(false);

  useEffect(() => {
    if (stage === "questionForSelect") {
      if (componentOrComponents === "component") {
        setCurHTML(`<h1 class="text-2xl leading-loose font-bold">- ${stage}</h1>${component && component.html!=null && component.html!=undefined && component.html}`)
      } else if (componentOrComponents === "components") {
        setCurHTML(`<h1>${stage}</h1>${components!=null && components.map(component => component.html)}`)
      }
    } else if (stage === "requestConfirmation") {
      setCurHTML(`
        <h1 class="text-2xl leading-loose font-bold">- ${stage}</h1>
        <h2 class="text-3xl leading-loose font-bold">${curContent}</h2>
      `);
      setOpen(true)
    } else if (stage) {
      console.log(component)
      setCurHTML(`<h1 class="text-2xl leading-loose font-bold">- ${stage}</h1><h2 class="text-3xl leading-loose font-bold">${curContent}</h2>`)
    } else {
      setCurHTML(`<h1>Empty</h1>`)
    }
  }, [stage, curContent])

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

  const handleConfirmation = (response: string) => {
    if (response === "YES") {
      setConfirmLoadingYes(true)
      component && confirmAnswer({
        content: response,
        component: component,
        actionValue: actionValue,
      }).then((res) => {
        dataUpdate(res)
        setConfirmLoadingYes(false)
        setConfirmLoadingNo(false)
        setOpen(false)
      });
    } else {
      setInputValue("No, ")
      setConfirmLoadingYes(false)
      setConfirmLoadingNo(false)
      setOpen(false)
    }
    console.log(response)
  }

  return (
    <div className='flex flex-col h-screen max-h-[100vh]'>
      <NavBar className='flex-none' />
      <div className='flex flex-row mx-4 my-4 space-x-4 flex-grow overflow-auto'>
        <MockWindow
          className='flex-1'
          stage={stage} setStage={setStage}
          html={curHTML}
          content={curContent}
          component={component} setComponent={setComponent}
          components={components} setComponents={setComponents}
          componentOrComponents={componentOrComponents} setComponentOrComponents={setComponentOrComponents}
          setInputValue={setInputValue}
          dataUpdate={dataUpdate}
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
        />
        <Modal
          title="Confirm"
          width={"50vw"}
          bodyStyle={{ padding: "30px"}}
          open={open}
          keyboard={false}
          closable={false}
          closeIcon={false}
          footer={[
            <Button loading={confirmLoadingYes} disabled={confirmLoadingNo} onClick={() => handleConfirmation("YES")}>YES</Button>,
            <Button loading={confirmLoadingNo} disabled={confirmLoadingYes} onClick={() => handleConfirmation("NO")}>NO</Button>
          ]}
        >
          <h2 className="text-3xl">{curContent}</h2>
        </Modal>
      </div>
      <Footer className='flex-none' />
    </div>
  );
}

export default App;
