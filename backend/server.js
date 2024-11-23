import  express from "express"
import  path from "path";
import  dotenv from "dotenv";
import  cors from "cors";
import  bodyParser from "body-parser";
import  connectDB from "./config/db.js";
import  partnerRoutes from "./routes/partnerRoutes.js";

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/partners", partnerRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
