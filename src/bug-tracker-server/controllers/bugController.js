import { firestore } from "../../firebase/firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Bug from "../models/Bug.js";

// Get all bugs
export const getAllBugs = async (req, res) => {
  try {
    const bugsCollection = collection(firestore, "bugs");
    const bugsSnapshot = await getDocs(bugsCollection);

    const bugs = bugsSnapshot.docs.map((doc) => {
      const bugData = doc.data();
      return new Bug(
        bugData.id,
        bugData.title,
        bugData.author,
        bugData.category,
        bugData.priority,
        bugData.description,
        bugData.status,
        bugData.createdAt
      );
    });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a bug
export const createBug = async (req, res) => {
  try {
    const newBugData = req.body;
    const bugsCollection = collection(firestore, "bugs");
    const newBugRef = await addDoc(bugsCollection, {
      ...new Bug(
        null, // ID will be assigned by Firestore
        newBugData.title,
        newBugData.author,
        newBugData.category,
        newBugData.priority,
        newBugData.description,
        "Open", // Default status
        new Date() // Current timestamp for createdAt
      ).toObject(),
    });

    // Update the document with the auto-generated ID
    await updateDoc(newBugRef, { id: newBugRef.id });

    res
      .status(201)
      .json({ message: "Bug created successfully", id: newBugRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific bug by ID
export const getBugById = async (req, res) => {
  try {
    const bugId = req.params.id;
    const bugDocRef = doc(firestore, "bugs", bugId);
    const bugDoc = await getDoc(bugDocRef);

    if (!bugDoc.exists) {
      return res.status(404).json({ error: "Bug not found" });
    }

    const bugData = bugDoc.data();
    const bug = new Bug(
      bugDoc.id,
      bugData.title,
      bugData.author,
      bugData.category,
      bugData.priority,
      bugData.description,
      bugData.status,
      bugData.createdAt
    );

    res.json(bug);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bug by ID
export const updateBugById = async (req, res) => {
  try {
    const bugId = req.params.id;
    const updatedBugData = req.body;

    // Validate that the bug exists
    const bugDocRef = doc(firestore, "bugs", bugId);
    const bugDoc = await getDoc(bugDocRef);

    if (!bugDoc.exists()) {
      return res.status(404).json({ error: "Bug not found" });
    }

    // Update bug data
    await updateDoc(bugDocRef, updatedBugData);

    res.json({ message: "Bug updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a bug by ID
export const deleteBugById = async (req, res) => {
  try {
    const bugId = req.params.id;

    // Validate that the bug exists
    const bugDocRef = doc(firestore, "bugs", bugId);
    const bugDoc = await getDoc(bugDocRef);

    if (!bugDoc.exists()) {
      return res.status(404).json({ error: "Bug not found" });
    }

    // Delete the bug
    await deleteDoc(bugDocRef);

    res.json({ message: "Bug deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
