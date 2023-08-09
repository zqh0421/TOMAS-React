import { useState, useEffect, useRef } from "react";
import ChatList, { ChatItem } from "./ChatList";
import InputBox, { InputBoxRef } from "./InputBox";
import {
  ActionComponent,
  answerForInput,
  answerForSelect,
  confirmAnswer,
  firstOrder,
  getChat,
} from "../apis/chat";

const ChatBox = (props: {
  className: string;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [chatHistory, setChatHistory] = useState<Array<ChatItem>>([]); // real data from database
  const [shownChatList, setShownChatList] = useState<Array<ChatItem>>([]); // shown data in the chatbox
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [component, setComponent] = useState<ActionComponent | null>(null);
  const [actionValue, setActionValue] = useState<string>("");
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
      "Currently AI cannot make response. After you refresh this page, this error message will disappear, it's not saved in our database.",
  };

  const getChatHistory = async () => {
    try {
      return await getChat();
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  useEffect(() => {
    // initialize
    (async () => {
      setChatHistory(await getChatHistory());
    })();
  }, []);

  useEffect(() => {
    setShownChatList(chatHistory);
    // if (isProcessing) {
    //   setShownChatList([...chatHistory, loadingMessage("AI")]);
    //   setTimeout(() => {
    //     console.log("Respond failed");
    //     setShownChatList([...chatHistory, errorMessage]);
    //     setIsProcessing(false);
    //   }, 10000);
    // }
  }, [chatHistory]);

  useEffect(() => {
    console.log(props.stage);
    if (props.stage === "navigate") {
      (async () => {
        setChatHistory(await getChatHistory());
        setIsSending(false);
        setIsProcessing(true);
      })();
    }
  }, [props.stage]);

  useEffect(() => {
    // Assume that there is no delete function for chatHistory for now
    handleScrollToBottom();
    console.log(shownChatList);
  }, [shownChatList]);

  const handleSend = async () => {
    const inputValue = inputRef.current?.getInputValue(); // Access the inputValue using the ref
    if (inputValue) {
      setIsSending(true);
      setShownChatList([...chatHistory, loadingMessage("HUMAN")]);
      try {
        // sendMessage({ content: inputValue }).then(() => {
        //   // currerntly res is empty
        //   (async () => {
        //     setChatHistory(await getChatHistory());
        //     setIsSending(false);
        //     setIsProcessing(true);
        //   })();
        // });
        if (props.stage === "navigate") {
          firstOrder({ content: inputValue }).then((res) => {
            props.setStage(res.type);
            setComponent(res.component);
            if (res.actionValue) setActionValue(res.actionValue);
            (async () => {
              setChatHistory(await getChatHistory());
              setIsSending(false);
              setIsProcessing(true);
            })();
          });
        } else if (props.stage === "questionForInput") {
          if (component) {
            answerForInput({ content: inputValue, component: component }).then(
              (res) => {
                props.setStage(res.type);
                setComponent(res.component);
                if (res.actionValue) setActionValue(res.actionValue);
                (async () => {
                  setChatHistory(await getChatHistory());
                  setIsSending(false);
                  setIsProcessing(true);
                })();
              }
            );
          } else {
            throw new Error("Component is null");
          }
        } else if (props.stage === "questionForSelect") {
          if (component) {
            answerForSelect({ content: inputValue, component: component }).then(
              (res) => {
                props.setStage(res.type);
                setComponent(res.component);
                if (res.actionValue) setActionValue(res.actionValue);
                (async () => {
                  setChatHistory(await getChatHistory());
                  setIsSending(false);
                  setIsProcessing(true);
                })();
              }
            );
          } else {
            throw new Error("Component is null");
          }
        } else if (props.stage === "requestConfirmation") {
          if (component) {
            confirmAnswer({
              content: inputValue,
              component: component,
              actionValue: actionValue,
            }).then((res) => {
              props.setStage(res.type);
              setComponent(res.component);
              if (res.actionValue) setActionValue(res.actionValue);
              (async () => {
                setChatHistory(await getChatHistory());
                setIsSending(false);
                setIsProcessing(true);
              })();
            });
          } else {
            throw new Error("Component is null");
          }
        } else {
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
      <InputBox ref={inputRef} onSend={handleSend} isSending={isSending} />
    </div>
  );
};

export default ChatBox;
