function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    fetch('http://localhost:11434/api/chat?format=json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "orca-mini",
            stream: false,
            messages: [
                { "role": "user", "content": userInput }
            ]
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            displayMessage("You: " + userInput, true); // true for user message
            displayMessage("Ollama: " + data.message.content, false); // false for Ollama response
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function displayMessage(message, isUser) {
    var chatDiv = document.getElementById("chat");
    var messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.color = isUser ? "blue" : "green";
    chatDiv.appendChild(messageDiv);
}
