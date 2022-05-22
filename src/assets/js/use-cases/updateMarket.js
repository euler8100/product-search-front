import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendMarketUpdateRequst(marketData) {
  const userUuid = Commons.getUserUuid();

  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/market/update",
    { ...marketData, userUuid },
    "post"
  );
  return response;
}

function parseResponse(updateResponse) {
  console.log(updateResponse);
  if (updateResponse.status.code === 200) {
    return {
      success: true,
      message: "",
      market: updateResponse.response.marketData,
    };
  }
  // if (updateResponse.status.code === 400) {
  //   return {
  //     success: false,
  //     message: "Please check all the fields are correct",
  //     market: [],
  //   };
  // }
  // if (updateResponse.status.code === 401) {
  //   window.location.reload();
  // }
  return {
    success: false,
    message: "Une Erreur s'est produite, réessayer",
    market: [],
  };
}
async function updateMarket(marketData) {
  console.log("update Merket");
  const updateResponse = await sendMarketUpdateRequst(marketData);
  const parsedResponse = parseResponse(updateResponse);
  console.log(parsedResponse);
  return parsedResponse;
}

export { updateMarket };
