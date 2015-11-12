// remove the notification bell since it's not being used anymore
$('#header__notifications, .index__tab___3LOiu.index__tabButton___2ycO7').remove();

// add extra data to user profiles
var userDataUrl = window.location.href.substr(8).replace("/", "/api/v1/users/").toString();
userDataUrl = window.location.protocol + "//" + userDataUrl;

$.getJSON(userDataUrl, function(d) {
  unsafeWindow.CCDATA.user = d
}).done(function() {
   $(".profiles.show article.fit-full.color-scheme--darkgrey").after('<article class="fit-full color-scheme--darkgrey"><div class="fit-fixed"><div class="grid-row profile-time" style="text-align: center;"><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.points_today + '</h3><small>points today</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.streak_hash.max_count + '</h3><small>day best streak</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.points_hash.best_points_day + '</h3><small>best points day</small></div></div></div></article>');
});

// add a link in the footer to the github repo with some old group posts
$('#footer #footer__main .grid-row #footer__company__links').after('<br><a href="https://github.com/A-J-C/CodecademyGroups">Codecademy Group posts saved on GitHub</a>');