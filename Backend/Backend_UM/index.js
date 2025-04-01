const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Mount auth routes under /api/auth
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
