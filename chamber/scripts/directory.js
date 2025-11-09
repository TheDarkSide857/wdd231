document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
});
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('open');
        });
    });
const businessCardsContainer = document.querySelector("#business-card");
async function fetchBusinesses() {
    try {
        const response = await fetch("data/businesses.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const businesses = await response.json();
        displayBusinesses(businesses);
    } catch (error) {
        console.error("Error fetching businesses:", error);
        businessCardsContainer.innerHTML = `<p>Failed to load business data. Please try again later.</p>`;
    }
    }
function displayBusinesses(businesses) {
    businesses.forEach((business) => {
        const card = document.createElement("div");
        card.classList.add("business-card");

        card.innerHTML = `
            <div class="business-logo">
                <img src="${business.logo}" alt="Logo of ${business.name}" />
            </div>
            <h4>${business.name}</h4>
            <p class="tagline">${business.tagline}</p>
            <p><strong>EMAIL:</strong> <a href="mailto:${business.email}">${business.email}</a></p>
            <p><strong>PHONE:</strong> ${business.phone}</p>
            <p><strong>URL:</strong> <a href="${business.url}" target="_blank">${business.url}</a></p>
        `;

        businessCardsContainer.appendChild(card);
        });
    }
    async function fetchBusinesses() {
        try {
            const response = await fetch("data/businesses.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const businesses = await response.json();
            console.log("Fetched businesses:", businesses);
            displayBusinesses(businesses);
        } catch (error) {
            console.error("Error fetching businesses:", error);
            businessCardsContainer.innerHTML = `<p>Failed to load business data. Please try again later.</p>`;
        }
    }
});
document.addEve
ntListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('open');
        });
    });
});