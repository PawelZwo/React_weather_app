import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {apiKey} from "../apiKey";
import Spinner from "react-bootstrap/Spinner";

export default function CityWeatherCard({city}) {

  const [cityData, setCityData] = useState(null);

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;

  const [isLoading, setIsLoading] = useState({});

  const fetchApi = async () => {
    await fetch(apiUrl + `&q=${city}`)
      .then(res => res.json())
      .then(data => {
          setCityData({
            temp_c: data.current.temp_c,
            pressure_mb: data.current.pressure_mb,
            icon: data.current.condition.icon,
            text: data.current.condition.text,
            name: data.location.name,
          })
        }
      )
      .catch(error => console.error(error))
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return !isLoading ?
    (
      <Card style={{width: '10rem', marginLeft: "-10px", marginRight: "20px", marginTop: "10px"}}>
        <Card.Img variant="top" src={cityData.icon} style={{width: "64px", height: "64px"}}/>
        <Card.Body>
          <Card.Subtitle>{cityData.text}</Card.Subtitle>
          <Card.Title>{cityData.name}</Card.Title>
          <Card.Text>
            {cityData.temp_c}&#176;C <br/>
            {cityData.pressure_mb} hPa
          </Card.Text>
        </Card.Body>
      </Card>
    ) : <Spinner animation="border"/>
}