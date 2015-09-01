// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require('sdk/self');

// Create a page-mod
// It will load some scripts whenever a "*.codecademy.com" URL is loaded
pageMod.PageMod({
  include: "*.codecademy.com",
  contentScriptFile: [self.data.url("./jquery-1.11.1.min.js"), self.data.url("./add-count.js"), self.data.url("./forum-link.js"), self.data.url("./magic.js"), self.data.url("./profile-updater.js"), self.data.url("qa-updater.js")]
});





// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
//function dummy(text, callback) {
//  callback(text);
//}
//
//exports.dummy = dummy;
