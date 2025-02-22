const API_URL = "https://e54b-34-143-200-250.ngrok-free.app/chat";


document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const placeholder = document.getElementById("chat-placeholder");

    // Toggle Sidebar
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        chatContainer.classList.toggle("sidebar-open");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove("active");
            chatContainer.classList.remove("sidebar-open");
        }
    });

    function addMessage(sender, text) {
        if (!text.trim()) return;
        if (placeholder) placeholder.style.display = "none";

        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.innerHTML = `<p>${text}</p>`;

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        try {
            console.log("📤 Sending message:", message);

            chatInput.disabled = true;
            sendBtn.disabled = true;
            addMessage("user", message);
            chatInput.value = ""; 

            // API Request
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });
    
            console.log("📥 Response received:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            addMessage("bot", botResponse.response || "⚠️ No response received.");


        } catch (error) {
            addMessage("bot", "⚠️ Sorry, something went wrong. Please try again.");
        } finally {
            chatInput.disabled = false;
            sendBtn.disabled = false;
            chatInput.focus();
        }
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 200);
});
