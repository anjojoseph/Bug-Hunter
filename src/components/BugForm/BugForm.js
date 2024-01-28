import React, { useEffect, useState } from "react";
import "./BugForm.css";

const BugForm = ({ onUpdateSubmit, selectedBug, onBugSubmit, onClose }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const categories = [
    "Backend",
    "UI/UX",
    "Functionality",
    "Performance",
    "Security",
    "Others",
  ];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Open", "In Progress", "Resolved"];

  useEffect(() => {
    if (onUpdateSubmit && selectedBug) {
      setId(selectedBug.id);
      setTitle(selectedBug.title || "");
      setAuthor(selectedBug.author || "");
      setCategory(selectedBug.category || "");
      setPriority(selectedBug.priority || "");
      setDescription(selectedBug.description || "");
      setStatus(selectedBug.status || "");
    }
  }, [onUpdateSubmit, selectedBug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBug) {
      // If selectedBug is present, call handleUpdate
      handleUpdate();
    } else {
      try {
        // If selectedBug is not present, submit a new bug
        // Prepare bug data
        const bugData = {
          title,
          author,
          category,
          priority,
          description,
          status,
        };

        // Make a POST request to your server-side API
        const response = await fetch("http://localhost:5000/api/createBug", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bugData),
        });

        if (response.ok) {
          // Bug successfully created on the server
          const newBug = await response.json();

          // Notify parent component about the new bug

          onBugSubmit(newBug);

          // Close the modal using the onClose prop
          onClose();

          // Clear form fields
          setTitle("");
          setAuthor("");
          setCategory("");
          setPriority("");
          setDescription("");
        } else {
          // Handle error if bug creation fails
          console.error("Error submitting bug:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting bug:", error);
        throw error;
      }
    }
  };

  const handleUpdate = async (e) => {
    // Make a PUT request to update the bug
    try {
      // Updated bug data
      const updatedBugData = {
        title,
        author,
        category,
        priority,
        description,
        status,
      };
      console.log("ID:", id);
      console.log("Updated Bug Data:", updatedBugData);

      const response = await fetch(
        `http://localhost:5000/api/updateBug/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBugData),
        }
      );

      if (response.ok) {
        // Bug successfully updated on the server
        const updatedBug = await response.json();

        // Notify parent component about the updated bug
        onUpdateSubmit(updatedBug);

        // Close the modal using the onClose prop
        onClose();

        // Clear form fields
        setTitle("");
        setAuthor("");
        setCategory("");
        setPriority("");
        setDescription("");
        setStatus("");
      } else {
        // Handle error if bug update fails
        console.error("Error updating bug:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating bug:", error);
    }
  };

  return (
    <div className="bug-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          {statuses.map((status) => (
            <option key={status} value={status} defaultValue="Open">
              {status}
            </option>
          ))}
        </select>

        {/* <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            selectedBug ? handleUpdate(selectedBug.Id) : handleSubmit();
          }}
        >
          {selectedBug ? "Update Bug" : "Submit Bug"}
        </button> */}
        <button type="submit">
          {selectedBug ? "Update Bug" : "Submit Bug"}
        </button>
      </form>
    </div>
  );
};

export default BugForm;
