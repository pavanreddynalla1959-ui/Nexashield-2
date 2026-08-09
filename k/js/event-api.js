window.EventApi = {
    async getEvents() {
        const response = await fetch("/api/events");

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to retrieve webinars."
            );
        }

        return result.events || result;
    },

    async register(payload) {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Registration failed."
            );
        }

        return result;
    }
};