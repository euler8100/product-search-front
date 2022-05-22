import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendMarketCreationRequst(marketData) {
  const userUuid = Commons.getUserUuid();

  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/market/create",
    { ...marketData, userUuid },
    "post"
  );
  return response;
}

function parseResponse(creationResponse) {
  console.log(creationResponse);
  if (creationResponse.status.code === 200) {
    return {
      success: true,
      message: "",
      market: creationResponse.response.marketData,
    };
  }
  // if (creationResponse.status.code === 400) {
  //   return {
  //     success: false,
  //     message: "Please check all the fields are correct",
  //     market: [],
  //   };
  // }
  // if (creationResponse.status.code === 401) {
  //   window.location.reload();
  // }
  return {
    success: false,
    message: "Une erreur s'est produite, réessayez",
    market: [],
  };
}
async function createMarket(marketData) {
  console.log("create Merket");
  const creationResponse = await sendMarketCreationRequst(marketData);
  const parsedResponse = parseResponse(creationResponse);
  console.log(parsedResponse);
  return parsedResponse;
}

export { createMarket };
