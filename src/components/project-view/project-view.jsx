import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./project-view.scss";

export const ProjectView = ({ user, token, projects, setUser }) => {
  const { projectID } = useParams();
  const project = projects.find((b) => b._id === projectID);
  console.log(project)

  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{project.Title}</span>
      </div>
      <div>
        <span>Project Number: </span>
        <span>{project.ProjectNumber}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{project.Description}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};