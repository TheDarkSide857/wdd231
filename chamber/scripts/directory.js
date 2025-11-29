const membersEl = document.getElementById('members');
const gridBtn   = document.getElementById('grid');
const listBtn   = document.getElementById('list');

async function loadMembers() {
  try {
    const resp = await fetch('members.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    if (!Array.isArray(data.members)) throw new Error('JSON is missing members array');

    renderMembers(data.members);
  } catch (err) {
    membersEl.innerHTML = `<p class="error">Failed to load members: ${err.message}</p>`;
    console.error(err);
  }
}

function renderMembers(members) {
  membersEl.innerHTML = '';

  members.forEach(m => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="${m.image}" alt="${m.name}" loading="lazy">
      <h4>${escapeHtml(m.name)}</h4>
      <p>${escapeHtml(m.description)}</p>
      <p class="details"><strong>Phone:</strong> ${escapeHtml(m.phone)}</p>
      <p class="details"><strong>Website:</strong>
        <a href="${m.website}" target="_blank" rel="noopener">
          ${m.website.replace(/^https?:\/\//, '')}
        </a>
      </p>
      <span class="level ${m.membershipLevel.toLowerCase()}">
        ${escapeHtml(m.membershipLevel)} Member
      </span>
    `;

    membersEl.appendChild(card);
  });
}
gridBtn.addEventListener('click', () => {
  membersEl.classList.remove('list');
  membersEl.classList.add('grid');
  gridBtn.classList.add('active');
  listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
  membersEl.classList.remove('grid');
  membersEl.classList.add('list');
  listBtn.classList.add('active');
  gridBtn.classList.remove('active');
});
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav    = document.querySelector('.mobile-nav');

  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileToggle.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      mobileToggle.classList.remove('open');
    });
  });
});
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
loadMembers();
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const lat = 36.60297714477723;
const lon = -121.93294050382472;
const apiKey = 'cbce0880f8042449729af665c9c94911';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
    captionDesc.textContent = 'Unable to load weather';
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  weatherIcon.setAttribute('loading', 'lazy');
  captionDesc.textContent = desc;
}
const params = new URLSearchParams(window.location.search);

    document.getElementById('out-firstName').textContent = params.get('firstName') || 'N/A';
    document.getElementById('out-lastName').textContent = params.get('lastName') || 'N/A';
    document.getElementById('out-email').textContent = params.get('email') || 'N/A';
    document.getElementById('out-phone').textContent = params.get('phone') || 'N/A';
    document.getElementById('out-businessName').textContent = params.get('businessName') || 'N/A';

    const level = params.get('membershipLevel');
    const levels = { np: 'NP Membership', bronze:'Bronze', silver:'Silver', gold:'Gold' };
    document.getElementById('out-membershipLevel').textContent = levels[level] || 'Not selected';

    const ts = params.get('timestamp');
    if (ts) {
      const date = new Date(ts);
      document.getElementById('out-timestamp').textContent = date.toLocaleString();
    }