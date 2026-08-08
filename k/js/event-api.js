window.EventApi = {
    async getEvents() {
        const response = await fetch("/api/events", {
            headers: {
                Accept: "application/json"
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to retrieve webinars."
            );
        }

        return Array.isArray(result)
            ? result
            : result.events || [];
    },

    async register(payload) {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
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