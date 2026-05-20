// ── API Key ──
const API_KEY = 'f432b0ee0092593798a29bc7e9367ecd';

// ── Elementos ──
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-msg');

// ── Buscar clima ──
async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      showError();
      return;
    }

    showWeather(data);

  } catch (error) {
    showError();
  }
}

// ── Mostrar clima ──
function showWeather(data) {
  errorMsg.classList.add('hidden');
  weatherCard.classList.remove('hidden');

  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('weather-desc').textContent = data.weather[0].description;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('temp-main').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  document.getElementById('temp-min').textContent = `${Math.round(data.main.temp_min)}°C`;
  document.getElementById('temp-max').textContent = `${Math.round(data.main.temp_max)}°C`;
  document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
}

// ── Mostrar error ──
function showError() {
  weatherCard.classList.add('hidden');
  errorMsg.classList.remove('hidden');
}

// ── Eventos ──
searchBtn.addEventListener('click', getWeather);

cityInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') getWeather();
});