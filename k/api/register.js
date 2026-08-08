export default async function handler(request, response) {
    if (request.method !== "POST") {
        return response.status(405).json({
            message: "Method not allowed."
        });
    }

    const {
        readableEventId,
        firstName,
        lastName,
        email
    } = request.body || {};

    if (!readableEventId || !firstName ||
        !lastName || !email) {
        return response.status(400).json({
            message: "Required registration information is missing."
        });
    }

    const endpoint =
        process.env.CIJ_EVENT_API_ENDPOINT;

    const token =
        process.env.CIJ_EVENT_API_TOKEN;

    if (!endpoint || !token) {
        return response.status(500).json({
            message: "Event API configuration is missing."
        });
    }

    try {
        const safeEventId =
            encodeURIComponent(readableEventId);

        const apiUrl = new URL(
            `${endpoint}/events/${safeEventId}/registrations`
        );

        apiUrl.searchParams.set(
            "emApplicationtoken",
            token
        );

        const apiResponse = await fetch(apiUrl.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                attendees: [{
                    firstName,
                    lastName,
                    email
                }]
            })
        });

        const text = await apiResponse.text();

        let result = {};

        try {
            result = text ? JSON.parse(text) : {};
        } catch {
            result = {};
        }

        if (!apiResponse.ok || result.errorCode) {
            console.error("Registration error:", result);

            return response.status(400).json({
                message:
                    result.errorMessage ||
                    result.Message ||
                    "CI-J could not process the registration."
            });
        }

        return response.status(200).json({
            message:
                "Registration received. Please check your email.",
            result
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Unable to complete the registration."
        });
    }
}