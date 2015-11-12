/************

Example Canned Response: 

-------------------------------------------------------------

Hi Name, 

Your code isn't currently visible, please edit your post, format it, and reply back so we know you've updated it :\)
You can format code by wrapping it with three backticks (`` ` ``, it's the key above `Tab` on your keyboard) and a new line before and after, like so: 

    
    ```
    code goes here
    ```
    

Thanks! 
You can see more on code formatting [here][1]. 

[1]: http://discuss.codecademy.com/t/using-backticks-to-format-your-code/3697/3

-------------------------------------------------------------

************/



var cannedResponses;

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

// create a new canned response
function newCannedResponse() {
  var textarea = document.querySelector("textarea"),
      start = textarea.selectionStart,
      end = textarea.selectionEnd,
      cannedResponseText = textarea.value.substring(start, end),
      cannedResponseName = prompt("Please name your canned response:", cannedResponseText.slice(0, 10) + "...");
  
  cannedResponses[Object.keys(cannedResponses).length] = { "name": cannedResponseName, "body": cannedResponseText }
  localStorage.setItem("Canned Responses", JSON.stringify(cannedResponses));
  
  getCannedResponses();
  
  var HtmlListOfCannedResponses = '<li id="new-canned-response">Create new</li>';
  
  for (i in cannedResponses) {
    HtmlListOfCannedResponses += '<li data-canned-response-id="' + i + '">' + cannedResponses[i]["name"] + '</li>';
  }
  
  $('#canned-responses-list').html(HtmlListOfCannedResponses);
};

function prefillWithCannedResponse(text) {
  $('textarea')[0].value = text;
  $('#canned-response-container').toggle();
};

$('button.create').click(function() {
  window.setTimeout(function() {
    getCannedResponses();
    
    var HtmlListOfCannedResponses = '<li id="new-canned-response">Create new</li>';
    
    for (i in cannedResponses) {
      HtmlListOfCannedResponses += '<li data-canned-response-id="' + i + '">' + cannedResponses[i]["name"] + '</li>';
    }
    
    $('.wmd-button-bar .wmd-button-row').append('<div class=\"wmd-spacer\" id=\"wmd-spacer3\"></div><button class=\"wmd-button wmd-canned-response-button\" id=\"wmd-canned-response-button\" title=\"Canned responses\" aria-label=\"Canned responses\"></button>');
    $('.wmd-button-bar').append('<div class="canned-response-container" id="canned-response-container"><ul id="canned-responses-list">' + HtmlListOfCannedResponses + '</ul></div>');
    $('.canned-response-container').hide();
    
    $('#wmd-canned-response-button').click(function() {
      getCannedResponses();

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