import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth.js";
import BugTable from "./BugTable/BugTable.js";
import Modal from "./BugForm/Modal.js";
import BugForm from "./BugForm/BugForm.js";
import { auth } from "../firebase/firebase.js";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [bugs, setBugs] = useState([]);
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);

  useEffect(() => {
    // Redirect to login if not logged in
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleBugSubmit = (newBug) => {
    // Add the new bug to the state
    setBugs((prevBugs) => [newBug, ...prevBugs]);
    // Close the bug form modal
    setIsBugFormOpen(false);
  };

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      <button onClick={() => auth.signOut()}>Sign out</button>

      <button onClick={() => setIsBugFormOpen(!isBugFormOpen)}>
        {isBugFormOpen ? "Close Form" : "Open Bug Form"}
      </button>

      <Modal onClose={() => setIsBugFormOpen(false)} show={isBugFormOpen}>
        <BugForm
          onBugSubmit={handleBugSubmit}
          onClose={() => setIsBugFormOpen(false)}
        />
      </Modal>
      <BugTable />
    </div>
  );
};

export default Dashboard;
