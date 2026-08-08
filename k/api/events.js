export default async function handler(request, response) {
    if (request.method !== "GET") {
        return response.status(405).json({
            message: "Method not allowed."
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
        const apiUrl = new URL(
            `${endpoint}/events/published`
        );

        apiUrl.searchParams.set(
            "emApplicationtoken",
            token
        );

        const apiResponse = await fetch(
            apiUrl.toString(),
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );

        const text = await apiResponse.text();

        let data;

        try {
            data = text ? JSON.parse(text) : [];
        } catch {
            data = [];
        }

        if (!apiResponse.ok) {
            console.error(
                "CI-J Event API error:",
                apiResponse.status,
                text
            );

            return response
                .status(apiResponse.status)
                .json({
                    message:
                        "Customer Insights Event API request failed."
                });
        }

        return response.status(200).json({
            events: Array.isArray(data) ? data : []
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            message: "Unable to retrieve webinar events."
        });
    }
}