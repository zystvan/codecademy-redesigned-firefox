var updater = function() {
  var count = 0;
  var oldCount = 0;
  var title = $("title").html();
  var userId = CCDATA.current_user._id
  var unreadNotificationsUrl = "https://www.codecademy.com/api/v1/notifications/" + userId + "/unread_count";

  var updateCount = function() {
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

          if (window.Notification && Notification.permission !== "denied") {
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
  setTimeout( updateCount, 2000 );
  setInterval(updateCount, 5000);
}

var script = document.createElement("script");
script.textContent = "(" + updater.toString() + "())";
document.documentElement.appendChild(script);