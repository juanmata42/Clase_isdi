function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "orca-mini",
            messages: [
                { "role": "user", "content": userInput }
            ]
        }),
    })
        .then(response => response.text()) // Read the response as text
        .then(text => {
            // Split the text into individual JSON strings
            const jsonStrings = text.trim().split('}\n{');

            let fullMessage = '';
            jsonStrings.forEach((jsonStr, index) => {
                // Properly reformat the string into valid JSON
                if (index > 0) jsonStr = '{' + jsonStr;
                if (index < jsonStrings.length - 1) jsonStr = jsonStr + '}';

                // Parse each JSON string and concatenate the content
                const data = JSON.parse(jsonStr);
                fullMessage += data.message.content;
            });

            // Display the full message
            displayMessage("Ollama: " + fullMessage, false);
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
