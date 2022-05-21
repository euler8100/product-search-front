const mixpanel = require("mixpanel-browser");
const { Commons } = require("./commons");

class AnalyticsUtils {
  static initAnalytics(isFirsVisit) {
    window.smallKash.mixpanel = mixpanel;
    window.smallKash.mixpanel.init(getMixpanelKey(), {
      debug: !Commons.isLiveEnv()
    });
    window.smallKash.mixpanel.track("website visit");
    if (isFirsVisit) {
      window.smallKash.mixpanel.track("website first visit");
    }
  }
  static catchEvent(eventName, eventData) {
    window.smallKash.mixpanel.track(eventName, eventData);
  }
}

function getMixpanelKey() {
  if (Commons.isLiveEnv()) {
    return liveMixpanelKey;
  }
  return devMixpanelKey;
}

const liveMixpanelKey = "b385c1045e069b2cb205e6c9ded202ae";
const devMixpanelKey = "fbc2da6f3739ddd834cc939f81062aa0";

exports.AnalyticsUtils = AnalyticsUtils;
