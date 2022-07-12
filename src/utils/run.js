var fs = require("fs");
const { readline } = require("./readStdinjs");

/**
 * 
 *  Hubspot docs
 *  https://developers.hubspot.com/docs/api/conversations/code-snippets-in-bots
 * 
 * 
*/

// Global variables - because why not
var boundCB;
const example_event = {
    "portalId": 7940397,
    "userMessage": { "message": "", "quickReply": null },
    "parsedResult": null,
    "bot": {
        "nickname": "New chatflow (27. Mai 2022 15:17)",
        "conversationChannelType": "WEB",
        "chatflowId": 5764141
    },
    "module": {
        "botNickname": "New chatflow (27. Mai 2022 15:17)",
        "fallbackNextModuleNickname": null,
        "failureNextModuleNickname": null,
        "moduleType": "LAMBDA",
        "nickname": "Ask CID",
        "prompt": null,
        "promptHtml": null,
        "config": { "functionId": 31204166, "customPayload": null }
    },
    "session": {
        "vid": 238531145,
        "conversationId": 2666014986,
        "botNickname": "New chatflow (27. Mai 2022 15:17)",
        "currentModuleNickname": "Ask CID",
        "sessionStartedAt": 1653657656420,
        "lastInteractionAt": 1653657656536,
        "state": "ACTIVE",
        "customState": {},
        "responseExpected": false,
        "parsedResponses": {
            "Beispiel einer Bot-Nachricht": {
                "parsedResponse": "Hallo",
                "parsedQuickReplyLabel": null,
                "customState": {},
                "propertyChanges": {},
                "propertyValueType": "STRING",
                "success": true,
                "preempted": false,
                "executionTime": 1653657656488
            }
        },
        "properties": {}
    },
    "customPayload": null
}

function read_input() {
    return readline(); // STDIN_FILENO = 0
}
function bot_write(text)
{
    console.warn("[Bot Says] : " + text);
}


/**
 * @this {{mainFunc:function(any, function), resCb:function}}
 * @param {{
 *  botMessage:string|undefined, 
 *  responseExpected:bool, 
 *  customState:any|undefined, 
 *  nextModuleNickname:string|undefined}
 * } params
*/
async function callback(params) {
    if(params.botMessage) bot_write(params.botMessage);
    
    example_event.session.customState = params.customState;

    if(!params.responseExpected) {
        if(!params.nextModuleNickname)
        {
            console.log("Would just go to the next step now");
            this.resCb();
            return;
        }else 
        {
            console.log("Would try to go to Step '"+ params.nextModuleNickname +"' now. If it doesnt find this it will go to the next step");
            this.resCb();
            return;
        }
    }else{
        console.log("[info] Awaiting user response");
        example_event.userMessage.message = await read_input();

        this.mainFunc(example_event, boundCB); 
    }
}

exports.run = async (name, mainFunc) =>
{
    return new Promise(async (resolve, reject) =>
    {
        console.log("-------------- [Starting " +name+ "] --------------------");
        console.log("Enter your first input")

        example_event.userMessage.message= await read_input();
    
        boundCB = callback.bind({mainFunc:mainFunc, resCb:resolve});
        mainFunc(example_event, boundCB);
    })
 

}

