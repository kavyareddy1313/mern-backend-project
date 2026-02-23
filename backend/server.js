const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend is reachable" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
    // console.log(`🚀 Server strictly running on http://127.0.0.1:${PORT}`);
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS is enabled for all origins.`);
});
