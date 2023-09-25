import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {apiKey} from "../apiKey";
import {Spinner} from "react-bootstrap";

export default function CityWeatherCard({city}) {

  const [cityData, setCityData] = useState(null);

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;

  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = async () => {
    await fetch(apiUrl + `&q=${city}`)
      .then(res => res.json())
      .then(data => setCityData(data))
      .catch(error => console.error(error))
    setIsLoading(false);
  };

  const {temp_c, pressure_mb} = cityData?.current || {};
  const {icon, text} = cityData?.current?.condition || {};

  useEffect(() => {
    fetchApi();
  }, []);

  return !isLoading ?
    (
      <Card style={{width: '10rem', marginLeft: "-10px", marginRight: "20px", marginTop: "10px"}}>
        <Card.Img variant="top" src={icon} style={{width: "64px", height: "64px"}}/>
        <Card.Body>
          <Card.Subtitle>{text}</Card.Subtitle>
          <Card.Title>{cityData.location.name}</Card.Title>
          <Card.Text>
            {temp_c}&#176;C <br/>
            {pressure_mb} hPa
          </Card.Text>
        </Card.Body>
      </Card>
    ) : <Spinner animation="border"/>
}