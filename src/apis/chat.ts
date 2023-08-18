export const getChat = async () => {
  console.log("Fetch chats from database...");
  const response = fetch("http://localhost:8000/api/chats", {
    method: "GET",
  });
  return (await response).json();
};

export const sendMessage = async (request: { content: string }) => {
  console.log("Send message...");
  const response = await fetch("http://localhost:8000/api/chats/human", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: request.content,
    }),
  });
  return response.text();
};

interface NavigateResponse {
  type: string;
  screenDescription: string;
}

export const navigate = async (request: { url: string }) => {
  console.log("Navigate...");
  const response = await fetch("http://localhost:8000/api/chats/navigate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: request.url,
    }),
  });

  const result: NavigateResponse = await response.json();
  return result;
};

export type ActionType = "select" | "input" | "click" | "focus" | "item";

export type ActionComponent = {
  i: string;
  actionType: ActionType;
  description: string;
  html: string;
};

export type SelectableComponent = {
  i: string;
  description: string;
  actionType: ActionType;
  data: string | Record<string, string | string[]>;
}

export type AnswerResponse = {
  type: string;
  component?: ActionComponent;
  components?: SelectableComponent[];
  actionValue?: string;
}

export const firstOrder = async (request: { content: string }) => {
  console.log("First order...");
  const response = await fetch("http://localhost:8000/api/chats/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: request.content,
    }),
  });

  const result: AnswerResponse = await response.json();
  return result;
};

export const answerForInput = async (request: {
  content: string;
  component: ActionComponent;
}) => {
  console.log("Answer for input...");
  const response = await fetch("http://localhost:8000/api/chats/answer/input", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: request.content,
      component: request.component,
    }),
  });

  const result: AnswerResponse = await response.json();
  return result;
};

export const answerForSelect = async (request: {
  content: string;
  component: SelectableComponent;
}) => {
  console.log("Answer for select...");
  const response = await fetch(
    "http://localhost:8000/api/chats/answer/select",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: request.content,
        component: request.component,
      }),
    }
  );

  const result: AnswerResponse = await response.json();
  return result;
};

export const confirmAnswer = async (request: {
  content: string;
  component: ActionComponent;
  actionValue?: string;
}) => {
  console.log("Confirm...");
  const response = await fetch("http://localhost:8000/api/chats/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: request.content,
      component: request.component,
      actionValue: request.actionValue,
    }),
  });

  const result: AnswerResponse = await response.json();
  return result;
};

export const removeChat = async () => {
  console.log("Remove the chat...");
  const response = fetch("http://localhost:8000/api/chats", {
    method: "DELETE",
  });
  return (await response).json();
};
