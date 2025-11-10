const membersCardsContainer = document.querySelector("#members-card");
    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
            membersCardsContainer.innerHTML = `<p>Failed to load members data. Please try again later.</p>`;
        }
    }
    function displayMembers(members) {
        members.forEach((member) => {
            const card = document.createElement("div");
            card.classList.add("members-card");

            card.innerHTML = `
                <div class="members-logo">
                    <img src="${member.logo}" alt="Logo of ${member.name}" />
                </div>
                <h4>${member.name}</h4>
                <p class="tagline">${member.tagline}</p>
                <p><strong>EMAIL:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                <p><strong>PHONE:</strong> ${member.phone}</p>
                <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
            `;

            membersCardsContainer.appendChild(card);
        });
    }
    fetchMembers();

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
});