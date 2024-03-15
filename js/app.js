document.addEventListener("DOMContentLoaded", function() {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    // Function to fetch messages from the backend
    function fetchMessages() {
        fetch('http://127.0.0.1:5000/messages')
            .then(response => response.json())
            .then(data => {
                // Clear the chat box before displaying new messages
                chatBox.innerHTML = '';

                // Append each message to the chat box
                data.forEach(message => {
                    chatBox.innerHTML += `<div><i>${message}</i></div>`;
                });

                // Scroll to the bottom of the chat box
                chatBox.scrollTop = chatBox.scrollHeight;
            })
            .catch(error => console.error('Error fetching messages:', error));
    }

    // Fetch messages when the page loads
    fetchMessages();

    // Function to send a new message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            // Assuming the backend expects a POST request to send a message
            fetch('http://127.0.0.1:5000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: message })
            })
            .then(response => {
                if (response.ok) {
                    // Fetch messages again to update the chat box with the new message
                    fetchMessages();
                    // Clear the input field after sending the message
                    messageInput.value = '';
                } else {
                    console.error('Failed to send message');
                }
            })
            .catch(error => console.error('Error sending message:', error));
        }
    }

    // Event listener for the send button click
    sendButton.addEventListener('click', sendMessage);

    // Optional: Allow sending message by pressing Enter key
    messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
