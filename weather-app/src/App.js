import React, {useState} from "react";
// import {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CityWeatherCard from "./components/CityWeatherCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const [cities, setCities] = useState(["auto:ip", "berlin", "paris", "rome", "barcelona"]);
  // const [time, setTime] = useState(new Date());
  const date = new Date();
  const [newCity, setNewCity] = useState("");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTime(new Date())
  //   }, 60000);
  //   return () => clearTimeout(timer)
  // }, []);

  const onSubmit = e => {
    e.preventDefault();
    setCities([...cities, newCity])
    setNewCity("");
  }

  return (
    <Container style={{marginTop: "10px"}}>
      <h1>Weather now</h1>

      {/*<h5>Current time:<br/>*/}
      <h5>
        {/*{time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})},&nbsp;*/}
        {date.toLocaleDateString([], {day: "numeric", month: "numeric", year: "numeric"})}
      </h5>

      <Row className="justify-content-md-evenly" style={{marginLeft: "10px", marginTop: "10px"}}>
        {
          cities.map((city) => {
            return <CityWeatherCard key={city} city={city}/>
          })
        }
      </Row>
      <Row style={{marginTop: "20px"}}>
        <Form onSubmit={onSubmit} className="mb-3">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalCity">
            <Form.Control type="text" placeholder="City" value={newCity}
                          onChange={e => setNewCity(e.target.value)}/>
            <Button type="submit">Add city</Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default App;