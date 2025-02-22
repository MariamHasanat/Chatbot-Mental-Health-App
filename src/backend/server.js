const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const EXTERNAL_API = "https://a4f9-34-80-234-242.ngrok-free.app/chat";

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        // استخدام fetch المدمج في Node.js
        const response = await fetch(EXTERNAL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch response from external API");
        }

        const data = await response.json();
        res.json({ reply: data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "⚠️ Server error. Try again later." });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
