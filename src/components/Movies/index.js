import React, { useState } from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

const Movies = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const result = await response.json();
    setData(result);
    // console.log(data);
  };
  return (
    <div>
      <h1 className="heading">Movies List</h1>
      <ul className="list-container">
        {data.map((movie) => (
          <li className="list-item">
            <Card style={{ width: "18rem" }} key={movie.show.id}>
              <Card.Img
                variant="top"
                src={
                  movie.show && movie.show.image && movie.show.image.medium
                    ? movie.show.image.medium
                    : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?size=626&ext=jpg"
                }
                alt={movie.show && movie.show.name}
              />

              <Card.Body>
                <Card.Title>{movie.show.name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Language : {movie.show.language}
                </ListGroup.Item>
                <ListGroup.Item>
                  Rating :{" "}
                  {movie.show.rating.average
                    ? movie.show.rating.average
                    : "No ratings given"}
                </ListGroup.Item>
              </ListGroup>

              <Button
                onClick={() =>
                  navigate(`/movieId/${movie.show.id}`, {
                    state: { data: movie },
                  })
                }
                variant="primary"
              >
                View Details
              </Button>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
