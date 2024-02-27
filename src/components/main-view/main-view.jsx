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

  const [isChecked_all, setIsChecked_all] = useState(false);
  const [isChecked_title, setIsChecked_title] = useState(false);
  const [isChecked_projectnumber, setIsChecked_projectnumber] = useState(false);
  const [isChecked_description, setIsChecked_description] = useState(false);
  const [isChecked_keywords, setIsChecked_keywords] = useState(false);
  const [isChecked_filelocation, setIsChecked_filelocation] = useState(false);
  const [isChecked_projectmanager, setIsChecked_projectmanager] = useState(false);
  const [isChecked_projectstaff, setIsChecked_projectstaff] = useState(false);
  const [isChecked_systems_and_equipment, setIsChecked_systems_and_equipment] = useState(false);

  const handleCheckboxChange_all = (e) => {setIsChecked_all(e.target.checked);};
  const handleCheckboxChange_title = (e) => {setIsChecked_title(e.target.checked);};
  const handleCheckboxChange_projectnumber = (e) => {setIsChecked_projectnumber(e.target.checked);};
  const handleCheckboxChange_description = (e) => {setIsChecked_description(e.target.checked);};
  const handleCheckboxChange_keywords = (e) => {setIsChecked_keywords(e.target.checked);};
  const handleCheckboxChange_filelocation = (e) => {setIsChecked_filelocation(e.target.checked);};
  const handleCheckboxChange_projectmanager = (e) => {setIsChecked_projectmanager(e.target.checked);};
  const handleCheckboxChange_projectstaff = (e) => {setIsChecked_projectstaff(e.target.checked);};
  const handleCheckboxChange_systems_and_equipment = (e) => {setIsChecked_systems_and_equipment(e.target.checked);};

  const filter_projects = () => {
    var filter_title = [];
    var filter_projectnumber = [];

    filter_title = projects.filter((project) => { 
        return (
          search === "" ? 
          project :
          project.Title.toLowerCase().includes(search.toLowerCase())
        )
      })

    filter_projectnumber = projects.filter((project) => { 
      return (
        search === "" ? 
        project :
        project.ProjectNumber.toLowerCase().includes(search.toLowerCase())
      )
    })
    
    var test = projects.filter((project) => { return search === "" ? project :
        project.Title.toLowerCase().includes(search.toLowerCase()) ||
        project.ProjectNumber.toLowerCase().includes(search.toLowerCase()) ||
        project.Description.toLowerCase().includes(search.toLowerCase()) ||
        project.Keywords.toLowerCase().includes(search.toLowerCase()) ||
        project.FileLocation.toLowerCase().includes(search.toLowerCase()) ||
        project.ProjectManager.toLowerCase().includes(search.toLowerCase()) ||
        project.ProjectStaff.toLowerCase().includes(search.toLowerCase()) ||
        project.Systems_and_Equipment.toLowerCase().includes(search.toLowerCase());
      })

    return test;
  }

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
        <p></p>
      </Row>
      <Row className="justify-content-md-center">
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
                      <div className="d-flex justify-content-evenly">
                      <div>
                      <Form.Check
                          type="checkbox"
                          id={`all`}
                          label={`All`}
                          checked={isChecked_all}
                          onChange={handleCheckboxChange_all}
                        />
                      </div>
                      <div className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id={`title`}
                          label={`Title`}
                          checked={isChecked_all || isChecked_title}
                          onChange={handleCheckboxChange_title}
                        />
                        <Form.Check
                          type="checkbox"
                          id={`projectnumber`}
                          label={`Project Number`}
                          checked={isChecked_all || isChecked_projectnumber}
                          onChange={handleCheckboxChange_projectnumber}
                        />
                      </div>
                      <div>
                        <Form.Check
                          type="checkbox"
                          id={`description`}
                          label={`Description`}
                          checked={isChecked_all || isChecked_description}
                          onChange={handleCheckboxChange_description}
                        />
                        <Form.Check
                          type="checkbox"
                          id={`keywords`}
                          label={`Keywords`}
                          checked={isChecked_all || isChecked_keywords}
                          onChange={handleCheckboxChange_keywords}
                        />
                      </div>
                      <div>
                        <Form.Check
                          type="checkbox"
                          id={`filelocation`}
                          label={`File Location`}
                          checked={isChecked_all || isChecked_filelocation}
                          onChange={handleCheckboxChange_filelocation}
                        />
                        <Form.Check
                          type="checkbox"
                          id={`projectmanager`}
                          label={`Project Manager`}
                          checked={isChecked_all || isChecked_projectmanager}
                          onChange={handleCheckboxChange_projectmanager}
                        />
                      </div>
                      <div>
                        <Form.Check
                          type="checkbox"
                          id={`projectstaff`}
                          label={`Project Staff`}
                          checked={isChecked_all || isChecked_projectstaff}
                          onChange={handleCheckboxChange_projectstaff}
                        />
                        <Form.Check
                          type="checkbox"
                          id={`systems_and_equipment`}
                          label={`Systems and Equipment`}
                          checked={isChecked_all || isChecked_systems_and_equipment}
                          onChange={handleCheckboxChange_systems_and_equipment}
                        />
                      </div>
                      </div>
                    </Form>
                    <Form>
                      <Form.Control 
                        className="mx-5 mx-md-0"
                        type="search"
                        id="searchForm"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                      />
                    </Form>
                    <p></p>
                    {filter_projects().map((project) => (
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