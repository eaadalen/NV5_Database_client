import { useState, useEffect } from "react";
import { ProjectCard } from "../project-card/project-card";
import { ProjectView } from "../project-view/project-view";
import { LoginView } from "../login-view/login-view";
import { InputProjectView } from "../input-project-view/input-project-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Col, Row, Form } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState(""); 

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
        <Row>
          
        </Row>
      <Row className="justify-content-md-center">
        <input type="checkbox" />
        <Routes>
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
                    <Form>
                      <Form.Control 
                        className="mx-5 mx-md-0"
                        type="search"
                        id="searchForm"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                      />
                    </Form>
                    {projects.filter((project) => { return search === "" ? project :
                      project.Title.toLowerCase().includes(search.toLowerCase()) ||
                      project.ProjectNumber.toLowerCase().includes(search.toLowerCase()) ||
                      project.Description.toLowerCase().includes(search.toLowerCase()) ||
                      project.Keywords.toLowerCase().includes(search.toLowerCase()) ||
                      project.FileLocation.toLowerCase().includes(search.toLowerCase()) ||
                      project.ProjectManager.toLowerCase().includes(search.toLowerCase()) ||
                      project.ProjectStaff.toLowerCase().includes(search.toLowerCase()) ||
                      project.Systems_and_Equipment.toLowerCase().includes(search.toLowerCase());
                    }).map((project) => (
                      <Col className="mb-4" key={project._id} md={12}>
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
            path="/projects/:projectID"
            element={
              <>
                {!user ? (<Navigate to="/login" replace />) : (
                  <Col md={12}>
                    <ProjectView 
                      user={user} 
                      token={token} 
                      setUser={setUser} 
                      projects={projects}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/input-project"
            element={
              <>
                {!user ? (<Navigate to="/login" replace />) : (
                  <Col md={12}>
                    <InputProjectView 
                      user={user} 
                      token={token} 
                      setUser={setUser} 
                      projects={projects}
                    />
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

/*
project.Keywords.toLowerCase().includes(search.toLowerCase()) ||
project.FileLocation.toLowerCase().includes(search.toLowerCase()) ||
project.ProjectManager.toLowerCase().includes(search.toLowerCase()) ||
project.ProjectStaff.toLowerCase().includes(search.toLowerCase()) ||
project.Systems_and_Equipment.toLowerCase().includes(search.toLowerCase());
*/