/***************************************************

Canned Responses

***************************************************/


// for use below, they need to be defined globally
var cannedResponses,
    htmlListOfCannedResponses;

// get the canned responses
function getCannedResponses() {
  if (!localStorage.getItem("canned_responses")) {
    cannedResponses = {}
    localStorage.setItem("canned_responses", JSON.stringify(cannedResponses));
  }

  cannedResponses = localStorage.getItem("canned_responses");
  cannedResponses = JSON.parse(cannedResponses);

  return cannedResponses;
};

// generate the list of canned responses
function generateHtmlListOfCannedResponses() {
  getCannedResponses();

  htmlListOfCannedResponses = '<li id="new-canned-response"><a href="javascript:void(0);">Create new</a></li>';

  for (i in cannedResponses) {
    htmlListOfCannedResponses += '<li data-canned-response-id="' + i + '"><a href="javascript:void(0);">' + cannedResponses[i]["name"] + '</a><i class="fa fa-trash" data-canned-response-id="' + i + '"></i></li>';
  }

  return htmlListOfCannedResponses;
};

// add the canned response button to the formatting bar
function addCannedResponseButton() {
  $('.d-editor-button-bar').append('<div class=\"d-editor-spacer\"></div><button class=\"ember-view btn no-text canned-response\" id=\"canned-response-button\" title=\"Canned responses\" aria-label=\"Canned responses\"><i class=\"fa fa-pencil-square-o\"></i></button>');
  $('.d-editor-button-bar').append('<div class="canned-response-container" id="canned-response-container"><ul id="canned-responses-list">' + htmlListOfCannedResponses + '</ul></div>');
  $('.canned-response-container').hide();
};

// create a new canned response
function newCannedResponse() {
  var textarea = document.querySelector("textarea"),
      start = textarea.selectionStart,
      end = textarea.selectionEnd,
      cannedResponseText = textarea.value.substring(start, end),
      cannedResponseName = prompt("Please name your canned response:", cannedResponseText.slice(0, 10) + "...");

  if (!cannedResponseName) {
    $('#canned-response-container').toggle();
    $('.d-editor-button-bar').toggleClass("active");
    
    return false;
  }

  cannedResponses[Object.keys(cannedResponses).length] = { "name": cannedResponseName, "body": cannedResponseText }
  
  localStorage.setItem("canned_responses", JSON.stringify(cannedResponses));

  generateHtmlListOfCannedResponses();

  $('#canned-responses-list').html(htmlListOfCannedResponses);
  
  $('#canned-response-container').toggle();
  $('.d-editor-button-bar').toggleClass("active");
};

// put the canned response text into the textarea
function prefillWithCannedResponse(text) {
  $('.d-editor-input')[0].value += text;
  $('#canned-response-container').hide();
  $('.d-editor-input').focus().keyup();
};

// delete a canned response
function deleteCannedResponse(element) {
  var cannedResponseId = element.target.getAttribute("data-canned-response-id");
  cannedResponses = JSON.parse(localStorage.getItem("canned_responses"))
  
  delete cannedResponses[cannedResponseId]
  
  localStorage.setItem("canned_responses", JSON.stringify(cannedResponses))
  
  generateHtmlListOfCannedResponses();
  
  $('#canned-responses-list').html(htmlListOfCannedResponses);
  
  $('.canned-response-container').hide();
  $('.d-editor-button-bar').removeClass("active");
}

// collect all the other functions together and run them
function runTheCannedResponseFunctions() {
  generateHtmlListOfCannedResponses();
  addCannedResponseButton();

  $('#canned-response-button').click(function() {
    $('.canned-response-container').toggle();
    $('.d-editor-button-bar').toggleClass("active");

    $('#canned-responses-list li .fa-trash').click(function(event) {
      deleteCannedResponse(event);
      
      return false;
    });
    
    $('#canned-responses-list li').not('#new-canned-response').not('#canned-responses-list li .fa-trash').click(function() {
      prefillWithCannedResponse(cannedResponses[$(this).attr("data-canned-response-id")]["body"]);
      $('.d-editor-button-bar').removeClass("active");
    });

    $('#new-canned-response').click(function() {
      newCannedResponse();
    });
  });
}

// detect when the text box is popped up, then run 
var target = document.querySelector('#reply-control'),
    config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if ($('.d-editor-preview').length > 0) {
      $('.d-editor-preview').addClass("cooked");
    }
    
    if ($('#canned-response-button').length < 1) {      
      runTheCannedResponseFunctions();
    }
  });
});

observer.observe(target, config);






/***************************************************

Add the exercise URL button

***************************************************/


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
        } catch(e){}
      }
    }, 50);
  }
}

function btnInjection(){
  if(!forumPostRegex.test(pageURL)) return;

  var category = document.querySelector(".title-wrapper .badge-wrapper.bullet:first-child .badge-category").innerText,
      hrefElmAll = document.querySelectorAll("a.badge-wrapper.bullet"),
      hrefElm = hrefElmAll[hrefElmAll.length - 1],
      href = "",
      URL = "https://www.codecademy.com/courses/";

  if (lessonType1.indexOf(category) > -1) {
      href = hrefElm.getAttribute("href").split("/")[3];
      URL += href;
  }
  else if (lessonType2.indexOf(category) > -1) {
      href = hrefElm.getAttribute("href").split("/");
      URL += href[2] + "#unit_"+href[3];
  }
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