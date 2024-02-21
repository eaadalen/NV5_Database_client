import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./project-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProjectView = ({ projects }) => {
  const { projectId } = useParams();
  const project = projects.find((b) => b._id === projectId);

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