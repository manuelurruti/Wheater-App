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
    const [mode, setMode] = useState('light');


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


    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.main) {

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

    }, [url]);


    useEffect(() => {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${mode}-mode`);
    }, [mode]);



    return (<div className="light-mode">           
        <div id="content" className="height light-mode"> 
            <div id="contento" className="container">
             


                <form method="GET" className="centering">
                    <TextField className="textFilled" label="Ciudad" variant="filled" type="search"
                        onChange={(e) => handleFilterBySearch(e.target.value)}>

                    </TextField>
                </form>

                {city.length == 0 ? <h2 className="parrafo">busca tu Ciudad!</h2> : (<>  <h2>Ciudad de: {city}</h2>
                    <h3 className="parrafo">Temperatura: {temperatura}</h3>
                    <h3 className="parrafo">Sensacion termica: {sensTermica}</h3>
                    <h3 className="parrafo">Descripcion: {descripcion} </h3>

                    <h3 className="parrafo">Humedad: {humidity}</h3>

                    <img src={icono} className="ChangeColoxr"></img></>)}
                


            </div>
        </div >
        </div>
    );
}

export default Card;
