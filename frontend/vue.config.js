module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Mars Rover";
      return args;
    });
  },
};
