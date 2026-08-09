window.Registration = {
    showMessage(type, message) {
        const element = document.getElementById("formMessage");

        element.className = `message ${type}`;
        element.textContent = message;
    },

    getValidDateTime(value) {
        const date = new Date(value);

        if (value && !Number.isNaN(date.getTime())) {
            return date.toISOString();
        }

        return new Date().toISOString();
    },

    initialize() {
        const form = document.getElementById("registrationForm");
        const button = document.getElementById("registerButton");

        if (!form || !button) {
            console.error("Registration form elements are missing.");
            return;
        }

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
                    document
                        .getElementById("firstName")
                        .value
                        .trim(),

                lastName:
                    document
                        .getElementById("lastName")
                        .value
                        .trim(),

                email:
                    document
                        .getElementById("email")
                        .value
                        .trim()
            };

            button.disabled = true;
            button.textContent = "Submitting...";

            try {
                const result = await EventApi.register(payload);

                console.log("Registration completed:", result);

                const triggerDate = this.getValidDateTime(
                    result.eventStartDate ||
                    webinar.startDate
                );

                CIJTriggers.webinarRegistered({
                    customerId:
                        result.customerId ||
                        payload.email,

                    registrationId:
                        result.registrationTrackingId,

                    webinarId:
                        result.eventId ||
                        webinar.id,

                    webinarName:
                        result.eventName ||
                        webinar.name,

                    webinarStartDate:
                        triggerDate,

                    webinarJoinUrl:
                        result.webinarJoinUrl ||
                        payload.webinarJoinUrl,

                    recordingUrl:
                        result.recordingUrl ||
                        payload.recordingUrl
                });

                console.log(
                    "Webinar Registered trigger called."
                );

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
                button.textContent =
                    "Register for webinar";
            }
        });
    }
};
