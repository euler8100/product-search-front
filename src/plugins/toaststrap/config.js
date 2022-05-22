export default {
  install: (app) => {
    app.config.globalProperties.notify = (
      config = {
        snackbar: true,
        text: `Euler bro`,
        progress: true,
        type: "INFO",
        duration: 30000,
        position: "TOP_CENTER",
        title: "",
        pausable: false
      }
    ) => {
      return window.chipdeals_app_notify(config);
    };
    app.config.globalProperties.destroyNotification = (notificationId) => {
      window.chipdeals_app_destroy_notification(notificationId);
    };
  }
};
