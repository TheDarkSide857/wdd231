const myTown        = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic     = document.querySelector('#graphic');
const forecastList  = document.querySelector('#forecast');

const myKey  = 'cbce0880f8042449729af665c9c94911';
const myLat  = '36.60297714477723';
const myLon  = '-121.93294050382472';

const currentURL  = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

async function loadWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);

    if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather data failed');

    const currentData  = await currentRes.json();
    const forecastData = await forecastRes.json();

    displayCurrent(currentData);
    displayForecast(forecastData);

  } catch (error) {
    console.error(error);
    myDescription.textContent = 'Weather unavailable';
    myTemperature.textContent = '--°F';
  }
}

function displayCurrent(data) {
  myTown.textContent = data.name;

  let desc = data.weather[0].description;
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  myDescription.textContent = desc;

  myTemperature.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  myGraphic.src = iconsrc;
  myGraphic.alt = desc;
}

function displayForecast(data) {
  forecastList.innerHTML = '';

  const daily = data.list.filter(item => item.dt_txt.includes('12:00:00'));

  daily.slice(0, 3).forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(day.main.temp);
    const icon = day.weather[0].icon;
    const desc = day.weather[0].description.charAt(0).toUpperCase() + day.weather[0].description.slice(1);

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${dayName}:</strong> ${temp}&deg;F 
      <img src="https://openweathermap.org/img/w/${icon}.png" alt="${desc}" width="40" loading="lazy">
      ${desc}
    `;
    forecastList.appendChild(li);
  });
}

async function loadSpotlights() {
    try {
      const resp = await fetch('members.json');
      
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }
      
      const data = await resp.json();
  
      const eligible = data.members.filter(m =>
        m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver'
      );
  
      if (eligible.length === 0) {
        throw new Error('No Gold/Silver members found');
      }
      const shuffled = eligible.sort(() => 0.5 - Math.random());
      const spotlights = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
  
      const container = document.getElementById('spotlights');
      container.innerHTML = '';
  
      spotlights.forEach(m => {
        const card = document.createElement('div');
        card.className = 'member-card spotlight';
        card.innerHTML = `
          <img src="${m.image}" alt="${m.name}" loading="lazy">
          <h3>${m.name}</h3>
          <p class="level ${m.membershipLevel.toLowerCase()}">${m.membershipLevel} Member</p>
          <hr>
          <p><strong>Address:</strong> ${m.address}</p>
          <p><strong>Phone:</strong> ${m.phone}</p>
          <p><strong>Web:</strong> 
            <a href="${m.website}" target="_blank" rel="noopener">
              ${m.website.replace(/^https?:\/\//, '')}
            </a>
          </p>
        `;
        container.appendChild(card);
      });
  
    } catch (err) {
      console.error('Spotlights error:', err);
      document.getElementById('spotlights').innerHTML = 
        `<p class="error">Spotlights failed: ${err.message}</p>`;
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  loadWeather();
  loadSpotlights();

  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (toggle && nav) {
    document.querySelectorAll('.desktop-nav a').forEach(link => nav.appendChild(link.cloneNode(true)));
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggle.classList.toggle('open');
    });
  }
});