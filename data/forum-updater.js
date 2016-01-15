(function forumUpdater(window){
  if(document.readyState !== "complete"){
    setTimeout(forumUpdater, 500, window);  return false;
  }
	
  // for use below, they need to be defined globally
  var cannedResponses,
      HtmlListOfCannedResponses;

  // get the canned responses
  function getCannedResponses() {
    if (!localStorage.getItem("canned_responses")) {
      cannedResponses = {};
      localStorage.setItem("canned_responses", JSON.stringify(cannedResponses));
    }

    cannedResponses = JSON.parse(localStorage.getItem("canned_responses"));

    return cannedResponses;
  };

  // generate the list of canned responses
  function generateHtmlListOfCannedResponses() {
    getCannedResponses();
    HtmlListOfCannedResponses = '<li id="new-canned-response"><a href="javascript:void(0);">Create new canned response</a></li>';

    for (var i in cannedResponses) {
      HtmlListOfCannedResponses += '<li data-canned-response-id="' + i + '"><a href="javascript:void(0);">' + cannedResponses[i]["name"] + '</a><span class="fa fa-trash" data-canned-response-id="' + i + '"></span></li>';
    }

    return HtmlListOfCannedResponses;
  }

  // add the canned response button to the formatting bar
  function addCannedResponseButton() {
    var ebb = qS('.d-editor-button-bar');
    ebb.innerHTML += '<div class=\"d-editor-spacer\"></div><button class=\"ember-view btn no-text canned-response\" id=\"canned-response-button\" title=\"Canned responses\" aria-label=\"Canned responses\"><i class=\"fa fa-pencil-square-o\"></i></button>'
    ebb.innerHTML += '<div class="canned-response-container" id="canned-response-container"><ul id="canned-responses-list">' + HtmlListOfCannedResponses + '</ul></div>';

    qS('.canned-response-container').hide();
  };

  // create a new canned response
  function newCannedResponse() {
    var textarea = qS("textarea"),
        start = textarea.selectionStart,
        end = textarea.selectionEnd,
        cannedResponseText = textarea.value.substring(start, end),
        cannedResponseName = prompt("Please name your canned response:", cannedResponseText.slice(0, 10) + "...");

    qS('#canned-response-container').toggle();
    qS('.d-editor-button-bar').toggleClass("active");

    if (!cannedResponseName) {
      return false;
    }

    cannedResponses[Object.keys(cannedResponses).length] = { "name": cannedResponseName, "body": cannedResponseText }
    localStorage.setItem("canned_responses", JSON.stringify(cannedResponses));

    generateHtmlListOfCannedResponses();

    qS('#canned-responses-list').innerHTML = HtmlListOfCannedResponses;		
  }

  function prefillWithCannedResponse(text) {
    qS('.d-editor-input').value += text;
    qS('#canned-response-container').hide();
    /////////////////////////////////////////////////////// todo: figure out how to put focus back on the `<textarea>`
    qS('.d-editor-button-bar').removeClass("active");
  }

  // delete a canned response
  function deleteCannedResponse(element) {
    var cannedResponseId = element.target.getAttribute("data-canned-response-id");
    cannedResponses = JSON.parse(localStorage.getItem("canned_responses"))

    delete cannedResponses[cannedResponseId]

    localStorage.setItem("canned_responses", JSON.stringify(cannedResponses))

    generateHtmlListOfCannedResponses();

    qS('#canned-responses-list').innerHTML = HtmlListOfCannedResponses;
    qS('.canned-response-container').hide();
    qS('.d-editor-button-bar').removeClass("active");
  }

  // collect all the other functions together and run them
  function runTheCannedResponseFunctions() {
    generateHtmlListOfCannedResponses();
    addCannedResponseButton();

    qS('#canned-response-button').addEventListener("click", function() {
      qS('.canned-response-container').toggle();
      qS('.d-editor-button-bar').toggleClass("active");
      
      var allCRs = document.querySelectorAll('#canned-responses-list li').not('#canned-responses-list li .fa-trash');
      for (i in allCRs) {
        if (!isNaN(i)) {
          var CR = allCRs[i];
          CR.addEventListener("click", function() {
            prefillWithCannedResponse(cannedResponses[this.getAttribute("data-canned-response-id")]["body"]);
          });
        }
      }
      
      qS('#new-canned-response').addEventListener("click", function() {
          newCannedResponse();
      });
      
      if (qS('#canned-responses-list li .fa-trash')) {
        // can't use `qSAll()` for some reason, throws error. 
        // would love to know why if someone can figure it out
        var allCRTrashCans = document.querySelectorAll('#canned-responses-list li .fa-trash')
        
        for (i in allCRTrashCans) {
          var CRTrashCan = allCRTrashCans[i];
          
          // `onclick()` instead of `addEventListener()` because addeventlistener
          // throws an error would love to know why for this too
          CRTrashCan.onclick = function(event) {
            deleteCannedResponse(event);
            return false;
          };
        }
      }
    });
  };

  // detect when the text box is popped up, then run
  var target = qS('#reply-control'),
      config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      };

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var dep = qS('.d-editor-preview'),
          crb = qS('#canned-response-button');
      
      if (!crb) {
        dep.addClass('cooked');
        
        runTheCannedResponseFunctions();
      }
    });
  });

  observer.observe(target, config);
	
  /* New Exercise Button*/

  var lessonType1 = "Python, Ruby, JavaScript, HTML & CSS, PHP, jQuery, Make an Interactive Website, Make a Website, Goals, APIs",
      lessonType2 = "Learn the Command Line, Learn Java, Ruby on Rails: Authentication, Learn AngularJS, Learn SQL, Learn Git, Learn Rails, Make an Interactive Website: Projects, Make a Website: Projects",
      forumPostRegex = /discuss.codecademy.com\/t/,
      pageURL = window.location.href;
	
  btnInjection();
  // whenever we click on one forum post, it doesn't
  // reload the page, just changes the URL using AJAX
  // hence the need for this function
  setInterval(checkURLChange, 1000);

  function checkURLChange() {
    var newPageURL = window.location.href;

    if (newPageURL !== pageURL) {
      pageURL = newPageURL;			

      // wait for page to load before executing btnInjection
      var interval = setInterval(function() {
        if(document.readyState === "complete") {
          try {
            btnInjection(); clearInterval(interval);
          } catch(e) {}
        }
      }, 50);
    }			
  }
	
  function btnInjection(){
    if(!forumPostRegex.test(pageURL)) return;

    var category = qS(".title-wrapper .badge-wrapper.bullet:first-child .badge-category").innerText,
        hrefElmAll = qSAll("a.badge-wrapper.bullet"),
        hrefElm = hrefElmAll[hrefElmAll.length - 1],
        href = hrefElm.getAttribute("href").split("/"),
        URL = "https://www.codecademy.com/courses/";

    if (lessonType1.indexOf(category) > -1)
        URL += href[3];
    else if (lessonType2.indexOf(category) > -1)
        URL += href[2] + "#unit_" + href[3];

    // meta or lounge categories with no linked forums
    else URL = "";

    var a, img, container, span;

    if (URL !== "") {
      try{				
        container = document.querySelector(".title-wrapper > .ember-view .list-tags");

        // link already exists
        if(container.querySelector(".new_tab_exercise_link") !== null) return;

        span = document.createElement("span"); // just to add some spacing from tag list
        a = document.createElement("a");
        i = document.createElement("i");

        a.href = URL;
        a.target = "_blank";
        a.classList.add("new_tab_exercise_link");

        i.id = "external-link-button";
        i.classList.add("fa", "fa-external-link");
        i.title = "Open exercise in new tab";

        span.innerHTML = "&nbsp;";

        a.appendChild(i);
        container.appendChild(span);
        container.appendChild(a);
      } catch(e) {
        console.error(e);
      }
    }
  }
	
  // userButton.js; not every discuss page is user page. So, try-block is needed
  try {
    var id = chrome.runtime.id,
        elm = qS(".user-main .about .details .primary h1"),
        url = "https://www.codecademy.com/" + elm.innerHTML.split("<")[0];

    elm.insertAdjacentHTML("beforeend", "<a target='_blank' href=" + url + "> <img id='userLink' src='chrome-extension://" + id + "/ntwhite.png' alt='CC Profile' title='Opens the users&#39; CC Profile'/> </a>");
    document.body.insertAdjacentHTML("afterend", '<style>#userLink{height: 20px;width: 20px;margin-top: -5px;}#userLink:hover {	cursor: pointer;content:url("chrome-extension://'+id+'/ntgreen.png");}</style>');
  } catch(e){
    console.log("Error", e);
  }
})(window);