const citySelect = document.querySelector("#city");

const temperatureButton = document.querySelector("#temperatureButton");
const conditionsButton = document.querySelector("#conditionsButton");

const weatherResult = document.querySelector("#weatherResult");
const errorMessage = document.querySelector("#errorMessage");


// Get the selected city's latitude and longitude
function getSelectedCity() {

    const selectedCity = citySelect.value;

    if (!selectedCity) {
        throw new Error("Please select a city.");
    }

    const [latitude, longitude] = selectedCity.split(",");

    const cityName =
        citySelect.options[citySelect.selectedIndex].text;

    return {
        latitude,
        longitude,
        cityName
    };
}


// Temperature button
temperatureButton.addEventListener("click", async function () {

    errorMessage.textContent = "";

    try {

        const city = getSelectedCity();

        weatherResult.innerHTML = `
            <h2>Temperature</h2>
            <p>Loading temperature...</p>
        `;

        // GET request #1
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m`
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve temperature data.");
        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const temperatureUnit = data.current_units.temperature_2m;

        weatherResult.innerHTML = `
            <h2>🌡️ Temperature in ${city.cityName}</h2>

            <p>
                The current temperature is
                <strong>${temperature} ${temperatureUnit}</strong>.
            </p>
        `;

    } catch (error) {

        errorMessage.textContent = error.message;

        weatherResult.innerHTML = `
            <h2>Weather Information</h2>
            <p>Please select a city and try again.</p>
        `;
    }

});


// Conditions button
conditionsButton.addEventListener("click", async function () {

    errorMessage.textContent = "";

    try {

        const city = getSelectedCity();

        weatherResult.innerHTML = `
            <h2>Weather Conditions</h2>
            <p>Loading weather conditions...</p>
        `;

        // GET request #2
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=weather_code`
        );

        if (!response.ok) {
            throw new Error("Unable to retrieve weather condition data.");
        }

        const data = await response.json();

        const weatherCode = data.current.weather_code;

        const condition = getWeatherCondition(weatherCode);

        weatherResult.innerHTML = `
            <h2>🌤️ Conditions in ${city.cityName}</h2>

            <p>
                Current conditions:
                <strong>${condition}</strong>
            </p>
        `;

    } catch (error) {

        errorMessage.textContent = error.message;

        weatherResult.innerHTML = `
            <h2>Weather Information</h2>
            <p>Please select a city and try again.</p>
        `;
    }

});


// Convert Open-Meteo weather codes into readable conditions
function getWeatherCondition(code) {

    if (code === 0) {
        return "☀️ Clear sky";
    }

    if (code === 1) {
        return "🌤️ Mainly clear";
    }

    if (code === 2) {
        return "⛅ Partly cloudy";
    }

    if (code === 3) {
        return "☁️ Overcast";
    }

    if (code === 45 || code === 48) {
        return "🌫️ Fog";
    }

    if (code >= 51 && code <= 57) {
        return "🌦️ Drizzle";
    }

    if (code >= 61 && code <= 67) {
        return "🌧️ Rain";
    }

    if (code >= 71 && code <= 77) {
        return "❄️ Snow";
    }

    if (code >= 80 && code <= 82) {
        return "🌦️ Rain showers";
    }

    if (code >= 85 && code <= 86) {
        return "🌨️ Snow showers";
    }

    if (code >= 95 && code <= 99) {
        return "⛈️ Thunderstorm";
    }

    return "Weather condition unavailable.";
}