var groupUpdate = function() {
	$("div#footer__main div#footer__company__links").after('<br><a href="https://github.com/A-J-C/CodecademyGroups" target="_blank">Codecademy Group Posts Saved on GitHub</a>');
}

var script = document.createElement("script");
script.textContent = "(" + groupUpdate.toString() + "())";
document.documentElement.appendChild(script);