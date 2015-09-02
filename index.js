// import the self api
var self = require('sdk/self');
// import the page-mod api
var pageMod = require("sdk/page-mod");

// create a page-mod
// load some scripts everywhere on codecademy
// profile-updater.js is only supposed to be for profiles, but there's no way
// to detect whether you're on someone profiles or not :/
pageMod.PageMod({
  include: "*.codecademy.com",
  contentScriptFile: ["./jquery-1.11.1.js", "./site-updater.js"],
  contentStyleFile: "./site-updater.css"
});

// create a page-mod
// load some forum scripts whenever we're on a forum
pageMod.PageMod({
  include: "https://www.codecademy.com/forum*",
  contentScriptFile: ["./jquery-1.11.1.js", "./forum-updater.js"],
  contentStyleFile: "./forum-updater.css"
});

// create a page-mod
// load some forum scripts whenever we're on a forum
pageMod.PageMod({
  include: "https://codecademy.com/forum*",
  contentScriptFile: ["./jquery-1.11.1.js", "./forum-updater.js"],
  contentStyleFile: "./forum-updater.css"
});