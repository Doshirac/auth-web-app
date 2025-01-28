// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const authMiddleware = require("./middlewares/authMiddleware");

// dotenv.config();
// const app = express();
// const SERVER_PORT = process.env.SERVER_PORT;

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", authMiddleware, userRoutes);

// app.listen(SERVER_PORT, () => {
//   console.log(`Server is running on http://localhost:${SERVER_PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  "http://localhost:3000",
  "http://your-frontend-domain.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is accessible on port ${PORT}`);
});
