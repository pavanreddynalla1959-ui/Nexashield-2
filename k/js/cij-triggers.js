window.CIJTriggers = {
    webinarRegistered(data) {
        if (!window.msdynmkt) {
            throw new Error("CI-J Web SDK is not loaded.");
        }

        window.msdynmkt.setUser({
            authId: data.customerId
        });

        window.msdynmkt.trackEvent({
            name: "msdynmkt_webinarregistration_033329242",
            ingestionKey: "5a2e31c53eca40fbb3427474546c7c53-fb88e609-b5fb-45c5-a5da-454799060122-6948",
            version: "1.0.0",

            properties: {
                recordingurl: data.recordingUrl,
                registrationid: data.registrationId,
                webinarid: data.webinarId,
                webinarjoinurl: data.webinarJoinUrl,
                webinarname: data.webinarName,
                webinarstartdate: data.webinarStartDate,
                bindingid: data.registrationId
            }
        });
    },

    webinarAttended(data) {
        if (!window.msdynmkt) {
            throw new Error("CI-J Web SDK is not loaded.");
        }

        window.msdynmkt.setUser({
            authId: data.customerId
        });

        window.msdynmkt.trackEvent({
            name: "msdynmkt_webinarattended_032822006",
            ingestionKey: "5a2e31c53eca40fbb3427474546c7c53-fb88e609-b5fb-45c5-a5da-454799060122-6948",
            version: "1.0.0",

            properties: {
                attendedon: data.attendedOn,
                registrationid: data.registrationId,
                slidesurl: data.slidesUrl,
                webinarid: data.webinarId,
                webinarname: data.webinarName,
                bindingid: data.registrationId
            }
        });
    }
};
