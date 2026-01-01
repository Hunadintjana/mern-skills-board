import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true // allow Render domain
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/notes", notesRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")));

// ---------------- FRONTEND (PRODUCTION) ----------------
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "frontend/dist");

  // Serve static files
  app.use(express.static(frontendPath));

  // SPA catch-all
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(()=>{

    app.listen(PORT, ()=>{
        console.log("Server running at PORT:",PORT);
    })

});
