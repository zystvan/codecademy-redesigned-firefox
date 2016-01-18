// make the notification bell link to discuss.codecademy.com/username/notifications
if (unsafeWindow.CCDATA && unsafeWindow.CCDATA.current_user) {
  var username = unsafeWindow.CCDATA.current_user.username;
  qS('.index__bell___2tSp1 a, .header__nav__link--notifications a').setAttribute("href", "http://discuss.codecademy.com/users/" + username + "/notifications");
}

// add extra data & a link to the users' discuss profile to user profiles on the main site
var userDataUrl = window.location.href.substr(8).replace("/", "/api/v1/users/").toString();
userDataUrl = window.location.protocol + "//" + userDataUrl;

getJSON(userDataUrl, function(d) {
  unsafeWindow.CCDATA.user = d;
  
  qS(".profiles.show article.fit-full.color-scheme--darkgrey").innerHTML += '<article class="fit-full color-scheme--darkgrey"><div class="fit-fixed"><div class="grid-row profile-time" style="text-align: center;"><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.points_today + '</h3><small>points today</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.streak_hash.max_count + '</h3><small>day best streak</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.points_hash.best_points_day + '</h3><small>best points day</small></div></div></div></article>';
});

var userUsername = window.location.pathname.replace("/", ""),
    userDiscussProfileLink = "http://discuss.codecademy.com/users/" + userUsername + "/activity",
    userName = qS('.grid-col-6.grid-col--center.grid-col--align-center.grid-col--extra-margin-top h3').textContent,
    h3 = qS('.grid-col-6.grid-col--center.grid-col--align-center.grid-col--extra-margin-top h3'),
    a = document.createElement('a');

a.setAttribute("href", userDiscussProfileLink);
a.setAttribute("title", "Open Discuss profile");
a.classList.add("discuss-link");
a.textContent = userName;
h3.textContent = "";

h3.appendChild(a);

// add a link in the footer to the github repo with some old group posts
var footer = qS('#footer #footer__main .grid-row #footer__company__links'),
    br = document.createElement('br'),
    br2 = document.createElement('br'),
    a2 = document.createElement('a');

a2.setAttribute("href", "https://github.com/A-J-C/CodecademyGroups");
a2.classList.add("saved-group-posts-link");
a2.textContent = "Codecademy Group posts saved on GitHub";

footer.appendChild(br);
footer.appendChild(br2);
footer.appendChild(a2);