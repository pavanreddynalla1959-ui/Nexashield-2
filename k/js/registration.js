window.Registration = {
    showMessage(type, message) {
        const element = document.getElementById("formMessage");

        element.className = `message ${type}`;
        element.textContent = message;
    },

    initialize() {
        const form = document.getElementById("registrationForm");
        const button = document.getElementById("registerButton");

        form.addEventListener("submit", async event => {
            event.preventDefault();

            const webinar = window.currentWebinar;

            if (!webinar) {
                this.showMessage(
                    "error",
                    "Please select a webinar first."
                );
                return;
            }

            const payload = {
                readableEventId: webinar.readableEventId,
                eventId: webinar.id,
                eventName: webinar.name,
                eventStartDate: webinar.startDate,

                webinarJoinUrl:
                    webinar.joinUrl ||
                    "https://example.com/join-webinar",

                recordingUrl:
                    webinar.recordingUrl ||
                    "https://example.com/webinar-recording",

                firstName:
                    document.getElementById("firstName")
                        .value.trim(),

                lastName:
                    document.getElementById("lastName")
                        .value.trim(),

                email:
                    document.getElementById("email")
                        .value.trim()
            };

            button.disabled = true;
            button.textContent = "Submitting…";

            try {
                const result = await EventApi.register(payload);

                CIJTriggers.webinarRegistered({
                    customerId: result.customerId,

                    registrationId:
                        result.registrationTrackingId,

                    webinarId:
                        result.eventId,

                    webinarName:
                        result.eventName,

                    webinarStartDate:
                        new Date(
                            result.eventStartDate
                        ).toISOString(),

                    webinarJoinUrl:
                        result.webinarJoinUrl,

                    recordingUrl:
                        result.recordingUrl
                });

                this.showMessage(
                    "success",
                    result.message ||
                    "Your registration has been received."
                );

                form.reset();
            } catch (error) {
                console.error(
                    "Registration or trigger failed:",
                    error
                );

                this.showMessage(
                    "error",
                    error.message ||
                    "Registration could not be completed."
                );
            } finally {
                button.disabled = false;
                button.textContent = "Register for webinar";
            }
        });
    }
};