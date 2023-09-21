import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {apiKey} from "../apiKey";

export function CityWeatherCard({city}) {

  const [cityData, setCityData] = useState(null);

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;

  const fetchApi = async () => {
    await fetch(apiUrl + `&q=${city}`)
      .then(res => res.json())
      .then(data => setCityData(data))
      .catch(error => console.error(error))
  };

  // const fetchData = async () => {
  //   const res = await fetch(apiUrl + `&q=${city}`);
  //   const data = await res.json();
  //   setCityData(data)
  // }

  useEffect(() => {
    fetchApi();
  }, []);

  if (cityData) {
    return (
      <Card style={{width: '10rem', marginRight: "10px", marginTop: "10px"}}>
        <Card.Img variant="top" src={cityData.current.condition.icon} style={{width: "64px", height: "64px"}}/>
        <Card.Body>
          <Card.Subtitle>{cityData.current.condition.text}</Card.Subtitle>
          <Card.Title>{cityData.location.name}</Card.Title>
          <Card.Text>
            {cityData.current.temp_c}&#176;C <br/>
            {/*{cityData.current.wind_kph} km/h {cityData.current.wind_dir}<br/>*/}
            {cityData.current.pressure_mb} hPa
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}