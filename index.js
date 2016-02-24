var self = require("sdk/self"),
    pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "https://www.codecademy.com*",
  contentScriptFile: ["./essentials.js", "./site-updater.js", "./new-version.js"],
  contentStyleFile: ["./site-updater.css", "./new-version.css"]
});
pageMod.PageMod({
  include: /.*discuss.codecademy.com.*/,
  contentScriptFile: ["./essentials.js", "./forum-updater.js", "./admin.js", "./new-version.js"],
  contentStyleFile: ["./forum-updater.css", "./new-version.css"]
});

exports.onUnload = function(reason) {
  if (reason == "uninstall" || reason == "disable") {
    bodyListener.disconnect();
  }
};