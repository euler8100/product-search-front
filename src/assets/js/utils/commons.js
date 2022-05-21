class Commons {
  static isEmpty(data) {
    if (/number/.test(typeof data)) {
      return false;
    }
    if (!data) {
      return true;
    }
    if (Array.isArray(data)) {
      return data.length === 0;
    }
    const dataProperties = Object.values(data);
    return dataProperties && dataProperties.length == 0;
  }

  static atLeastOneIsEmpty() {
    let anyIsEmpty = false;
    [...arguments]
      .map((singleData) => {
        return Commons.isEmpty(singleData);
      })
      .map(
        (singleDataIsEmpty) => (anyIsEmpty = anyIsEmpty || singleDataIsEmpty)
      );
    return anyIsEmpty;
  }

  static isLiveEnv() {
    return process.env.NODE_ENV !== "development";
  }

  static serverBaseUrl() {
    if (Commons.isLiveEnv()) {
      return liveServerUrl;
    }
    return devServerUrl;
  }

  static getMailReceiver() {
    if (Commons.isLiveEnv()) {
      return liveEmailReceiver;
    }
    return devEmailReceiver;
  }

  static initGlobalVariables() {
    if (!Commons.isLiveEnv()) console.log(process.env);
    window.smallKash = {};
    window.smallKash.downloadFromGoogleIsVisible = false;
    window.smallKash.mixpanel = {
      track: () => {
        console.error(new Error("Please, init analytics before"));
      },
    };
  }
}

// const devServerUrl = "https://guangzhou-api.herokuapp.com";
const devServerUrl = "https://mlmgroug-trading-api.herokuapp.com";
const liveServerUrl = "https://mlmgroug-trading-api.herokuapp.com";

const devEmailReceiver = "dougbeeuler@gmail.com";
const liveEmailReceiver = "products@chipdeals.me";

exports.Commons = Commons;
