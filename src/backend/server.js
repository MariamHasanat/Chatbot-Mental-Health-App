const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (temporary fix)
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, ngrok-skip-browser-warning");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
    next();
});

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, ngrok-skip-browser-warning");
    res.status(204).send();
});

app.post("/chat", (req, res) => {
    try {
        console.log("📨 Received message:", req.body);

        if (!req.body || !req.body.message) {
            return res.status(422).json({ error: "Missing 'message' field in request body." });
        }

        const botResponse = `I received: "${req.body.message}". This is a sample response.`;

        res.header("Access-Control-Allow-Origin", "*"); // Ensure response includes CORS headers
        res.json({ response: botResponse });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
