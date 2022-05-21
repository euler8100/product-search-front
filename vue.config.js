module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },
  chainWebpack: config => {
    config.module
      .rule("raw")
      .test(/(\.http)|\.java/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
  devServer: {
   // host: '0.0.0.0',
    disableHostCheck: true,
    //public: "https://0945-197-234-221-168.ngrok.io",
  },
};
