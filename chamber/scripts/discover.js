const gallery = document.getElementById('spots-gallery');
    const messageEl = document.getElementById('visit-message');
    
    async function loadSpots() {
      try {
        const response = await fetch('spots.json');
        if (!response.ok) throw new Error('Failed to load spots');
        const spots = await response.json();
    
        spots.forEach(spot => {
          const card = document.createElement('article');
          card.className = `spot-card ${spot.areaClass}`;
    
          card.innerHTML = `
            <figure>
              <img src="${spot.image}" alt="${spot.name}" loading="lazy" width="300" height="200">
            </figure>
            <div class="content">
              <h2>${spot.name}</h2>
              <address>${spot.address}</address>
              <p>${spot.description}</p>
              <button>Learn More</button>
            </div>
          `;
    
          gallery.appendChild(card);
        });
      } catch (err) {
        gallery.innerHTML = `<p style="color:red; text-align:center;">Error loading spots: ${err.message}</p>`;
      }
    }
    
    loadSpots();
    
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
      messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysBetween = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
      if (daysBetween === 0) {
        messageEl.textContent = "Back so soon? Awesome!";
      } else {
        const dayWord = daysBetween === 1 ? "day" : "days";
        messageEl.textContent = `You last visited ${daysBetween} ${dayWord} ago.`;
      }
    }
    localStorage.setItem('lastVisit', now);