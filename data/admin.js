var adminUpdater = function() {
  if (window.location.pathname == "/admin" && !qS('.ccredesigned-table')) {
    fetch('https://docs.google.com/document/d/1KA9WnGympSal7VD6cP7PBVkovOiqAkgGywvWVCggIpQ/export?format=txt').then(function(response) {
      return response.text();
    }).then(function(text) {
      var searches = text.split(";;;;;;;;;;"),
          insert = "";

      for (var i = 0; i < searches.length; i++) {
        searches[i] = searches[i].split("\n");
      };

      for (var x = 1; x < searches.length; x++) {
        var div = document.createElement('div'),
          table = document.createElement('table'),
          thead = document.createElement('thead'),
          tr = document.createElement('tr'),
          th = document.createElement('th');

        div.classList.add("dashboard-stats", "ccredesigned-table");
        div.setAttribute("id", "ccredesigned_table-" + x);
        table.classList.add("table", "table-condensed", "table-hover");
        th.textContent = searches[x][1];
        th.classList.add("title");

        tr.appendChild(th);
        thead.appendChild(tr)
        table.appendChild(thead);
        div.appendChild(table);

        qS('.dashboard-right').insertBefore(div, qS('.dashboard-right').firstChild);

        for (var n = 3; n < searches[x].length; n = n + 2) {
          var CCRedesignedTable = qS('#ccredesigned_table-' + x + ' table'),
              tbody = document.createElement('tbody'),
              tr = document.createElement('tr'),
              td = document.createElement('td'),
              div2 = document.createElement('div'),
              div3 = document.createElement('div'),
              a = document.createElement('a');

          td.classList.add("title");
          div2.classList.add("referred-topic-title");
          div3.classList.add("overflow-ellipsis");
          a.setAttribute("href", searches[x][n])
          a.textContent = searches[x][n - 1];

          div3.appendChild(a);
          div2.appendChild(div3);
          td.appendChild(div2);
          tr.appendChild(td);
          tbody.appendChild(tr);
          CCRedesignedTable.appendChild(tbody);
        };
      };
    });
  }
};

var config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    },
    adminBodyListener = new MutationObserver(function(mutation/*s*/) {
//      mutations.forEach(function(mutation) {
        if (window.location.pathname == "/admin" && !qS('.ccredesigned-table')) {
          try {
            adminUpdater();
          } catch(e) {
            console.error(e);
          }
        }
//      });
    });

adminBodyListener.observe(qS('body'), config);

if (window.location.pathname == "/admin" && !qS('.ccredesigned-table')) {
  try {
    adminUpdater();
  } catch(e) {
    console.error(e);
  }
}