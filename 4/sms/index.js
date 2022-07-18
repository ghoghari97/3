// nexmo.com

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "0b0f31f6",
  apiSecret: "pUiz4j6CVkbKBZq5"
})

const from = "Vonage APIs"
const to = "919428893063"
const text = 'A text message sent using the Vonage SMS API'

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})