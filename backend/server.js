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

  const buildPath = path.join(__dirname, "frontend", "build");
  app.use(express.static(buildPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
} else {
  // In development mode, serve this message on the root route
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
