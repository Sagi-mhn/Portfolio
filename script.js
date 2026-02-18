const API_KEY = "17fe56565e236b959bd00181305597af";
const CITY = "Paris";
const REFRESH_TIME = 10 * 60 * 1000; // 10 minutes

//pop up projet à venir
function next_project(event) {
  event.preventDefault(); // Empêche la redirection
  alert("Patience, projet à venir prochainement !");
}

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=fr&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("Erreur API");

    const data = await response.json();

    document.getElementById("temp").textContent =
      Math.round(data.main.temp) + "°C";

    document.getElementById("city").textContent =
      data.name;

    const iconCode = data.weather[0].icon;
    document.querySelector(".weather-icon").src =
      // `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      'https://cdn-icons-png.flaticon.com/512/7133/7133364.png';

  } catch (error) {
    document.getElementById("city").textContent = "Erreur météo";
    console.error(error);
  }
}

// Chargement initial
fetchWeather();

// Mise à jour automatique
setInterval(fetchWeather, REFRESH_TIME);
