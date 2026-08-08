window.EventUI = {
    normalize(rawEvent) {
        return {
            id: rawEvent.eventId || "",
            readableEventId: rawEvent.readableEventId || "",
            name: rawEvent.eventName || "Unnamed webinar",
            description:
                rawEvent.description ||
                "Join this NexaShield online webinar.",
            startDate:
                rawEvent.startDateUTC ||
                rawEvent.startDate ||
                null
        };
    },

    formatDate(value) {
        if (!value) {
            return "Date to be announced";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "long",
            timeStyle: "short"
        }).format(date);
    },

    createCard(webinar, onSelect) {
        const card = document.createElement("article");
        card.className = "card";

        const top = document.createElement("div");
        top.className = "card-top";

        const label = document.createElement("small");
        label.textContent = "Online webinar";

        const title = document.createElement("h3");
        title.textContent = webinar.name;

        top.append(label, title);

        const body = document.createElement("div");
        body.className = "card-body";

        const description = document.createElement("p");
        description.textContent = webinar.description;

        const meta = document.createElement("div");
        meta.className = "event-meta";
        meta.textContent =
            `Date: ${this.formatDate(webinar.startDate)}`;

        const button = document.createElement("button");
        button.className = "btn primary";
        button.type = "button";
        button.textContent = "View webinar";
        button.addEventListener("click", () => onSelect(webinar));

        body.append(description, meta, button);
        card.append(top, body);

        return card;
    }
};