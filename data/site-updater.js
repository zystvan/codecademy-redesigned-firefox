// show the number of unread notifications in the tab title
if (unsafeWindow.CCDATA && unsafeWindow.CCDATA.current_user) {
  var count = 0,
      oldCount = 0,
      title = document.querySelector('title').textContent,
      userId = unsafeWindow.CCDATA.current_user._id,
      unreadNotificationsUrl = "https://www.codecademy.com/api/v1/notifications/" + userId + "/unread_count";

  function updateCount() {
    oldCount = count;

    $.getJSON(unreadNotificationsUrl, function(data) {
      count = data.unread_count;
    }).done(function() {
      if (count != oldCount && count != undefined) {
        if (count == 0) {
          document.querySelector('title').textContent = title;
          $('.header__nav__link--notifications, .index__bell___2tSp1').removeClass("attention");
        }
        else {
          document.querySelector('title').textContent = "(" + count + ") " + title;
          $('.header__nav__link--notifications, .index__bell___2tSp1').addClass("attention");

          if (window.Notification && Notification.permission != "denied") {
            Notification.requestPermission(function(status) {
              var n = new Notification(count + ' Codecademy notifications', {
                icon: 'https://pbs.twimg.com/profile_images/499697083398381568/ih2vOpDt_400x400.png',
                body: 'Click to see your notifications',
                tag: 'codecademy-notification'
              });

              n.onclick = function() {
                var windowObjectReference = window.open("https://www.codecademy.com/notifications", "Notifications | Codecademy");
              }

              setTimeout(function() {
                n.close();
              }, 3000);
            });
          }
        }
      }
    });
  }

  updateCount();
  setTimeout(updateCount, 90000);
  setInterval(updateCount, 90000);
}

// add extra data to user profiles
var userDataUrl = window.location.href.substr(8).replace("/", "/api/v1/users/").toString();
userDataUrl = window.location.protocol + "//" + userDataUrl;

$.getJSON(userDataUrl, function(d) {
  unsafeWindow.CCDATA.user = d
}).done(function() {
   $(".profiles.show article.fit-full.color-scheme--darkgrey").after('<article class="fit-full color-scheme--darkgrey"><div class="fit-fixed"><div class="grid-row profile-time" style="text-align: center;"><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.points_today + '</h3><small>points today</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.streak_hash.max_count + '</h3><small>day best streak</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block"><h3 class="padding-right--quarter">' + unsafeWindow.CCDATA.user.points_hash.best_points_day + '</h3><small>best points day</small></div></div></div></article>');
});

$('#footer #footer__main .grid-col-4').append('<br><a href="https://github.com/A-J-C/CodecademyGroups">Codecademy Group posts saved on GitHub</a>');