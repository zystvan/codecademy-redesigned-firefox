// import the self api
var self = require('sdk/self');
// import the page-mod api
var pageMod = require("sdk/page-mod");

// create a bunch of page-mods
// load some files everywhere on codecademy
// profile-updater.js is only supposed to be for profiles but theres no way
// to detect whether you're on someones profile or not that i know of :/
pageMod.PageMod({
  include: "*.codecademy.com",
  exclude: /.*production.*codecademy\.com.*/,
  contentScriptFile: ["./jquery-1.11.1.js", "./site-updater.js"],
  contentStyleFile: "./site-updater.css"
});
// load some files whenever we're on a forum
pageMod.PageMod({
  include: /.*codecademy.com\/.*forum.*/,
  contentScriptFile: "./forum-updater.js",
  contentStyleFile: "./forum-updater.css"
});