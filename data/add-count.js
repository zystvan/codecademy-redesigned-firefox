var updater = function() {
	// get a cookie's value
	// http://stackoverflow.com/a/4825695/4013202
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");

			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);

				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}

	var count = 0;
	var oldCount = 0;
	var title = $("title").html();
	var user_id = getCookie("ajs_user_id").replace(/['"]+/g, '');
	var unread_notifications_url = "https://www.codecademy.com/api/v1/notifications/" + user_id + "/unread_count";

	var updateCount = function() {
		oldCount = count;

		$.getJSON(unread_notifications_url, function(data) {
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

//var script = document.createElement("script");
var script = $('body').createElement("script")
script.textContent = "(" + updater.toString() + "())";
document.documentElement.appendChild(script);