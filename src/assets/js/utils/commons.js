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
    return dataProperties && dataProperties.length === 0;
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

  static setCookie(name, value, expireDays) {
    return setCookie(name, value, expireDays);
  }

  static getCookie(names) {
    return getCookie(names);
  }

  static cookieExists(name, value, expireDays) {
    return cookieExists(name, value, expireDays);
  }
  static getUserUuid() {
    const userDataString = Commons.getCookie("userData");
    if (Commons.isEmpty(userDataString)) {
      window.location.reload();
    }
    let userData = {};
    try {
      userData = JSON.parse(userDataString);
    } catch (e) {
      Commons.setCookie("userData", { uuid: "" });
    }
    return userData.uuid || "";
  }

  static async getPosition(notify = () => {}) {
    const localisationAccepted = Commons.getCookie("authorizedLocalization");
    if (!localisationAccepted) {
      notify({
        text: "Veuillez nous envoyer votre locatisation pour de meilleur résultats",
        duration: 5000,
        progress: true,
      });
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
          Commons.setCookie("authorizedLocalization", "ok", 100);
        },
        (error) => {
          console.log(error);
          resolve({ error: true });
        },
        { enableHighAccuracy: true }
      );
    });
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cookieExists(cname) {
  const cookie = getCookie(cname);
  return !!cookie;
}

// const devServerUrl = "https://guangzhou-api.herokuapp.com";
// const devServerUrl = "https://3ef6-156-0-214-6.ngrok.io";
const devServerUrl = "https://monster-search-api.herokuapp.com";
const liveServerUrl = "https://monster-search-api.herokuapp.com";

const devEmailReceiver = "dougbeeuler@gmail.com";
const liveEmailReceiver = "dougbeeuler@gmail.com";

exports.Commons = Commons;
