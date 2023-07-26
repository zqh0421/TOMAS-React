import { useState, useEffect, useRef } from "react";
import ChatList, { ChatItem } from "./ChatList";
import InputBox, { InputBoxRef } from "./InputBox";
import { fakeData } from "../assets/fakeData";


const ChatBox = (props: { className: string }) => {
  const [chatHistory, setChatHistory] = useState<Array<ChatItem>>([]); // real data from database
  const [shownChatList, setShownChatList] = useState<Array<ChatItem>>([]); // shown data in the chatbox
  const [isSending, setIsSending] = useState<Boolean>(false);
  const inputRef = useRef<InputBoxRef>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // initialize
    setChatHistory(fakeData.chatHistory);
  }, []);

  useEffect(() => {
    setShownChatList(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    // Assume that there is no delete function for chatHistory for now
    handleScrollToBottom();
    console.log(shownChatList);
  }, [shownChatList]);

  useEffect(() => {
    if (isSending) {
      try {
        // get response from GPT
        let ok = true;
        setTimeout(() => {
          console.log(ok);
          if (ok) {
            setChatHistory(chatHistory);
            setShownChatList(chatHistory);
          } else {
            let list = shownChatList;
            list[list.length - 1].content = "Response failed.";
            console.log(list);
            console.log("--list--");
            setShownChatList(list);
            setIsSending(false);
          }
        }, 3000);
      } catch (err) {
        console.error(err);
      }
    }
  }, [isSending]);

  const handleSend = () => {
    const inputValue = inputRef.current?.getInputValue(); // Access the inputValue using the ref
    inputValue &&
      setShownChatList([
        ...chatHistory,
        {
          id: Math.floor(Math.random() * 1000),
          name: "You",
          content: inputValue,
        },
        {
          id: Math.floor(Math.random() * 1000),
          name: "TOMAS",
          content: "",
        },
      ]);
    inputRef.current?.clearInput(); // Clear the input box
    setIsSending(true);
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
        className="flex-grow"
        chatHistory={shownChatList}
      />
      <button
        className="btn btn-circle absolute bottom-20 right-8 opacity-80"
        onClick={() => handleScrollToBottom()}
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1441"
          width="200"
          height="200"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M832 832H190.2C156.66 832 128 860.6 128 894.2S156.66 960 190.2 960H832c35.4 0 64-28.6 64-64s-28.6-64-64-64z m-48-447.8h-144V128.06c0-35.38-28.66-64.04-64-64.04h-128c-35.34 0-64 28.68-64 64.04v256.2l-144-0.06a48.064 48.064 0 0 0-44.1 29.02c-7.56 17.58-3.96 38.18 9.2 51.98l272 288.2c18.124 19.202 51.68 19.202 69.82 0l272-288.2a48.126 48.126 0 0 0 9.188-52C820.6 395.6 803.2 384.2 784 384.2z"
            p-id="1442"
          ></path>
        </svg>
      </button>
      <InputBox ref={inputRef} onSend={handleSend} />
    </div>
  );
};

export default ChatBox;
