import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./project-card.scss";

export const ProjectCard = ({ project, token, setUser, user }) => {
  const addFavorite = () => {
		fetch(
      "https://blooming-gorge-72776-95bc6a7cbd30.herokuapp.com/" + String(user.Username) + "/profiles/" + String(project._id),
      {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then(async(response) => {
			if (response.ok) {
        const data = await response.json();
        setUser(data);
				alert(String(project.Title) + " added to favorites");
			} else {
				alert("Failed to add " + String(project.Title) + " to favorites");
			}
		})
	}

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{project.Title}</Card.Title>
        <Card.Text>{project.ProjectNumber}</Card.Text>
        <Card.Text>{project.Description}</Card.Text>
        <Link to={`/projects/${encodeURIComponent(project._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired
};