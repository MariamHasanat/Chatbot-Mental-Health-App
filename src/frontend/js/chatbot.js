document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");
    const chatContainer = document.getElementById("chat-container");
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const scrollUpBtn = document.getElementById("scroll-up");
    const placeholder = document.getElementById("chat-placeholder");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        chatContainer.classList.toggle("sidebar-open");
    });

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

            const response = await fetch("https://e54b-34-143-200-250.ngrok-free.app/chat", {   
             method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                credentials: "include",
                body: JSON.stringify({ message })
            });

            console.log("📥 Response received:", response);

            if (!response.ok) {
                console.error("❌ HTTP Error! Status:", response.status);
                const errorText = await response.text(); 
                console.error("📜 Response Body:", errorText); 
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("📦 Parsed JSON response:", data);


            if (data.response && data.response.trim()) {
                addMessage("bot", data.response);
            } else {
                throw new Error("Empty response from server");
            }

        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            addMessage("bot", "⚠️ Sorry, something went wrong. Please try again.");
        }
        finally {

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
