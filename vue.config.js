const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //  host: '0.0.0.0',
    allowedHosts: "all",
    // public: "https://0945-197-234-221-168.ngrok.io",
    // webSocketServer: require("child_process").execSync("gp url 8080").toString().trim(),
    client: {
      webSocketURL:  require("child_process").execSync("gp url 8080").toString().trim(),
    },
  },
});
