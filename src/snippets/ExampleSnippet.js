const request = require('request');
const some_secret = process.env['some_secret']

/**
 * @brief Main function beeing called by hubspot
 * 
 * @param {{
 *  userMessage:{message: string},
 *  session:{customState:any}
 * }} event // thre are much more entries than just these. check hubspot's docs https://developers.hubspot.com/docs/api/conversations/code-snippets-in-bots
 * 
 * @param {function({
 *  botMessage: string|undefined, 
 *  responseExpected: bool, 
 *  customState: any|undefined, 
 *  nextModuleNickname: string|undefined})
 * } callback // Callback function. Return after calling.
 * 
 */
exports.main = async (event, callback) => {

    // Customer failed to enter his Customer ID in a valid format three times.
    const askCID = {
        botMessage: `Hello world - your secret is ${some_secret}, custom state is ${JSON.stringify(event.session.customState)}, you told me : ${event.userMessage.message}`,
        responseExpected: true,
        customState: { myCustomState: "World Hello" },
        nextModuleNickname: "SomeModule"
    }

    callback(askCID);
    return;
};

// Example api call
async function someApiCall(customerId) {
    return new Promise((res, rej) => {
        const body = JSON.stringify({
            SomeJSONPayload: true
        });

        request(`someUrl`,
            {
                method: "post",
                body: body,
                headers: {
                    "Content-Type": "application/json"
                }
            }, (err, response, body) => {
                if (err) {
                    rej(err);
                    return;
                }
                if (response.statusCode == 200) {
                    const jsonBody = JSON.parse(response.body);
                    if (jsonBody.total == 0) {
                        res("notFound");
                    } else {
                        res(jsonBody.results[0]);
                    }
                } else {
                    rej(err);
                }
            })
    }
    );
}
