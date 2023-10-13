const API_KEY = "ae2ca788a260fdee0f4c82267c15b201";
const makeIconurl = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = 'metric') => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(url)
        .then((res) => res.json())
        .then((data) => data)
    const { weather, main: { temp, feels_like, temp_min, temp_max, pressure,
        humidity },
        wind: { speed },
        sys: { country },
        name,
    } = data;

    const { description, icon } = weather[0];

    return {
        description,
        iconurl:makeIconurl(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        pressure,
        speed,
        country,
        name,
    };
};

export { getFormattedWeatherData };