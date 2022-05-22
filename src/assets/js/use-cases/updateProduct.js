import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendUpdateRequst(productData) {
  const userUuid = Commons.getUserUuid();

  const formData = new FormData();
  console.log(productData);
  formData.append("uuid", productData.uuid);
  formData.append("userUuid", userUuid);

  if (Object.prototype.hasOwnProperty.call(productData, "name")) {
    formData.append("name", productData.name);
  }
  if (Object.prototype.hasOwnProperty.call(productData, "description")) {
    formData.append("description", productData.description);
  }
  if (Object.prototype.hasOwnProperty.call(productData, "price")) {
    formData.append("price", productData.price);
  }
  if (Object.prototype.hasOwnProperty.call(productData, "picture")) {
    formData.append("picture", productData.picture);
  }

  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/product/update",
    formData,
    "post",
    {
      "Content-Type": "multipart/form-data",
    }
  );
  return response;
}

function parseResponse(updateResonse) {
  console.log(updateResonse);
  if (updateResonse.status.code === 200) {
    return {
      success: true,
      message: "",
    };
  }
  // if (updateResonse.status.code === 400) {
  //   return {
  //     success: false,
  //     message: "update properties error",
  //   };
  // }
  // if (updateResonse.status.code === 401) {
  //   window.location.reload();
  // }
  return {
    success: false,
    message: "Une Erreur s'est produite, veuillez réessayer",
    product: null,
  };
}

async function updateProduct(productData) {
  console.log("update product");
  const updateResonse = await sendUpdateRequst(productData);
  const parsedResponse = parseResponse(updateResonse);
  console.log(parsedResponse);
  return parsedResponse;
}

export { updateProduct };
