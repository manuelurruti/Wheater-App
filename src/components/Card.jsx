import "./Card.css";
import React, { useState, useEffect } from "react";

function Card() {
    const apiKey = "134d26ac91119b88ca2ffc3d8cb365ea";
    const [temperatura, setTemperatura] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [icono, setIcono] = useState("");
    const [city, setCity] = useState("");
    const [url, setUrl] = useState(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const handleFilterBySearch = (search) => {
        setUrl(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
        );

        setCity(search);
    };

    // Realiza la solicitud a la API utilizando fetch
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.main) {
                    console.log(data);
                    setTemperatura(data.main.temp);
                    setDescripcion(data.weather[0].description);
                    setCity(data.name);

                    setIcono(
                        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
                    );
                }
            })
            .catch((e) => console.log(e));
    }, [url]);

    return (
        <div className="container">
            <img src="../../public/wather.jpg" className="image"></img>
            <h2>Buscar ciudad y averigua su clima</h2>
            <form method="GET" className="centering">
                <input
                    type="search"
                    onChange={(e) => handleFilterBySearch(e.target.value)}
                ></input>
            </form>
            <h2>Ciudad de: {city}</h2>
            <h3>Temperatura: {temperatura}</h3>
            <p>Descripcion: {descripcion} </p>
            <img src={icono}></img>
        </div>
    );
}

export default Card;
