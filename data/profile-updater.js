var profile = function() {
  if($("form").attr("action") == "/admin/user_present?method=post") {
    $.getJSON('/api/v1/users' + window.location.pathname, function(d) {
      CCDATA.user = d
    }).done(function() {
      $("article.fit-full.color-scheme--darkgrey").after('<article class="fit-full color-scheme--darkgrey"><div class="fit-fixed"><div class="grid-row profile-time" style="text-align: center;"><div class="grid-col-3 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + CCDATA.user.points_today + '</h3><small>points today</small></div><div class="grid-col-3 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + CCDATA.user.streak_hash.max_count + '</h3><small>day best streak</small></div></div></div></article>');
    });
  }
}

var script = document.createElement("script");
script.textContent = "(" + profile.toString() + "())";
document.documentElement.appendChild(script);