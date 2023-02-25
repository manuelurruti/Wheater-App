import "./Card.css";
import React, { useState, useEffect } from "react";
import Switchx from "./Switchx"
import TextField from '@mui/material/TextField';

function Card() {
    const apiKey = "134d26ac91119b88ca2ffc3d8cb365ea";
    const [temperatura, setTemperatura] = useState("");
    const [sensTermica, setSensTermica] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [icono, setIcono] = useState("");
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(true)

    const [humidity, setHumidity] = useState("")

    const [url, setUrl] = useState(
        `https://api.openweathermap.org/data/2.5/weather?appid=&lang=es&q=${city}&units=metric&appid=${apiKey}`
    );
    const handleFilterBySearch = (search) => {
        setUrl(
            `https://api.openweathermap.org/data/2.5/weather??appid=&lang=es&q=${search}&units=metric&appid=${apiKey}`
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
                    setSensTermica(data.main.feels_like);
                    setDescripcion(data.weather[0].description);
                    setCity(data.name);

                    setHumidity(data.main.humidity)

                    setTemperatura(data.main.temp)

                    setIcono(
                        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
                    );
                }
            })
            .catch((e) => console.log(e));
        setLoading(false);
    }, [url]);

    return (
        <div className="container">
            <Switchx></Switchx>
            {sensTermica <= 10 ? <img src="https://noticiasdeescobar.com/wp-content/uploads/2019/08/invierno-gente-abrigada.jpg" className="image"></img> : <img src="https://estaticos.elperiodico.com/resources/jpg/2/6/messi-saluda-grada-animacion-tras-anotar-durante-partido-liga-entre-barcelona-eibar-1547412391062.jpg" className="image"></img>}


            <form method="GET" className="centering">
                <TextField className="textFilled" label="Ciudad" variant="filled" type="search"
                    onChange={(e) => handleFilterBySearch(e.target.value)}>

                </TextField>
            </form>
            {city.length == 0 ? <h2>busca tu Ciudad!</h2> : (<>  <h2>Ciudad de: {city}</h2>
                <h2>Temperatura: {temperatura}</h2>
                <h3>Sensacion termica: {sensTermica}</h3>
                <p>Descripcion: {descripcion} </p>

                <p>Humedad: {humidity}</p>

                <img src={icono} className="ChangeColor"></img></>)}
            <h2>Te recomendamos vestirte con: </h2>
            <div>
            </div>

        </div>
    );
}

export default Card;
