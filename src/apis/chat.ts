export const getChat = async () => {
  console.log("Fetch chats from database...")
	const response = fetch('http://localhost:8000/api/chats', {
		method: 'GET',
	})
	return (await response).json()
}

export const sendMessage = async (request: { content: string }) => {
  console.log("Send message...")
	const response = await fetch('http://localhost:8000/api/chats/human', {
		method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      "content": request.content
    })
	})
  return response.text();
}