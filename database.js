const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "telemetry.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to DB", err);
    } else {
        console.log("Connected to SQLite DB");
    }
});

// Create table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            eventType TEXT NOT NULL,
            eventData TEXT NOT NULL,
            timestamp INTEGER NOT NULL,
            playerId TEXT NOT NULL,
            sessionId TEXT NOT NULL,
            runId TEXT,
            payload TEXT
        )
    `);
});

function insertEvents(events) {
    const stmt = db.prepare(
        "INSERT INTO events (eventType, eventData, timestamp, playerId, sessionId, runId, payload) VALUES (?, ?, ?,?, ?, ?, ?)"
    );

   for (const evt of events) {
        let payload = null;
        
        if (evt.payload) {
            payload =
                typeof evt.payload === "string"
                    ? JSON.parse(evt.payload)
                    : evt.payload;
        }

        stmt.run(
            evt.eventType,
            evt.eventData,
            evt.timestamp,
            evt.playerId,
            evt.sessionId,
            evt.runId ?? null,
            payload ? JSON.stringify(payload) : null
        );
    }

    stmt.finalize();
}

function getAllEvents(callback) {
    db.all("SELECT * FROM events ORDER BY timestamp ASC", callback);
}

module.exports = {
    insertEvents,
    getAllEvents
};
