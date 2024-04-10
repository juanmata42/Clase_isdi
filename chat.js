function sendMessage(context = '') {
    let userInput
    if (context) {
        userInput = context;
    } else {
        userInput = document.getElementById("userInput").value;
    }
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
            if (context) {
                displayPoem(data.message.content, "poem");
            } else {
                displayMessage("You: " + userInput, true); // true for user message
                displayMessage("Ollama: " + data.message.content, false); // false for Ollama response
            }
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

function displayInContainer(containerId, message) {
    var container = document.getElementById(containerId);
    container.textContent = message;
}
// append the dom item whose id is "poem" and put a poem in it
function displayPoem(poem, containerId) {
    var container = document.getElementById(containerId);
    container.textContent = poem;
}
sendMessage("write a poem");