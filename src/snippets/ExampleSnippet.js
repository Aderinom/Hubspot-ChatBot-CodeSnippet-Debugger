const request = require('request');
const api_key = process.env['some_secret']


// Main function
exports.main = async (event, callback) => {   

    // Customer failed to enter his Customer ID in a valid format three times.
    const askCID = {
        botMessage: 'Hello world',
        responseExpected: true,
        customState:{ myCustomState : "World Hello" },
        nextModuleNickname:"SomeModule"
    }

    callback(askCID);
    return;
};  

// Example api call
async function someApiCall(customerId){
    return new Promise((res, rej) => {
        const body = JSON.stringify({
            SomeJSONPayload:true
        });
    
        request(`someUrl`,
        {
            method: "post",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        }, (err, response, body) => {
            if(err) 
            {
                rej(err);
                return;
            }
            if(response.statusCode == 200) {
                const jsonBody = JSON.parse(response.body);
                if(jsonBody.total == 0){
                    res("notFound");
                }else{
                    res(jsonBody.results[0]);
                }
            }else{
                rej(err);
            }
        })
    }
    );
}
