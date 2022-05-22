import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendSignupRequst(connectionId, password, fullName) {
  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/signup",
    {
      connectionId,
      password,
      fullName,
    },
    "post"
  );
  return response;
}

function parseSignupResponse(signupResponse) {
  console.log(signupResponse);
  if (signupResponse.status.code === 200) {
    const userData = signupResponse.response.userData;

    Commons.setCookie("userData", JSON.stringify(userData), 1);

    return {
      success: true,
      message: "",
    };
  }
  if (signupResponse.status.code === 409) {
    return {
      success: false,
      message: "Veuillez réessayer avec une autre id de connection.",
    };
  }
  // if (signupResponse.status.code === 401) {
  //   return {
  //     success: false,
  //     message: "Incorrect credential",
  //   };
  // }
  return {
    success: false,
    message: "Erreur, veuillez réessayer",
  };
}
async function signup(connectionId, password, fullName) {
  console.log("signup");
  const signupResponse = await sendSignupRequst(
    connectionId,
    password,
    fullName
  );
  const parsedResponse = parseSignupResponse(signupResponse);
  console.log(parsedResponse);
  return parsedResponse;
}

export { signup };
