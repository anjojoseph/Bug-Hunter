import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      console.log("start");
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      console.log("done");
      setCurrentUser(true);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="mb-3">
              <label for="email">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
