export const test = {
	send: async () => {
		const response = await fetch('http://localhost:8000/test', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('Response:', responseData);
		} else {
			console.log('Error:', response.status);
		}
	}
};

export const testPost = {
	send: async () => {
		// { request } : { request: Request}
		// const data = await request.formData();
		// const message = data.get('message');
		const message = "Good evening."
		const response = await fetch('http://localhost:8000/api/chats/human', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: message })
		});

		if (response.ok) {
			console.log(`Success to send message '${message}'`);
		}
	}
} 