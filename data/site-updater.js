// add extra data & a link to the users' discuss profile to user profiles on the main site
var userDataUrl = window.location.href.substr(8).replace("/", "/api/v1/users/").toString();
userDataUrl = window.location.protocol + "//" + userDataUrl;

fetch(userDataUrl).then(function(response) {
  return response.json();
}).then(function(json) {
  var article = document.createElement('article'),
      div = document.createElement('div'),
      div2 = document.createElement('div'),
      div3 = document.createElement('div'),
      div4 = document.createElement('div'),
      div5 = document.createElement('div'),
      h3 = document.createElement('h3'),
      h32 = document.createElement('h3'),
      h33 = document.createElement('h3'),
      small = document.createElement('small'),
      small2 = document.createElement('small'),
      small3 = document.createElement('small');
  
  article.classList.add("fit-full", "color-scheme--darkgrey");
  div.classList.add("fit-fixed");
  div2.classList.add("grid-row", "profile-time");
  div3.classList.add("grid-col-4", "grid-col--align-center");
  h3.classList.add("padding-right--quarter");
  h3.textContent = json.points_today;
  small.textContent = "points today";
  div4.classList.add("grid-col-4", "grid-col--align-center");
  h32.classList.add("padding-right--quarter");
  h32.textContent = json.streak_hash.max_count;
  small2.textContent = "day best streak";
  div5.classList.add("grid-col-4", "grid-col--align-center");
  h33.classList.add("padding-right--quarter");
  h33.textContent = json.points_hash.best_points_day;
  small3.textContent = "best points day";
  
  div3.appendChild(h3);
  div3.appendChild(small);
  div4.appendChild(h32);
  div4.appendChild(small2);
  div5.appendChild(h33);
  div5.appendChild(small3);
  div2.appendChild(div3);
  div2.appendChild(div4);
  div2.appendChild(div5);
  div.appendChild(div2);
  article.appendChild(div);
  qS('.profiles.show article.fit-full.color-scheme--darkgrey').appendChild(article);
  
  /*
  ^ that code above generates this html structure: 
  
  <article class="fit-full color-scheme--darkgrey">
    <div class="fit-fixed">
      <div class="grid-row profile-time">
        <div class="grid-col-4 grid-col--align-center">
          <h3 class="padding-right--quarter">{ points today }</h3>
          <small>points today</small>
        </div>
        <div class="grid-col-4 grid-col--align-center">
          <h3 class="padding-right--quarter">{ day best streak }</h3>
          <small>day best streak</small>
        </div>
        <div class="grid-col-4 grid-col--align-center">
          <h3 class="padding-right--quarter">{ best points day }</h3>
          <small>best points day</small>
        </div>
      </div>
    </div>
  </article>
  */
});

if (qS('.grid-col-6.grid-col--center.grid-col--align-center.grid-col--extra-margin-top h3')) {
  var userUsername = window.location.pathname.replace("/", ""),
      userDiscussProfileLink = "https://discuss.codecademy.com/users/" + userUsername + "/activity",
      userName = qS('.grid-col-6.grid-col--center.grid-col--align-center.grid-col--extra-margin-top h3').textContent,
      h34 = qS('.grid-col-6.grid-col--center.grid-col--align-center.grid-col--extra-margin-top h3'),
      a = document.createElement('a');

  a.setAttribute("href", userDiscussProfileLink);
  a.setAttribute("title", "Open Discuss profile");
  a.classList.add("discuss-link");
  a.textContent = userName;
  h34.textContent = "";

  h34.appendChild(a);
}

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