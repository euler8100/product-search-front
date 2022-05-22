import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendProductGettingRequest(marketUuid) {
  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/product/get/market",
    { marketUuid },
    "post"
  );
  return response;
}

function parseResponse(productResponse) {
  console.log(productResponse);

  return {
    success: true,
    message: "",
    products: [
      {
        name: "my product",
        description: "That is the mor best product",
        price: 5000,
        uuid: "unicproductId",
      },
    ],
  };

  if (productResponse.status.code === 200) {
    return {
      success: true,
      message: "",
      products: productResponse.response.products,
    };
  }
  // if (productResponse.status.code === 401) {
  //   window.location.reload();
  // }
  return {
    success: false,
    message: "Une erreur s'est produite, veuillez réessayer",
    products: [],
  };
}
async function getProductsByMarket(marketUuid) {
  console.log("get product");
  const productResponse = await sendProductGettingRequest(marketUuid);
  const parsedResponse = parseResponse(productResponse);
  return parsedResponse;
}

export { getProductsByMarket };
