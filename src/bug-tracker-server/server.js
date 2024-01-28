import express from "express";
import cors from "cors";
import path from "path";
import bugRoutes from "./routes/bugRoutes.js";
// import {
//   getAllBugs,
//   createBug,
//   getBugById,
//   updateBugById,
//   deleteBugById,
// } from "./controllers/bugController.js";

const app = express();

// Middleware and other configurations...
app.use(cors());
app.use(express.json());

// Serve static files from the React app
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/public")));

// Define API routes
app.use("/api", bugRoutes);

// Route to handle fetching all bugs
// app.get("/api/getAllBugs", async (req, res) => {
//   try {
//     const bugsData = await getAllBugs();
//     res.json(bugsData);
//   } catch (error) {
//     console.error("Error fetching bugs:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
