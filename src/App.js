import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";
import LogIn from "./components/LogIn.js";
import SignUp from "./components/SignUp.js";
import { useAuth } from "./components/Auth.js";

// Import the logo image
import logo from "./logo.svg";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link
                className="navbar-brand"
                to={"/"}
                style={{ marginRight: "130px" }}
              >
                <img src={logo} alt="BugHunter Logo" className="logo" />
                BugHunter
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav">
                  {currentUser ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/dashboard"}>
                          Dashboard
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/"}>
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/login"}>
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/signup"}>
                          Sign up
                        </Link>
                      </li>
                      
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <Routes>
          <Route exact path="/api" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
