import { useState, useEffect } from "react";
import { ProjectCard } from "../project-card/project-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { UpdateView } from "../profile-view/update-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(
      "https://blooming-gorge-72776-95bc6a7cbd30.herokuapp.com/projects",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : projects.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {projects.map((project) => (
                      <Col className="mb-4" key={project._id} md={3}>
                        <ProjectCard 
                          project={project}
                          token={token}
                          setUser={setUser}
                          user={user} 
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile/:userID/updateinfo"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <UpdateView user={user}/>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};