import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendCategoriesGettingRequest() {
  const userUuid = Commons.getUserUuid();

  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/market/get/manager",
    { userUuid },
    "POST"
  );
  return response;
}

function parseResponse(marketResponse) {
  console.log(marketResponse);

  if (marketResponse.status.code === 200) {
    return {
      success: true,
      message: "",
      markets: marketResponse.response.markets,
    };
  }
  // if (marketResponse.status.code === 401) {
  //   window.location.reload();
  // }
  return {
    success: false,
    message: "Une erreur s'est produite, veuillez réessayer",
    markets: [],
  };
}
async function getMarketsByUser() {
  console.log("get market");
  const marketResponse = await sendCategoriesGettingRequest();
  const parsedResponse = parseResponse(marketResponse);
  return parsedResponse;
}

export { getMarketsByUser };
