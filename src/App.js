import coldBg from "./assets/cold.jpg.jpg";
import hotBg from "./assets/hot.jpg.jpg"
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherService";
import { useEffect , useState } from "react";


function App() {
    const [city ,Setcity] = useState("paris");
    const [weather, SetWeather] = useState(null);
    const [units, setUnits ] = useState("imperial");
    const [bg, setBg] = useState(hotBg)
    

    useEffect(() => {
        const fetchWeatherData = async () => {
            const data = await getFormattedWeatherData(city, units);
            SetWeather(data);

            const threshold = units === 'metric' ? 20 : 30;
            if (data.temp <=  threshold) setBg(coldBg);
            else setBg(hotBg);

        }; 
        fetchWeatherData();
    }, [units , city]);

      const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);

        const isCelsius = currentUnit === "C";
        setUnits(isCelsius ? "imperial" : "metric");
        button.innerText = isCelsius ? "°F" : "°C";
    };


    const enterKeyPressed = (e) =>{
        if (e.keyCode === 13){
            Setcity(e.currentTarget.value);
            e.currentTarget.blur();
        }
    }

    return (
        <div className="app" style={{ backgroundImage: `url(${bg})` }}>
            <div className="overlay">
                
                   { weather && (
                        <div className="container">
                            <div className="section section__inputs">
                                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City...." />
                                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
                            </div>
                            <div className="section section__temperature">
                                <div className="icons">
                                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                                    <img src={weather.iconurl} alt="weatherIcon" />
                                    <h3> {weather.description}</h3>
                                </div>
                                <div className="temperature">
                                    <h1>{`${weather.temp.toFixed()}°${units === "metric" ? "C" : "F"}`}</h1>
                                </div>
                            </div>
                            <Descriptions weather={weather} units={units} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}
 
export default App;

