console.log("✅ Chatbot script loaded!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded!");

    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    console.log("Checking Elements:");
    console.log("chat-box:", chatBox);
    console.log("chat-input:", chatInput);
    console.log("send-btn:", sendBtn);

    if (!chatBox) console.error("🚨 chat-box not found!");
    if (!chatInput) console.error("🚨 chat-input not found!");
    if (!sendBtn) console.error("🚨 send-btn not found!");

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");

        const avatar = document.createElement("img");
        avatar.src = sender === "user" ? "../assets/user.png" : "../assets/robot.png";
        avatar.classList.add("avatar");

        const messageText = document.createElement("div");
        messageText.classList.add("message");
        messageText.textContent = message;

        messageElement.appendChild(avatar);
        messageElement.appendChild(messageText);
        chatBox.appendChild(messageElement);

        chatBox.scrollTop = chatBox.scrollHeight; 
    }

    function botResponse(userMessage) {
        const botReplies = {
            "hello": "Hello! How can I assist you?",
            "how are you": "I'm just a bot, but I'm doing great!",
            "what can you do": "I can answer questions, provide info, and chat with you!",
            "bye": "Goodbye! Have a great day!"
        };

        let response = botReplies[userMessage.toLowerCase()] || "I'm not sure about that. Try asking something else!";
        
        setTimeout(() => {
            appendMessage("bot", response);
        }, 800);
    }

    function handleSendMessage() {
        console.log("📩 Send button clicked!");

        let message = chatInput.value.trim();
        if (message) {
            console.log("User message:", message);
            appendMessage("user", message);
            chatInput.value = "";
            botResponse(message);
        } else {
            console.warn("⚠️ Cannot send empty message");
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener("click", handleSendMessage);
        console.log("✅ Event listener added to send button");
    } else {
        console.error("🚨 send-btn not found, event listener not added!");
    }

    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            console.log("⏎ Enter key pressed!");
            handleSendMessage();
        }
    });
});
