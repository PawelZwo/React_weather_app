import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CityWeatherCard from "./components/CityWeatherCard";

function App() {
  const [cities, setCities] = useState([
    "auto:ip",
    "berlin",
    "paris",
    "rome",
    "barcelona",
  ]);
  const date = new Date();

  const [newCity, setNewCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setCities([...cities, newCity]);
    setNewCity("");
  };

  return (
    <Container style={{ marginTop: "1vh" }}>
      <h1>Weather now</h1>

      <h5>
        {date.toLocaleDateString([], {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}
      </h5>

      <Row
        className="justify-content-md-evenly"
        style={{ marginLeft: "0.5vw", marginTop: "1vh" }}
      >
        {cities.map((city) => {
          return <CityWeatherCard key={city} city={city} />;
        })}
      </Row>
      <Row
        style={{
          marginTop: "2vh",
          marginLeft: "10vw",
          marginRight: "10vw",
        }}
      >
        <Form onSubmit={onSubmit} className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalCity">
            <Form.Control
              type="text"
              placeholder="City"
              size="sm"
              style={{ marginBottom: "1vh" }}
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            />
            <Button type="submit" size="sm" style={{ width: "auto" }}>
              Add city
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default App;
