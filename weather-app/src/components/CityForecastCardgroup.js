import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { WiThermometer, WiHumidity } from "react-icons/wi";

export default function CityForecastCardgroup({ city }) {
  return (
    <CardGroup>
      {city.map((day, index) => {
        return (
          <Card
            style={{
              width: "14vw",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1.5vh",
            }}
            key={index}
          >
            <Card.Img
              variant="top"
              src={city.day.condition.icon}
              style={{ width: "60%", height: "60%" }}
            />
            <Card.Body>
              <Card.Title>{city.day.condition.text}</Card.Title>
              <Card.Subtitle>{city.date}</Card.Subtitle>
              <Card.Text>
                <WiThermometer />
                {city.day.avgtemp_c}&#176;C <br />
                <WiHumidity />
                {city.day.avghumidity}%
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </CardGroup>
  );
}
