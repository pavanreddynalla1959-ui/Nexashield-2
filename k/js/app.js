window.currentWebinar = null;
window.webinars = [];

async function loadWebinars() {
    const grid = document.getElementById("eventsGrid");

    grid.innerHTML = `
        <div class="loading-panel">
            Loading available webinars…
        </div>
    `;

    try {
        const result = await EventApi.getEvents();

        window.webinars = result
            .map(item => EventUI.normalize(item))
            .filter(item => item.id && item.readableEventId);

        document.getElementById("eventCount").textContent =
            String(window.webinars.length);

        grid.innerHTML = "";

        if (window.webinars.length === 0) {
            grid.innerHTML = `
                <div class="loading-panel">
                    No published webinars are available.
                </div>
            `;
            return;
        }

        window.webinars.forEach(webinar => {
            const card = EventUI.createCard(
                webinar,
                item => Navigation.showEvent(item)
            );

            grid.appendChild(card);
        });
    } catch (error) {
        console.error(error);

        grid.innerHTML = `
            <div class="loading-panel">
                Unable to load webinars.
            </div>
        `;
    }
}

function initializeNavigation() {
    document.getElementById("backButton")
        .addEventListener("click", () => {
            Navigation.showHome();
        });

    document.getElementById("allEventsButton")
        .addEventListener("click", () => {
            Navigation.showHome();
        });

    document.getElementById("homeLink")
        .addEventListener("click", event => {
            event.preventDefault();
            Navigation.showHome();
        });
}

async function initialize() {
    initializeNavigation();
    Registration.initialize();
    await loadWebinars();
}

initialize();