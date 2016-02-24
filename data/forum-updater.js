function forumUpdater() {
    "use strict";

    if (document.readyState !== "complete") {
        setTimeout(forumUpdater, 500);
        return false;
    }
  
    // show little popup notification thingy if they haven't used this version yet
    

    // for use below, they need to be defined globally
    var cannedResponses,
        CRListElm, CRContainer, ebb,
		crbID = "#canned-response-button",
        KEY = "canned_responses",
		courseLinkSel = ".external-course-link",
		userLinkSel = ".external-user-link";

    // get the canned responses
    function initializeCRArray() {
        if (localStorage.getItem(KEY) === null) {
            cannedResponses = [];
            localStorage.setItem(KEY, JSON.stringify(cannedResponses));
        } else cannedResponses = JSON.parse(localStorage.getItem(KEY));
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
        ebb.classList.remove("active");
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

            if (tgN === "LI") {
                index = [].indexOf.call(CRListElm.children, node) - 1;
                if (index !== -1)
                    prefillWithCannedResponse(cannedResponses[index].body);
            } else if (tgN === "SPAN")
                deleteCannedResponse(node);
        });

        qS(crbID).addEventListener("click", function() {
            CRContainer.toggle();
            ebb.classList.toggle("active");
        });
    };


    /* New Exercise Button*/

    var lessonType1 = "Python, Ruby, JavaScript, HTML & CSS, PHP, jQuery, Make an Interactive Website, Make a Website, Goals, APIs",
        lessonType2 = "Learn the Command Line, Learn Java, Ruby on Rails: Authentication, Learn AngularJS, Learn SQL, Learn Git, Learn Rails, Make an Interactive Website: Projects, Make a Website: Projects",
        forumPostRegex = /discuss.codecademy.com\/t/,
        pageURL = window.location.href

    function btnInjection() {
        if (!forumPostRegex.test(pageURL)) return;

        function prepare(container) {
            var a, i, container, span;

            span = document.createElement("span"); // just to add some spacing from tag list
            a = document.createElement("a");
            i = document.createElement("i");

            a.href = URL;
            a.target = "_blank";
            a.classList.add("external-course-link");

            i.classList.add("external-course-link");
            i.classList.add("fa", "fa-external-link");
            i.title = "Open exercise in new tab";

            span.textContent = " ";

            a.appendChild(i);
            container.appendChild(span);
            container.appendChild(a);
        }

        var categoryElm = qS(".title-wrapper .badge-wrapper.bullet:first-child .badge-category");

        if (!categoryElm) return;

        // prepare URL to link to
        var category = categoryElm.textContent,
            hrefElmAll = qSAll("a.badge-wrapper.bullet"),
            hrefElm = hrefElmAll[hrefElmAll.length - 1],
            href = hrefElm.getAttribute("href").split("/"),
            URL = "https://www.codecademy.com/courses/";

        if (lessonType1.indexOf(category) > -1)
            URL += href[3];
        else if (lessonType2.indexOf(category) > -1)
            URL += href[2] + "/lessons/" + href[3] + "/resume"; // Will cause an error if you havent completed that exercise

        // meta or lounge categories with no linked forums
        else URL = "";

        var container;

        if (URL) {
            try {
                container = qSAll(".title-wrapper > .ember-view")[0];

                if (!container.querySelector(".external-course-link"))
                    prepare(container);
                else {
                    container = qS('.docked .d-header .title-wrapper > .ember-view');;

                    if (container && !qS('.external-course-link'))
                        prepare(container);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    function userButtonInjection(node) {
        // insert user button; not every discuss page is user page. So, try-block is needed
        try {
            var url = "https://www.codecademy.com/" + node.textContent.split(" ")[0],
                a = document.createElement('a'),
                i = document.createElement('i');

            a.setAttribute("target", "_blank");
            a.setAttribute("href", url);
            a.classList.add("external-user-link");
            a.setAttribute("aria-hidden", "true");
            a.setAttribute("title", "Open this user profile on the main site");
            i.classList.add("fa", "fa-external-link");

            a.appendChild(i);
            node.appendChild(a);
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
                    crb = qS(crbID),
					c1 = qS('.title-wrapper > .ember-view'),
					c2 = qS('.docked .d-header .title-wrapper > .ember-view');
				
					
                if (c1 && !c1.querySelector(courseLinkSel) || c2 && !c2.querySelector(courseLinkSel))
                    btnInjection();

                // pass the node we found if it exists
                var userLinkNode = qS(".user-main .about .details .primary h1");
				
                if (userLinkNode && !qS(userLinkSel))
                    userButtonInjection(userLinkNode);

                if (!crb && dep) {
                    dep.classList.add("cooked");

                    runTheCannedResponseFunctions();
                }
            });
        });

    bodyListener.observe(qS('body'), config);
}

try {
    forumUpdater();
} catch (e) {
    console.log(e);
}