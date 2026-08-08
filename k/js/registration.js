window.Registration = {
    showMessage(type, message) {
        const element =
            document.getElementById("formMessage");

        element.className = `message ${type}`;
        element.textContent = message;
    },

    initialize() {
        const form =
            document.getElementById("registrationForm");

        const button =
            document.getElementById("registerButton");

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
                eventName: webinar.name,
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
                const result =
                    await EventApi.register(payload);

                this.showMessage(
                    "success",
                    result.message ||
                    "Your registration has been received."
                );

                form.reset();
            } catch (error) {
                console.error(error);

                this.showMessage(
                    "error",
                    error.message
                );
            } finally {
                button.disabled = false;
                button.textContent =
                    "Register for webinar";
            }
        });
    }
};