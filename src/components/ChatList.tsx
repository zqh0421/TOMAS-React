import { forwardRef, Ref } from "react";

export interface ChatItem {
  id: string;
  role: string;
  content: string;
}

const ChatList = (
  props: { className: string; chatHistory: Array<ChatItem> | {} | undefined },
  ref: Ref<HTMLDivElement> | undefined
) => {
  return (
    <div ref={ref} className={`${props.className} overflow-y-auto p-4 mb-4`}>
      {props.chatHistory &&
        Array.isArray(props.chatHistory) &&
        props.chatHistory.map((item) => {
          return (
            <div
              className={`chat ${
                item.role === "AI" ? "chat-start" : "chat-end"
              }`}
              key={item.id}
            >
              <div className='chat-image avatar placeholder'>
                <div className='w-10 rounded-full bg-neutral-focus'>
                  <span className='text-slate-100'>
                    {item.role === "AI" ? "AI" : "ME"}
                  </span>
                  {/* <img src={item.role === "AI" ? "https://cdn.discordapp.com/attachments/1129399582565085294/1129401100928294933/yizhihu123_I_am_TOMAS_a_grandson_aiming_to_help_people_quickly__b99782e5-4a9c-4984-9970-77c9740c5589.png" : "https://cdn.discordapp.com/attachments/1129399582565085294/1129402681337852014/yizhihu123_A_simple_icon_of_a_website_user_who_can_be_male_fema_5536d5b9-ee45-44fc-a8b4-a691ea7aeb93.png"} /> */}
                </div>
              </div>
              <div className='chat-header text-lg'>{item.role}</div>
              <div className='chat-bubble items-center justify-center text-lg whitespace-pre-wrap'>
                {item.content ? (
                  item.content
                ) : (
                  <span className='loading loading-dots loading-md'></span>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default forwardRef(ChatList);
