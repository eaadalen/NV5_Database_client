import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../movie-view/movie-view.scss";

export const UpdateView = ({ user }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user.Username);

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(
      "https://desolate-everglades-87695-c2e8310ae46d.herokuapp.com/users/" + String(user.Username),
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      }
    ).then((response) => {
      if (response.ok) {
        alert("Info Update Successful");
        window.location.reload();
      } else {
        alert("Info Update Failed");
      }
    });
  };

  return (
    <Container>
        <Row>
            <Link to={"/profile/" + String(user._id)}>
                <Button variant="primary" type="back-button">
                    Back
                </Button>
            </Link>
        </Row>
        <Row>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>New Birthday:</Form.Label>
                <Form.Control
                type="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Row>
    </Container>
  );
};