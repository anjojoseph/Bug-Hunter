import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth.js";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const { currentUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
    } catch (error) {
      alert(error);
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
            <h2>Log In</h2>

            <div className="mb-3">
              <label for="email">Email address</label>
              <input
                type="email"
                name="email"
                required
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-3">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                required
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
