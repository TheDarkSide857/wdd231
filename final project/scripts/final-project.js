document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', new Date().getFullYear());
    console.log("%cWelcome to The Nexus 🎮", "color: #00ff99; font-family: 'Press Start 2P'; font-size: 2rem;");
    console.log("%cMay your frame rates be high and your ping low.", "color: #ff2e63; font-size: 1.2rem;");
  });
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
});
document.addEventListener('DOMContentLoaded', () => {
    const possiblePaths = [
      'data/rankings-2025.json',
      '../data/rankings-2025.json',
      './data/rankings-2025.json',
      'rankings-2025.json'
    ];

    let loaded = false;

    function tryLoad(path) {
      fetch(path)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then(data => {
          if (!loaded) {
            loaded = true;
            renderRankings(data);
            document.getElementById('last-updated').textContent = new Date(data.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
            });
          }
        })
        .catch(err => {
          console.warn(`Failed to load from ${path}:`, err);
          const nextPath = possiblePaths.shift();
          if (nextPath && !loaded) tryLoad(nextPath);
          else if (!loaded) showFallbackRankings();
        });
    }
    tryLoad(possiblePaths.shift());
    function showFallbackRankings() {
      document.getElementById('rankings-list').innerHTML = `
        <div class="ranking-card" style="grid-column:1/-1;">
          <h3 style="text-align:center; color:var(--accent); font-size:2rem;">⚡ Rankings Temporarily Offline</h3>
          <p style="text-align:center; font-size:1.2rem; margin:2rem 0;">
            Live rankings are currently loading...<br><br>
            <strong>Current #1:</strong> Black Myth: Wukong (9.7/10)<br>
            <strong>#2:</strong> Elden Ring: Shadow of the Erdtree (9.6/10)<br>
            <strong>#3:</strong> Final Fantasy VII Rebirth (9.4/10)
          </p>
          <p style="text-align:center; color:#888; font-size:0.9rem;">
            Refresh or use <a href="#" onclick="location.reload()" style="color:var(--primary);">Live Server</a> for full leaderboard
          </p>
        </div>
      `;
    }
  });

  function renderRankings(data) {
    const container = document.getElementById('rankings-list');
    container.innerHTML = '';

    data.games.forEach((game, index) => {
      const rank = index + 1;
      const card = document.createElement('div');
      card.className = 'ranking-card';
      card.innerHTML = `
        <div class="rank-badge">#${rank}</div>
        <img src="${game.cover}" alt="${game.title}" loading="lazy" onerror="this.src='images/fallback-cover.jpg'">
        <div class="game-info">
          <h3>${game.title}</h3>
          <p class="developer">${game.developer} • ${game.platforms.join(' · ')}</p>
          <div class="score">
            <span class="community-score">${game.score}/10</span>
            <span class="votes">(${game.votes.toLocaleString()} votes)</span>
          </div>
          <p class="one-liner">"${game.oneLiner}"</p>
        </div>
      `;
      container.appendChild(card);
    });
  }