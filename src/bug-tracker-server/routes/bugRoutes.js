import express from "express";
import {
  getAllBugs,
  createBug,
  getBugById,
  updateBugById,
  deleteBugById,
} from "../controllers/bugController.js";

const router = express.Router();

// Get all bugs
router.get("/getAllBugs", getAllBugs);

// Create a bug
router.post("/createBug", createBug);

// Get a specific bug by ID
router.get("/getBugById/:id", getBugById);

// Update a bug by ID
router.put("/updateBug/:id", updateBugById);

// Delete a bug by ID
router.delete("/deleteBug/:id", deleteBugById);

export default router;
