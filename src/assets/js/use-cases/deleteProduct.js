import { Commons } from "../utils/commons";
import { RequestUtils } from "../utils/requestUtils";

async function sendDeleteRequest(productUuid) {
  const userUuid = Commons.getUserUuid();

  console.log(productUuid);

  const response = await RequestUtils.sendRequestTo(
    Commons.serverBaseUrl() + "/product/delete",
    { uuid:productUuid, userUuid },
    "post"
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
    message: "Une Erreur s'est produite, veuillez réessayer la suppression",
    product: null,
  };
}

async function deleteProduct(productUuid) {
  console.log("delete product");
  const updateResonse = await sendDeleteRequest(productUuid);
  const parsedResponse = parseResponse(updateResonse);
  console.log(parsedResponse);
  return parsedResponse;
}

export { deleteProduct };
