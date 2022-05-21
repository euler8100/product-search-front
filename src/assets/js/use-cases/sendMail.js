const { Commons } = require("../utils/commons");
const { RequestUtils } = require("../utils/requestUtils");

async function sendMail(firstName, lastName, reason, email, message) {
  console.log("signupFunction", firstName, lastName, reason, email, message);
  const signupResponse = await sendMailRequest(
    firstName,
    lastName,
    reason,
    email,
    message
  );
  const parsedResponse = parseMailResponse(signupResponse);
  console.log(parsedResponse);
  return parsedResponse;
}

async function sendMailRequest(firstName, lastName, reason, email, message) {
  const messageToSend = `
  From: ${firstName} ${lastName} - ${email} |
  Reason: ${reason} | 
   ------------------- Message: 
  ${message}
  `;
  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/mail",
    {
      from: email,
      to: Commons.getMailReceiver(),
      subject: "Chipdeals website mesage - " + reason,
      messageHtml: messageToSend,
    },
    "post"
  );
  return response;
}

function parseMailResponse(subscriptionResponse) {
  console.log(subscriptionResponse);
  if (subscriptionResponse.status.code === 200) {
    return {
      success: true,
      message: "",
    };
  }
  if (subscriptionResponse.status.code === 400) {
    return {
      success: false,
      message: "Please check data in the fields",
    };
  }
  if (subscriptionResponse.status.code === 500) {
    return {
      success: false,
      message: "Sorry, an error occured. Chec Please try again later",
    };
  }
  return {
    success: false,
    message: "Sorry an error occured. Check your netword and retry",
  };
}

exports.sendMail = sendMail;
