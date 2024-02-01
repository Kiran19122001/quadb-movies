import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
// import { localStorage } from "localStorage";

const MovieDetails = () => {
  const location = useLocation();
  const { show } = location.state.data;
  const [showPopup, setShowPopup] = useState(false);
  const [movieName, setName] = useState("");
  const [movieEmail, setEmail] = useState("");
  const [movieNumber, setNumber] = useState("");

  // Remove HTML tags using regular expression
  const summaryWithoutTags = show.summary.replace(/<[^>]+>/g, "");

  console.log(show);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (
      localStorage.getItem("movie") !== undefined &&
      localStorage.getItem("movie") !== null
    ) {
      const movie = JSON.parse(localStorage.getItem("movie"));
      console.log(movie);
      setName(movie.name);
      setEmail(movie.email);
      setNumber(movie.number);
    }
  }, []);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    if (name === "moviename") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };
  const handleBooking = (event) => {
    event.preventDefault();
    const movie = {
      name: movieName,
      email: movieEmail,
      number: movieNumber,
    };
    console.log(movie, movieName, movieEmail, movieNumber);
    const movieJSON = JSON.stringify(movie);
    localStorage.setItem("movie", movieJSON);
    setShowPopup(false);
  };

  return (
    <div className="d-flex movie-item-container">
      <img
        src={show?.image?.original}
        alt={show.name}
        style={{ height: "1000px", width: "50%" }}
      />
      <div className="content-container-inner">
        <h1>Movie Name : {show.name}</h1>
        <h3>Discription :</h3>
        <p> {summaryWithoutTags}</p>
        <p>Language : {show.language}</p>
        <p>
          {" "}
          Rating :{" "}
          {show.rating.average ? show.rating.average : "No ratings given"}
        </p>
        <p>Status : {show.status}</p>
        <p>premiered : {show.premiered}</p>
        <p>Ended : {show.ended}</p>
        <p>Runtime : {show.runtime}min</p>

        <p>
          Official Site : {<a href={show.officialSite}>{show.officialSite}</a>}
        </p>
        <p>Type : {show.type}</p>

        <Button
          variant="primary"
          className="popup-button"
          onClick={handleOpenPopup}
        >
          Book a Ticket
        </Button>

        <Modal show={showPopup} onHide={handleClosePopup}>
          <Modal.Header closeButton>
            <Modal.Title>Movie : {show.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleBooking}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  name="moviename"
                  placeholder="Enter your name"
                  required
                  value={movieName}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={movieEmail}
                  placeholder="name@example.com"
                  required
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="number"
                  type="tel"
                  value={movieNumber}
                  placeholder="Enter your Mobile Number"
                  required
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Book
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default MovieDetails;
