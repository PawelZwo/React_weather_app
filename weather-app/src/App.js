import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {CityWeatherCard} from "./components/CityWeatherCard";

function App() {
  const cities = ["auto:ip", "poznan", "gdansk", "lodz", "szczecin"];
  const [time, setTime] = useState(new Date());
  const date = new Date();

  setTimeout(() => {
    setTime(new Date())
  }, 60000);

  return (
    <Container style={{marginTop: "10px"}}>
      <h1>Pogoda teraz</h1>

      <h5>Aktualny czas:<br/>
        {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})},&nbsp;
        {date.toLocaleDateString([], {day: "numeric", month: "numeric", year: "numeric"})}
      </h5>

      <Row className="justify-content-md-evenly" style={{marginLeft: "10px"}}>
        {
          cities.map((city) => {
            return <CityWeatherCard key={city.toLowerCase()} city={city.toLowerCase()}/>
          })
        }
      </Row>

    </Container>
  );
}

export default App;