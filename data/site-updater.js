function siteUpdater() {
  // show the number of unread notifications in the tab title
  if (unsafeWindow.CCDATA && unsafeWindow.CCDATA.current_user) {
    var count = 0,
        oldCount = 0,
        title = $("title").html(),
        userId = unsafeWindow.CCDATA.current_user._id,
        unreadNotificationsUrl = "https://www.codecademy.com/api/v1/notifications/" + userId + "/unread_count";

    function updateCount() {
      oldCount = count;

      $.getJSON(unreadNotificationsUrl, function(data) {
        count = data.unread_count
      }).done(function() {
        if (oldCount != count && count != undefined) {
          if (count == 0) {
              $("title").html(title);
          }
          else {
            $("title").html("(" + count + ") " + title);

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
    setTimeout(updateCount, 7000);
    setInterval(updateCount, 7000);
  }
  
  // update users' profiles with some additional info
  $.getJSON('https://www.codecademy.com/api/v1/users' + window.location.pathname, function(data) {
    var user = data;
  }).done(function() {
    $("article.fit-full.color-scheme--darkgrey").after('<article class="fit-full color-scheme--darkgrey"><div class="fit-fixed"><div class="grid-row profile-time" style="text-align: center;"><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + user.points_today + '</h3><small>points today</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + user.streak_hash.max_count + '</h3><small>day best streak</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block"><h3 class="padding-right--quarter">' + user.points_hash.best_points_day + '</h3><small>Best points day</small></div></div></div></article>');
  });
  
  // add a link in the footer pointing to old group posts
  $("div#footer__main div#footer__company__links").after('<br><a href="https://github.com/A-J-C/CodecademyGroups">Codecademy Group Posts Saved on GitHub</a>');
}

siteUpdater();