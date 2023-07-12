import { forwardRef, Ref } from 'react'

export interface ChatItem {
  id: number | undefined,
  name: string | undefined,
  content: string | undefined
}

const ChatList = (props: { className: string, chatHistory: Array<ChatItem> | {} | undefined}, ref: Ref<HTMLDivElement> | undefined) => { 
  return (
    <div ref={ref} className={`${props.className} overflow-y-auto p-4 mb-4`}>
      {props.chatHistory && Array.isArray(props.chatHistory) && props.chatHistory.map(item => {
        return (
          <div className={`chat ${item.name === "TOMAS" ? "chat-start" : "chat-end"}`} key={item.id}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={item.name === "TOMAS" ? "/src/assets/react.svg" : "/public/vite.svg"} />
              </div>
            </div>
            <div className="chat-header">
              {item.name}
            </div>
            <div className="chat-bubble">{item.content}</div>
          </div>
        )
      })}
    </div>
  )
}

export default forwardRef(ChatList);