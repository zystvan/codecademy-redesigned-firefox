// tell users about the new version
  if (!localStorage.getItem("Codecademy Redesigned 7.0.0")) {
    $('body').append('<div id="new-version-popup-container" class="new-version" style="display: none"><div class="popup-background"></div><div id="close-new-version-popup" class="popup-close">&times;</div><div class="popup"><h1>Welcome to Codecademy Redesigned 7.0.0</h1><a href="http://zystvan.com/codecademy-redesigned/7-0-0.html">See the new features here</a></div></div>');
    $('#new-version-popup-container').fadeIn();
    $('#close-new-version-popup').click(function() {
      $('#new-version-popup-container').fadeOut().remove();
    });

    localStorage.setItem("Codecademy Redesigned 7.0.0", "Seen");
  }

// for use below, they need to be defined globally
var cannedResponses,
    HtmlListOfCannedResponses;

// get the canned responses
function getCannedResponses() {
  if (!localStorage.getItem("Canned Responses")) {
    cannedResponses = {}
    localStorage.setItem("Canned Responses", JSON.stringify(cannedResponses));
  }

  cannedResponses = localStorage.getItem("Canned Responses");
  cannedResponses = JSON.parse(cannedResponses);

  return cannedResponses;
};

// generate the list of canned responses
function generateHtmlListOfCannedResponses() {
  getCannedResponses();

  HtmlListOfCannedResponses = '<li id="new-canned-response"><a href="javascript:void(0);">Create new</a></li>';

  for (i in cannedResponses) {
    HtmlListOfCannedResponses += '<li data-canned-response-id="' + i + '"><a href="javascript:void(0);">' + cannedResponses[i]["name"] + '</a></li>';
  }

  return HtmlListOfCannedResponses;
};

// add the canned response button to the formatting bar
function addCannedResponseButton() {
  $('.wmd-button-bar .wmd-button-row').append('<div class=\"wmd-spacer\" id=\"wmd-spacer3\"></div><button class=\"wmd-button wmd-canned-response-button\" id=\"wmd-canned-response-button\" title=\"Canned responses\" aria-label=\"Canned responses\"></button>');
  $('.wmd-button-bar').append('<div class="canned-response-container" id="canned-response-container"><ul id="canned-responses-list">' + HtmlListOfCannedResponses + '</ul></div>');
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
    return "You need to name your canned response!";
  }

  cannedResponses[Object.keys(cannedResponses).length] = { "name": cannedResponseName, "body": cannedResponseText }
  localStorage.setItem("Canned Responses", JSON.stringify(cannedResponses));

  generateHtmlListOfCannedResponses();

  $('#canned-responses-list').html(HtmlListOfCannedResponses);
};

function prefillWithCannedResponse(text) {
  $('textarea')[0].value = text;
  $('#canned-response-container').toggle();
};

$('button.create').click(function() {
  window.setTimeout(function() {
    generateHtmlListOfCannedResponses();
    addCannedResponseButton();

    $('#wmd-canned-response-button').click(function() {
      $('.canned-response-container').toggle();

      $('#canned-responses-list li').not('#new-canned-response').click(function() {
        prefillWithCannedResponse(cannedResponses[$(this).attr("data-canned-response-id")]["body"]);
      });

      $('#new-canned-response').click(function() {
        newCannedResponse();
      });
    });
  }, 400);
});