// cre => codecademy redesigned extension
if (!localStorage.getItem("cre_710_notification_seen")) {
  var body = qS('body'),
      div = document.createElement('div'),
      div2 = document.createElement('div'),
      div3 = document.createElement('div'),
      div4 = document.createElement('div'),
      h1 = document.createElement('h1'),
      h2 = document.createElement('h2'),
      ul = document.createElement('ul'),
      li = document.createElement('li'),
      li2 = document.createElement('li'),
      li3 = document.createElement('li');

  div.setAttribute("id", "new-version-popup-container");
  div.classList.add("new-version");

  div2.classList.add("popup-background");

  div3.setAttribute("id", "close-new-version-popup");
  div3.classList.add("popup-close");
  div3.textContent = "×"; // &times;, but `textContent` escapes stuff

  div4.classList.add("popup");

  h1.textContent = "Codecademy Redesigned 7.1.0";
  h2.textContent = "What's new?";

  li.textContent = "A link to the lesson a question is on! Just look to the right of the category under a topic title and click the button.";
  li2.textContent = "Canned responses are deletable now, just click the trash can icon on the right side of a canned response's name. (A quick reminder on how to create one: highlight text in the composer, then click the canned response icon, then 'New canned response')";
  li3.textContent = "Easily access a user's profile on the main site by clicking the button to the right of their name on their profile";


  ul.appendChild(li);
  ul.appendChild(li2);
  ul.appendChild(li3);
  div4.appendChild(h1);
  div4.appendChild(h2);
  div4.appendChild(ul);
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  body.appendChild(div);
  
  div3.addEventListener("click", function() {
    div.setAttribute("style", "display: none;");
  });

  localStorage.setItem("cre_710_notification_seen", true);
  
  /*
  ^ the above code generates this html:
  
  <div id="new-version-popup-container" class="new-version" style="display: none">
    <div class="popup-background"></div>
    <div id="close-new-version-popup" class="popup-close">&times;</div>
    <div class="popup">
      <h1>Codecademy Redesigned [version]</h1>
      <h2>What's new?</h2>
      <ul>
        <li>List</li>
        <li>of new</li>
        <li>features</li>
      </ul>
    </div>
  </div>
  */
}