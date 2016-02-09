try{
	(function forumUpdater(window) {
		"use strict";
		
		if (document.readyState !== "complete") {
			setTimeout(forumUpdater, 500, window);
			return false;
		}

		// for use below, they need to be defined globally
		var cannedResponses,
			CRListElm, CRContainer, ebb,
			KEY = "canned_responses";

		// get the canned responses
		function initializeCRArray() {			
			if (localStorage.getItem(KEY) === null) {
				cannedResponses = [];
				localStorage.setItem(KEY, JSON.stringify(cannedResponses));
			}
			else cannedResponses = JSON.parse(localStorage.getItem(KEY));		
		}

		function insertCRContainer() {
			CRContainer = document.createElement("DIV");
			CRContainer.setAttribute("id", "canned-response-container");
			CRContainer.classList.add("canned-response-container");
			ebb.appendChild(CRContainer);
		}

		function getNewCRBtn() {
			var li = document.createElement("LI"),
				span = document.createElement("SPAN");

			li.setAttribute("id", "new-canned-response");
			span.textContent = "Create new canned response";

			li.appendChild(span);

			return li;
		}
		
		function insertCRListElm() {
			initializeCRArray();

			CRListElm = document.createElement("ul");
			var btn = getNewCRBtn();

			CRListElm.setAttribute("id", "canned-responses-list");
			CRListElm.appendChild(btn);

			CRContainer.appendChild(CRListElm);
		  
			for (var i = 0, len = cannedResponses.length, currentCR; i < len; i++) {
			  currentCR = cannedResponses[i];
			  insertNewCRInList(currentCR.name, currentCR.body);
			}
		}

		// generate the list of canned responses
		function insertNewCRInList(name, body) {
			var li = document.createElement("LI"),
				spanName = document.createElement("SPAN"),
				spanDel = document.createElement("SPAN");

			spanName.textContent = name;
			spanName.classList.add("name");
			spanDel.classList.add("fa", "fa-trash");

			li.appendChild(spanName);
			li.appendChild(spanDel);
			CRListElm.appendChild(li);
		}

		// add the canned response button to the formatting bar
		function addCannedResponseButton() {
		  var spacer = document.createElement('div'),
			  button = document.createElement('button'),
			  i = document.createElement('i');
		  
		  spacer.classList.add("d-editor-spacer");
		  button.classList.add("ember-view", "btn", "no-text", "canned-response");
		  button.setAttribute("id", "canned-response-button");
		  button.setAttribute("title", "Canned responses");
		  button.setAttribute("aria-label", "Canned responses");
		  i.classList.add("fa", "fa-pencil-square-o");
		  
		  ebb.appendChild(spacer);
		  button.appendChild(i);
		  ebb.appendChild(button);
		}

		// create a new canned response
		function newCannedResponse() {
			var textarea = qS("textarea"),
				start = textarea.selectionStart,
				end = textarea.selectionEnd,
				cannedResponseText = textarea.value.substring(start, end),
				cannedResponseName = prompt("Please name your canned response:", cannedResponseText.slice(0, 10) + "...");

			if (!cannedResponseName)
				return false;   
			
			cannedResponses.push({
				"name": cannedResponseName,
				"body": cannedResponseText
			});
			
			localStorage.setItem(KEY, JSON.stringify(cannedResponses));

			insertNewCRInList(cannedResponseName, cannedResponseText);
		}

		function prefillWithCannedResponse(text) {
			qS('.d-editor-input').value += text;
			CRContainer.hide();
			ebb.removeClass("active");
		}

		// delete a canned response
		function deleteCannedResponse(node) {
			var li = node.parentNode,
				index = [].indexOf.call(CRListElm.children, li) - 1;

			cannedResponses.splice(index, 1);

			localStorage.setItem(KEY, JSON.stringify(cannedResponses));

			CRListElm.removeChild(li);			
		}

		// collect all the other functions together and run them
		function runTheCannedResponseFunctions() {
			ebb = qS('.d-editor-button-bar');
			
			addCannedResponseButton();
			insertCRContainer();
			insertCRListElm();
			CRContainer.hide();

			qS('#new-canned-response').addEventListener("click", newCannedResponse);

			// one stop shop for canned response and delete button
			CRListElm.addEventListener("click", function(ev) {
				var node = ev.target,
					tgN = node.tagName,
					index;

				if (tgN === "LI"){
					index = [].indexOf.call(CRListElm.children, node) - 1;
					if(index !== -1)
						 prefillWithCannedResponse(cannedResponses[index].body);
				}
				else if (tgN === "SPAN")
					deleteCannedResponse(node);
			});

			qS('#canned-response-button').addEventListener("click", function() {
				CRContainer.toggle();
				ebb.toggleClass("active");
			});
		};
      
      
		/* New Exercise Button*/
      
		var lessonType1 = "Python, Ruby, JavaScript, HTML & CSS, PHP, jQuery, Make an Interactive Website, Make a Website, Goals, APIs",
			lessonType2 = "Learn the Command Line, Learn Java, Ruby on Rails: Authentication, Learn AngularJS, Learn SQL, Learn Git, Learn Rails, Make an Interactive Website: Projects, Make a Website: Projects",
			forumPostRegex = /discuss.codecademy.com\/t/,
			pageURL = window.location.href
      
		function btnInjection() {
			if (!forumPostRegex.test(pageURL)) return;
			console.log(document.querySelector(".title-wrapper .badge-wrapper.bullet:first-child .badge-category"));
			var category = qS(".title-wrapper .badge-wrapper.bullet:first-child .badge-category").textContent,
				hrefElmAll = qSAll("a.badge-wrapper.bullet"),
				hrefElm = hrefElmAll[hrefElmAll.length - 1],
				href = hrefElm.getAttribute("href").split("/"),
				URL = "https://www.codecademy.com/courses/";

			if (lessonType1.indexOf(category) > -1)
				URL += href[3];
			else if (lessonType2.indexOf(category) > -1)
				URL += href[2] + "/lessons/"+href[3]+"/resume"; // Will cause an error if you havent completed that exercise

			// meta or lounge categories with no linked forums
			else URL = "";

			var a, i, container, span;

			if (URL) {
				try {
					container = qSAll(".title-wrapper > .ember-view")[0];

                    if (!container.querySelector(".new_tab_exercise_link")) {
                      span = document.createElement("span"); // just to add some spacing from tag list
                      a = document.createElement("a");
                      i = document.createElement("i");

                      a.href = URL;
                      a.target = "_blank";
                      a.classList.add("new_tab_exercise_link");

                      i.classList.add("external-link-button");
                      i.classList.add("fa", "fa-external-link");
                      i.title = "Open exercise in new tab";

                      span.textContent = " ";

                      a.appendChild(i);
                      container.appendChild(span);
                      container.appendChild(a);
                    }
                  
                    if (qS('.docked .d-header .title-wrapper > .ember-view') && !qS('.new_tab_exercise_link_2')) {
                      container2 = qS('.docked .d-header .title-wrapper > .ember-view');
                      
                      span2 = document.createElement("span");
                      a2 = document.createElement("a");
                      i2 = document.createElement("i");
                      
                      a2.href = URL;
                      a2.target = "_blank";
                      a2.classList.add("new_tab_exercise_link");
                      
                      i2.classList.add("external-link-button");
                      i2.classList.add("fa", "fa-external-link");
                      i2.title = "Open exercise in new tab";
                      
                      span2.textContent = " ";
                      
                      a2.appendChild(i2)
                      container2.appendChild(span2);
                      container2.appendChild(a2);
                    }
				} catch (e) {
					console.log(e);
				}
			}
		}

		function userButtonInjection(){
			// insert user button; not every discuss page is user page. So, try-block is needed
			try {
				var elm = qS(".user-main .about .details .primary h1"),
					url = "https://www.codecademy.com/" + elm.textContent.split(" ")[0],
					a = document.createElement('a'),
					i = document.createElement('i');
			  
				a.setAttribute("target", "_blank");
				a.setAttribute("href", url);
				a.classList.add("external-user-link");
				a.setAttribute("aria-hidden", "true");
				a.setAttribute("title", "Open this user profile on the main site");
				i.classList.add("fa", "fa-external-link");
				
				a.appendChild(i);
				elm.appendChild(a);
			} catch (e) {
				console.log("Error", e);
			}
		}
      
      btnInjection();
      
      var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          },
          bodyListener = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              var dep = qS('.d-editor-preview'),
                  crb = qS('#canned-response-button');
              
              if (!qS('.title-wrapper > .ember-view .external-link-button') || !qS('.docked .d-header .title-wrapper > .ember-view .external-link-button')) {
                btnInjection();
              }

              if (qS(".user-main .about .details .primary h1") && !qS('.external-user-link')) {
                userButtonInjection();
              }

              if (!crb) {
                dep.addClass('cooked');

                runTheCannedResponseFunctions();
              }
            });
		  });

      bodyListener.observe(qS('body'), config);
	})(window);
} catch(e){
	console.log(e);
}