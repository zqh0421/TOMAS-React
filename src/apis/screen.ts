export const navigate = async (request: { url: string }) => {
  console.log("Send message...")
	const response = await fetch('http://localhost:8000/api/screen/navigate', {
		method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(request)
	})
  return response.text();
}