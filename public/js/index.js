import { registerEmail, sendEmail } from './registerEmail';
const btnSave = document.querySelector('.save-button');
if (btnSave) {
  btnSave.addEventListener('click', function () {
    // Get weather data
    const city = document.querySelector('.weather-desc h5').textContent;
    const wind = document.querySelector(
      '.weather-desc p:nth-child(2)'
    ).textContent;
    const humidity = document.querySelector(
      '.weather-desc p:nth-child(3)'
    ).textContent;
    const temperature = document.querySelector(
      '.weather-desc p:nth-child(4)'
    ).textContent;
    const image = document.querySelector('.weather-image img').src;

    const weatherData = {
      city: city,
      wind: wind,
      humidity: humidity,
      temperature: temperature,
      image: image,
    };
    let savedWeatherData = [];
    // Get the current data from localStorage
    savedWeatherData = JSON.parse(localStorage.getItem('weatherData')) || [];

    // Check if weatherData already exists in the array
    let exists = savedWeatherData.some(function (savedData) {
      return (
        savedData.city === weatherData.city &&
        savedData.wind === weatherData.wind &&
        savedData.humidity === weatherData.humidity &&
        savedData.temperature === weatherData.temperature &&
        savedData.image === weatherData.image
      );
    });

    // If weatherData does not exist in the array, add it
    if (!exists) {
      savedWeatherData.push(weatherData);

      // Save the array back to localStorage
      localStorage.setItem('weatherData', JSON.stringify(savedWeatherData));
    }

    // Reload the page
    location.reload();
  });
  window.onload = function () {
    // Get data from localStorage
    let savedWeatherData =
      JSON.parse(localStorage.getItem('weatherData')) || [];

    // If there is data in localStorage
    if (savedWeatherData.length > 0) {
      // Create new elements and append them to .history .container
      let container = document.querySelector('.history .container');

      savedWeatherData.forEach(function (weatherData) {
        let historyCard = document.createElement('div');
        historyCard.className = 'history-card';

        let historyDate = document.createElement('div');
        historyDate.className = 'history-date';

        let dateElement = document.createElement('h3');
        dateElement.textContent = new Date().toLocaleDateString();
        historyDate.appendChild(dateElement);

        historyCard.appendChild(historyDate);

        let historyImage = document.createElement('div');
        historyImage.className = 'history-image';

        let imageElement = document.createElement('img');
        imageElement.src = weatherData.image;
        historyImage.appendChild(imageElement);

        historyCard.appendChild(historyImage);

        let historyDetails = document.createElement('div');
        historyDetails.className = 'history-details';

        let windElement = document.createElement('p');
        windElement.textContent = weatherData.wind;
        historyDetails.appendChild(windElement);

        let humidityElement = document.createElement('p');
        humidityElement.textContent = weatherData.humidity;
        historyDetails.appendChild(humidityElement);

        let temperatureElement = document.createElement('p');
        temperatureElement.textContent = weatherData.temperature;
        historyDetails.appendChild(temperatureElement);

        historyCard.appendChild(historyDetails);
        var city = weatherData.city.split(':')[1].split('(')[0].trim();
        let historyLink = document.createElement('a');
        historyLink.href = '/search?q=' + city;
        historyLink.appendChild(historyCard);

        container.appendChild(historyLink);
      });
    }
  };
}

const formEmail = document.querySelector('.form-email');
if (formEmail) {
  formEmail.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    registerEmail(email);
  });
}

const now = new Date();
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const msUntilTomorrow = tomorrow - now;

setTimeout(sendEmail, msUntilTomorrow);
