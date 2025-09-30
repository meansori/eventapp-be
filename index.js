require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const acaraRoutes = require("./routes/acaraRoutes");
const pesertaRoutes = require("./routes/pesertaRoutes");
const absensiRoutes = require("./routes/absensiRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/acara", acaraRoutes);
app.use("/peserta", pesertaRoutes);
app.use("/absensi", absensiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
