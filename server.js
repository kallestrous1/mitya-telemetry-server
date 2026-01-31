
// Load environment variables (.env)
require("dotenv").config();

const db = require("./database");
const eventStore = require("./eventStore");
const express = require("express");
const app = express();

// Parse JSON bodies
app.use(express.json());

app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong");
});

function requireApiKey(req, res, next) {
    const key = req.header("X-API-Key");

    if (!key || key !== process.env.API_KEY) {
        return res.status(401).send("Unauthorized");
    }

    next();
}

let events = eventStore.loadEvents();

app.post("/events", requireApiKey, (req, res) => {
    const payload = req.body.events;

    // Safety check
    if (!Array.isArray(payload)) {
        return res.status(400).send("Expected an array of events");
    }

    // Optional: basic validation
    for (const evt of payload) {
        if (!evt.eventType|| !evt.eventData || !evt.timestamp || !evt.playerId || !evt.sessionId) {
            return res.status(400).send("Invalid event format");
        }
    }

    db.insertEvents(payload);
    res.sendStatus(200);
    console.log(payload);

    res.sendStatus(200);
});

app.get("/events", (req, res) => {
    db.getAllEvents((err, rows) => {
        if (err) {
            return res.status(500).send("DB error");
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});