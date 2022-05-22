import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendCreationRequst(productData) {
  const userUuid = Commons.getUserUuid();

  const formData = new FormData();
  console.log(productData);
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("marketUuid", productData.marketUuid);
  formData.append("price", productData.price);
  formData.append("userUuid", userUuid);

  if (Object.prototype.hasOwnProperty.call(productData, "picture")) {
    formData.append("picture", productData.picture);
  }

  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/product/create",
    formData,
    "post",
    {
      "Content-Type": "multipart/form-data",
    }
  );
  return response;
}

function parseResponse(creationResponse) {
  console.log(creationResponse);
  if (creationResponse.status.code === 200) {
    return {
      success: true,
      message: "",
    };
  }
  // if (creationResponse.status.code === 400) {
  //   return {
  //     success: false,
  //     message: "Please check all the fields are correct",
  //   };
  // }
  // if (creationResponse.status.code === 404) {
  //   window.location.reload();
  // }
  return {
    success: false,
    message: "Une Erreur s'est produite, réessayez",
  };
}

async function createProduct(productData) {
  console.log("create product");
  const creationResponse = await sendCreationRequst(productData);
  const parsedResponse = parseResponse(creationResponse);
  console.log(parsedResponse);
  return parsedResponse;
}

export { createProduct };
