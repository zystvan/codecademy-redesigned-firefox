// add the `.cooked` class to the post preview so it gets rendered properly
$('.d-editor-preview').addClass("cooked");



/*******************
Canned Responses
*******************/

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
    if ($('#canned-response-button').length < 1) {
      $('.d-editor-preview').addClass("cooked");
      
      runTheCannedResponseFunctions();
    }
  });
});

observer.observe(target, config);