function forumUpdater() {
  // show the correct exercise location
  if (typeof CCDATA.forum != "undefined" && window.location.pathname.split("/")[window.location.pathname.split("/").length - 2] == "forum_questions") {
    id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
    
    $.ajax({
      url: "http://www.codecademy.com/forum_questions/" + id,
      dataType: "json",
      type: "GET",
      beforeSend: function(e) {
        e.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        e.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.0")
      },
      success: function(e) {
        h = $("div#section #breadcrumb .breadcrumb b a").clone();
        $("div#section #breadcrumb .breadcrumb b a").remove();
        t = $("div#section #breadcrumb .breadcrumb b").text().split(" ");
        t[1] = (parseInt(e.section_index) + 1).toString(10);
        $("div#section #breadcrumb .breadcrumb b").html(t.slice(0, 4).join(" ") + " (" + (typeof e.humanized_exercise_index !== "undefined" ? "Exercise " + e.humanized_exercise_index.toString(10) : "General Forum") + ")").prepend(h);
      }
    })
  }
  
  // restyle and add some basic functionality back into the search form
  $('#forum_search input[type="text"]').attr("autocomplete", "off");
  $('#forum_search input[type="submit"]').attr("value", "Search");
  
  if (window.location.search) {
    if (window.location.search.substr(0, 3) == "?q=") {
      searchVal = window.location.search.substr(3);
      var input = $('#forum_search input[type="text"]'),
          posts = document.querySelectorAll('.forum_question'),
          postTitle = document.querySelectorAll('.title');
      
      input.val(searchVal);
      
      for (var i = 0; i < posts.length; i++) {
        if (postTitle[i].textContent.toLowerCase().indexOf(searchVal) > -1) {
          posts[i].style['display'] = 'inline-block';
        }
        else {
          posts[i].style['display'] = 'none';
        }
      }
    }
  }
  
  $('#forum_search input[type="text"]').keydown(function(event) {
    var input = $('#forum_search input[type="text"]'),
        searchVal = input.val().toLowerCase(),
        posts = document.querySelectorAll('.forum_question'),
        postTitle = document.querySelectorAll('.title');
    
    for (var i = 0; i < posts.length; i++) {
      if (!searchVal || postTitle[i].textContent.toLowerCase().indexOf(searchVal) > -1) {
        posts[i].style['display'] = 'inline-block';
      }
      else {
        posts[i].style['display'] = 'none';
      }
    }
  });
  
  // link to specific comments/responses
  $("body").append("<style>.timestamp:hover, div.answer_comments_block div.comment-details span:hover { cursor: pointer; color: #F65A5B;}</style>");

  $(document).on('click', '.timestamp', function() {
	var url = 'http://www.codecademy.com' + window.location.pathname + '#'; 
    link = $(this).closest('li.forum_response').attr('id');
    if (link == undefined) {
      link = "";
    }
    prompt('Copy to clipboard: Ctrl+C, Enter', url + link);
  }); 

  $(document).on('click', 'div.answer_comments_block div.comment-details span', function() {
    var url = 'http://www.codecademy.com' + window.location.pathname + '#'; 
    link = $(this).closest('li.forum_response_comment').attr('id'); 
    prompt('Copy to clipboard: Ctrl + C, Enter', url + link); 
  });
}

var script = document.createElement("script");
script.textContent = "$(document).ready(" + forumUpdater.toString() + ")";
document.documentElement.appendChild(script);