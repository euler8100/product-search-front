const { login } = require("./use-cases/login.js");
const { signup } = require("./use-cases/signup.js");
const { updateProduct } = require("./use-cases/updateProduct.js");
const { updateMarket } = require("./use-cases/updateMarket.js");
const { getProductsByMarket } = require("./use-cases/getProductsByMarket.js");
const { getMarketsByUser } = require("./use-cases/getMarketsByUser.js");
const { createProduct } = require("./use-cases/createProduct.js");
const { createMarket } = require("./use-cases/createMarket.js");

class Controller {
  static login(connectionId, password) {
    return login(connectionId, password);
  }
  static signup(connectionId, password, fullName) {
    return signup(connectionId, password, fullName);
  }
  static updateProduct(productData) {
    return updateProduct(productData);
  }
  static updateMarket(marketData) {
    return updateMarket(marketData);
  }
  static getProductsByMarket(marketUUid) {
    return getProductsByMarket(marketUUid);
  }
  static getMarketsByUser() {
    return getMarketsByUser();
  }
  static createProduct(productData) {
    return createProduct(productData);
  }
  static createMarket(marketData) {
    return createMarket(marketData);
  }
}

exports.Controller = Controller;
