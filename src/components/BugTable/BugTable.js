import React, { useEffect, useState } from "react";
import Modal from "../BugForm/Modal.js";
import BugForm from "../BugForm/BugForm.js";
import "./BugTable.css";

const fetchBugs = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/getAllBugs");
    if (response.ok) {
      const bugsData = await response.json();
      return bugsData;
    } else {
      console.error("Error fetching bugs:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching bugs:", error);
    return [];
  }
};

const BugTable = () => {
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const bugsData = await fetchBugs();
      setBugs(bugsData);
    };

    fetchData();
  }, []);

  const handleBugClick = (bug) => {
    setSelectedBug(bug);
  };

  const handleCloseDetails = () => {
    setSelectedBug(null);
  };

  const handleDelete = async (bugId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteBug/${bugId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the bugs state after successful deletion
        const updatedBugs = bugs.filter((bug) => bug.id !== bugId);
        setBugs(updatedBugs);
        setSelectedBug(null); // Close bug details after deletion
        console.log("Bug deleted successfully");
      } else {
        console.error("Error deleting bug:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  const handleUpdate = (bug) => {
    setSelectedBug(bug);
    setUpdateModalOpen(true);
  };

  const onUpdateSubmit = (updatedBug) => {
    // Update the bugs state after successful update
    setBugs((prevBugs) =>
      prevBugs.map((bug) => (bug.id === updatedBug.id ? updatedBug : bug))
    );
    setSelectedBug(null);
    setUpdateModalOpen(false);
    console.log("Bug updated successfully:", updatedBug);
  };

  return (
    <div>
      <h3>Bug Table</h3>
      <div className="bug-table">
        <div className="bug-column open-column">
          <div className="bug-column-header">Open</div>
          {bugs
            .filter((bug) => bug.status === "Open")
            .map((bug) => (
              <div
                key={bug.id}
                className="bug-box"
                onClick={() => handleBugClick(bug)}
              >
                <p>{`Bug ${bug.id}`}</p>
                <p>{bug.title}</p>
                {bug.createdAt && (
                  <p>{`Created at: ${new Date(
                    bug.createdAt.seconds * 1000 +
                      bug.createdAt.nanoseconds / 1000000
                  ).toLocaleString("en-AU", {
                    timeZone: "Australia/Sydney",
                  })}`}</p>
                )}
              </div>
            ))}
        </div>

        <div className="bug-column in-progress-column">
          <div className="bug-column-header">In Progress</div>
          {bugs
            .filter((bug) => bug.status === "In Progress")
            .map((bug) => (
              <div
                key={bug.id}
                className="bug-box"
                onClick={() => handleBugClick(bug)}
              >
                <p>{`Bug ${bug.id}`}</p>
                <p>{bug.title}</p>
                {bug.createdAt && (
                  <p>{`Created at: ${new Date(
                    bug.createdAt.seconds * 1000 +
                      bug.createdAt.nanoseconds / 1000000
                  ).toLocaleString("en-AU", {
                    timeZone: "Australia/Sydney",
                  })}`}</p>
                )}
              </div>
            ))}
        </div>

        <div className="bug-column resolved-column">
          <div className="bug-column-header">Resolved</div>
          {bugs
            .filter((bug) => bug.status === "Resolved")
            .map((bug) => (
              <div
                key={bug.id}
                className="bug-box"
                onClick={() => handleBugClick(bug)}
              >
                <p>{`Bug ${bug.id}`}</p>
                <p>{bug.title}</p>
                {bug.createdAt && (
                  <p>{`Created at: ${new Date(
                    bug.createdAt.seconds * 1000 +
                      bug.createdAt.nanoseconds / 1000000
                  ).toLocaleString("en-AU", {
                    timeZone: "Australia/Sydney",
                  })}`}</p>
                )}
              </div>
            ))}
        </div>
      </div>

      {selectedBug && (
        <div className={`bug-details ${selectedBug ? "active" : ""}`}>
          <h3>{`Bug ${selectedBug.id} Details`}</h3>
          <p>Title: {selectedBug.title}</p>
          <p>Author: {selectedBug.author}</p>
          <p>Category: {selectedBug.category}</p>
          <p>Priority: {selectedBug.priority}</p>
          <p>Description: {selectedBug.description}</p>
          {selectedBug.createdAt && (
            <p>{`Created at: ${new Date(
              selectedBug.createdAt.seconds * 1000 +
                selectedBug.createdAt.nanoseconds / 1000000
            ).toLocaleString("en-AU", {
              timeZone: "Australia/Sydney",
            })}`}</p>
          )}
          <button onClick={() => handleUpdate(selectedBug)}>Update</button>
          <button onClick={() => handleDelete(selectedBug.id)}>Delete</button>
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}

      {/* Update Modal */}
      <Modal onClose={() => setUpdateModalOpen(false)} show={isUpdateModalOpen}>
        <BugForm
          onUpdateSubmit={onUpdateSubmit}
          selectedBug={selectedBug}
          onClose={() => setUpdateModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default BugTable;
