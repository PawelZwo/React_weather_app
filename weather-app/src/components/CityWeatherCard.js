import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { apiKey } from "../apiKey";
import Spinner from "react-bootstrap/Spinner";
import { WiThermometer, WiBarometer } from "react-icons/wi";
// import { FiDelete } from "react-icons/fi";
import CityForecastCardgroup from "./CityForecastCardgroup";

export default function CityWeatherCard({ city }) {
  const [cityData, setCityData] = useState(null);
  const [cityForecast, setCityForecast] = useState(null);

  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=5`;

  const [isLoading, setIsLoading] = useState({});


  const fetchApi = async () => {
    await fetch(apiUrl + `&q=${city}`)
      .then((res) => res.json())
      .then((data) => {
        // console.error("Fetch API");
        // console.log(data);
        setCityData({
          temp_c: data.current.temp_c,
          pressure_mb: data.current.pressure_mb,
          icon: data.current.condition.icon,
          text: data.current.condition.text,
          name: data.location.name,
        });
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
  };

  const fetchForecastApi = async () => {
    await fetch(apiUrl + `&q=${cityData.name}`)
      .then((res) => res.json())
      .then((data) => {
        console.error("Fetch Forecast API");
        console.log(data.forecast.forecastday);
        return setCityForecast(data.forecast.forecastday);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchApi();
    return () => {
      new AbortController().abort()
    };
  }, []);

  return !isLoading ? (
    <Card
      style={{
        width: "10vw",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1.5vh",
      }}
      onClick={() => fetchForecastApi()}
    >
      <Card.Img
        variant="top"
        src={cityData.icon}
        style={{ width: "60%", height: "60%" }}
      />
      <Card.Body>
        <Card.Subtitle>{cityData.text}</Card.Subtitle>
        <Card.Title>{cityData.name}</Card.Title>
        <Card.Text>
          <WiThermometer />
          {cityData.temp_c}&#176;C <br />
          <WiBarometer />
          {cityData.pressure_mb} hPa
        </Card.Text>
      </Card.Body>
    </Card>
  ) : (
    <Spinner
      animation="border"
      style={{ marginTop: "5rem", marginBottom: "2rem" }}
    />
  );
}
