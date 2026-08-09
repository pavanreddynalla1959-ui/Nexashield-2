window.Registration = {
    showMessage(type, message) {
        const element = document.getElementById("formMessage");

        element.className = `message ${type}`;
        element.textContent = message;
    },

    getValidDateTime(value) {
        const date = new Date(value);

        return value && !Number.isNaN(date.getTime())
            ? date.toISOString()
            : new Date().toISOString();
    },

    initialize() {
        const form = document.getElementById("registrationForm");
        const button = document.getElementById("registerButton");
        const attendanceButton =
            document.getElementById("testAttendanceButton");
        const attendanceStatus =
            document.getElementById("attendanceStatus");

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
            button.textContent = "Submitting...";

            try {
                const result = await EventApi.register(payload);

                const registrationContext = {
                    customerId:
                        result.customerId || payload.email,

                    registrationId:
                        result.registrationTrackingId,

                    webinarId:
                        result.eventId || webinar.id,

                    webinarName:
                        result.eventName || webinar.name
                };

                CIJTriggers.webinarRegistered({
                    ...registrationContext,

                    webinarStartDate:
                        this.getValidDateTime(
                            result.eventStartDate ||
                            webinar.startDate
                        ),

                    webinarJoinUrl:
                        result.webinarJoinUrl ||
                        payload.webinarJoinUrl,

                    recordingUrl:
                        result.recordingUrl ||
                        payload.recordingUrl
                });

                localStorage.setItem(
                    "testWebinarRegistration",
                    JSON.stringify(registrationContext)
                );

                this.showMessage(
                    "success",
                    "Registration completed. You can now test attendance."
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

        attendanceButton?.addEventListener("click", () => {
            const savedValue = localStorage.getItem(
                "testWebinarRegistration"
            );

            if (!savedValue) {
                attendanceStatus.textContent =
                    "Register for a webinar first.";
                return;
            }

            const registration = JSON.parse(savedValue);

            CIJTriggers.webinarAttended({
                customerId:
                    registration.customerId,

                registrationId:
                    registration.registrationId,

                webinarId:
                    registration.webinarId,

                webinarName:
                    registration.webinarName,

                attendedOn:
                    new Date().toISOString(),

                slidesUrl:
                    "https://example.com/presentation-slides"
            });

            attendanceStatus.textContent =
                "Webinar Attended signal submitted.";

            attendanceButton.disabled = true;
        });
    }
};
