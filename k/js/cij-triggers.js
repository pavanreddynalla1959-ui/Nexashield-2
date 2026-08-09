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
            ingestionKey: "https://org4699256e.crm.dynamics.com/main.aspx?appid=11fd5cd2-9786-f111-ab0f-000d3a59d82d&pagetype=entityrecord&etn=msdynmkt_eventmetadata&id=baffb515-a393-f111-8075-000d3a59d82d&formid=1d9e097d-ee10-455c-8d69-507df1d49101",
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
            ingestionKey: "https://org4699256e.crm.dynamics.com/main.aspx?appid=11fd5cd2-9786-f111-ab0f-000d3a59d82d&pagetype=entityrecord&etn=msdynmkt_eventmetadata&id=baffb515-a393-f111-8075-000d3a59d82d&formid=1d9e097d-ee10-455c-8d69-507df1d49101",
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
