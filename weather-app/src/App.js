import React, {useEffect, useState} from "react";
// import {Data} from "./components/Main";
import {apiKey} from "./apiKey";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";

let autoIp = "auto:ip";

function Data() {
  const [city, setCity] = useState()

  let apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city ? city : autoIp}&aqi=no`;

  const [cityData, setCityData] = useState(null);

  const fetchApi = async () => {
    await fetch(apiUrl)
      .then(res => res.json())
      .then(data => setCityData(data))
      .catch(error => console.error(error))
  };

  useEffect(() => {
    fetchApi();
  }, [])

  if (cityData) {
    return (
      <Card>
        <Card.Img variant="top" src={cityData.current.condition.icon}/>
        <Card.Body>
          {cityData.current.condition.text}
          <Card.Title>{cityData.location.name}, {cityData.location.country}</Card.Title>
          <Card.Text>{cityData.current.temp_c}&#176;C</Card.Text>
        </Card.Body>
      </Card>
    )
  }
  return <Spinner animation="border"/>;
}

function App() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h1>Pogoda teraz</h1>
          <Data/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;