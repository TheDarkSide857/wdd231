const membersEl = document.getElementById('members');
const gridBtn   = document.getElementById('grid');
const listBtn   = document.getElementById('list');
async function loadMembers() {
  try {
    const resp = await fetch('members.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();
    if (!Array.isArray(data)) throw new Error('JSON is not an array');

    renderMembers(data);
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
gridBtn.classList.add('active');