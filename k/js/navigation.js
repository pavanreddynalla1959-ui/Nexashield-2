window.Navigation = {
    showEvent(webinar, updateHistory = true) {
        window.currentWebinar = webinar;

        document.getElementById("detailTitle").textContent =
            webinar.name;

        document.getElementById("detailDescription").textContent =
            webinar.description;

        document.getElementById("detailDate").textContent =
            EventUI.formatDate(webinar.startDate);

        document.getElementById("selectedEventName").textContent =
            webinar.name;

        document.getElementById("homeView").classList.add("hidden");
        document.getElementById("detailsView")
            .classList.remove("hidden");

        document.getElementById("allEventsButton")
            .classList.remove("hidden");

        document.title = `${webinar.name} | NexaShield`;

        if (updateHistory) {
            const identifier =
                webinar.readableEventId || webinar.id;

            history.pushState(
                { event: identifier },
                "",
                `?event=${encodeURIComponent(identifier)}`
            );
        }

        window.scrollTo(0, 0);
    },

    showHome(updateHistory = true) {
        window.currentWebinar = null;

        document.getElementById("detailsView")
            .classList.add("hidden");

        document.getElementById("homeView")
            .classList.remove("hidden");

        document.getElementById("allEventsButton")
            .classList.add("hidden");

        document.title = "NexaShield | Webinars";

        if (updateHistory) {
            history.pushState({}, "", "/#events");
        }
    }
};