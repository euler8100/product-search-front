import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendLoginRequest(connectionId, password) {
  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/login",
    {
      connectionId,
      password
    },
    "post"
  );
  return response;
}

function parseLoginResponse(loginResponse) {
  console.log(loginResponse);
  if (loginResponse.status.code === 200) {
    const userData = loginResponse.response.userData;

    Commons.setCookie("userData", JSON.stringify(userData), 2);

    return {
      success: true,
      message: ""
    };
  }
  // if (loginResponse.status.code === 401) {
  //   return {
  //     success: false,
  //     message: "Incorrect credential",
  //     badConnectionId: loginResponse.response.error.errorCode === "400-1",
  //     badPassword: loginResponse.response.error.errorCode === "400-2"
  //   };
  // }
  return {
    success: false,
    message: "Erreur, veuillez réessayer",
    badConnectionId: false,
    badPassword: false
  };
}
async function login(connectionId, password) {
  console.log("login");
  const loginResponse = await sendLoginRequest(connectionId, password);
  const parsedResponse = parseLoginResponse(loginResponse);
  console.log(parsedResponse);
  return parsedResponse;
}

export {login}
