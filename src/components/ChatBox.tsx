import { useEffect, useRef } from "react";
import ChatList, { ChatItem } from "./ChatList";
import InputBox, { InputBoxRef } from "./InputBox";
import {
  ActionComponent,
  answerForInput,
  answerForSelect,
  confirmAnswer,
  firstOrder,
  AnswerResponse
} from "../apis/chat";

const ChatBox = (props: {
  className: string;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  component: ActionComponent | null;
  setComponent: React.Dispatch<React.SetStateAction<ActionComponent | null>>;
  components: ActionComponent[] | null;
  setComponents: React.Dispatch<React.SetStateAction<ActionComponent[] | null>>;
  componentOrComponents: "component" | "components" | "error";
  setComponentOrComponents: React.Dispatch<React.SetStateAction<"component" | "components" | "error">>;
  setCurContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  dataUpdate: Function;
  chatHistory: Array<ChatItem>;
  setChatHistory:  React.Dispatch<React.SetStateAction<Array<ChatItem>>>;
  shownChatList: Array<ChatItem>;
  setShownChatList:  React.Dispatch<React.SetStateAction<Array<ChatItem>>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  actionValue: string;
  setActionValue: React.Dispatch<React.SetStateAction<string>>;
  getChatHistory: Function;
}) => {
  const { chatHistory, setChatHistory, shownChatList, setShownChatList, isProcessing, setIsProcessing, actionValue, setActionValue, getChatHistory } = props
  const inputRef = useRef<InputBoxRef>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const loadingMessage = (role: string) => {
    return {
      id: Math.floor(Math.random() * 1000).toString(),
      role: role,
      content: "",
    };
  };

  const errorMessage = {
    id: Math.floor(Math.random() * 1000).toString(),
    role: "AI",
    content:
      "There is some error here...",
  };

  useEffect(() => {
    // initialize
    (async () => {
      setChatHistory(await getChatHistory());
    })();
  }, []);

  useEffect(() => {
    setShownChatList(chatHistory);
    if (chatHistory.length) props.setCurContent(chatHistory[chatHistory.length-1].content)
  }, [chatHistory]);

  useEffect(() => {
    console.log("Current stage: " + props.stage);
    if (props.stage === "navigate") {
      (async () => {
        setChatHistory(await getChatHistory());
        setIsProcessing(false);
      })();
    }
  }, [props.stage]);

  useEffect(() => {
    // Assume that there is no delete function for chatHistory for now
    handleScrollToBottom();
    // console.log(shownChatList);
  }, [shownChatList]);

  const dataUpdate = (res: AnswerResponse) => {
    props.setStage(res.type);
    if (res.component !== undefined) {
      props.setComponent(res.component)
      props.setComponentOrComponents("component")
    } else if (res.components != undefined) {
      props.setComponents(res.components)
      props.setComponentOrComponents("components")
    } else {
      props.setComponentOrComponents("error")
      console.error("No component(s) available!")
    }
    if (res.actionValue) setActionValue(res.actionValue);
    (async () => {
      setChatHistory(await getChatHistory());
      setIsProcessing(false);
    })();
  }

  const handleSend = async () => {
    let inputValue = inputRef.current?.getInputValue(); // Access the inputValue using the ref
    if (inputValue) {
      inputValue = inputValue.trim();
      setShownChatList([
        ...chatHistory,
        {
          id: Math.floor(Math.random() * 1000).toString(),
          role: "HUMAN",
          content: inputValue,
        },
        loadingMessage("AI")
      ]) // send user's message
      setIsProcessing(true)
      try {
        if (props.stage === "navigate") {
          firstOrder({ content: inputValue }).then((res) => {
            dataUpdate(res)
          });
        } else if (props.stage === "questionForInput") {
          if (props.component) {
            answerForInput({ content: inputValue, component: props.component }).then(
              (res) => {
                dataUpdate(res)
              }
            );
          } else {
            setShownChatList([...shownChatList, errorMessage])
            setIsProcessing(false)
            throw new Error("Component is null");
          }
        } else if (props.stage === "questionForSelect") {
          if (props.component) {
            answerForSelect({ content: inputValue, component: props.component }).then(
              (res) => {
                dataUpdate(res)
              }
            );
          } else {
            setShownChatList([...shownChatList, errorMessage])
            setIsProcessing(false)
            throw new Error("Component is null");
          }
        } else if (props.stage === "requestConfirmation") {
          if (props.component) {
            confirmAnswer({
              content: inputValue,
              component: props.component,
              actionValue: actionValue,
            }).then((res) => {
              dataUpdate(res)
            });
          } else {
            setShownChatList([...shownChatList, errorMessage])
            setIsProcessing(false)
            throw new Error("Component is null");
          }
        } else {
          setShownChatList([...shownChatList, errorMessage])
          setIsProcessing(false)
          throw new Error(`Stage ${props.stage} is not defined`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    inputRef.current?.clearInput(); // Clear the input box
  };

  const handleScrollToBottom = () => {
    // scroll to bottom
    if (
      listRef &&
      listRef.current &&
      listRef.current instanceof HTMLDivElement
    ) {
      const scrollContainer = listRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  return (
    <div className={`flex flex-col mb-1 relative ${props.className}`}>
      <ChatList
        ref={listRef}
        className='flex-grow'
        chatHistory={shownChatList}
      />
      <button
        className='btn btn-circle absolute bottom-20 right-8 opacity-80'
        onClick={() => handleScrollToBottom()}
      >
        <svg
          className='h-6 w-6'
          viewBox='0 0 1024 1024'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          p-id='1441'
          width='200'
          height='200'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M832 832H190.2C156.66 832 128 860.6 128 894.2S156.66 960 190.2 960H832c35.4 0 64-28.6 64-64s-28.6-64-64-64z m-48-447.8h-144V128.06c0-35.38-28.66-64.04-64-64.04h-128c-35.34 0-64 28.68-64 64.04v256.2l-144-0.06a48.064 48.064 0 0 0-44.1 29.02c-7.56 17.58-3.96 38.18 9.2 51.98l272 288.2c18.124 19.202 51.68 19.202 69.82 0l272-288.2a48.126 48.126 0 0 0 9.188-52C820.6 395.6 803.2 384.2 784 384.2z'
            p-id='1442'
          ></path>
        </svg>
      </button>
      <InputBox ref={inputRef} onSend={handleSend} disabled={isProcessing} inputValue={props.inputValue} setInputValue={props.setInputValue}/>
    </div>
  );
};

export default ChatBox;
