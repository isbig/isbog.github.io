document.addEventListener("DOMContentLoaded", function() {
  function loadContent(page) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', page + '.html', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = xhr.responseText;
        document.getElementById("content").innerHTML = tempDiv.querySelector('main').innerHTML;
        document.title = tempDiv.querySelector('title').innerText;
        updateLinks();
      } else if (xhr.readyState === 4) {
        document.getElementById("content").innerHTML = "<h1>Page not found</h1>";
      }
    };
    xhr.send();
  }

  function handleNavigation() {
    var path = window.location.pathname.split("/").pop();
    if (path === "" || path === "isbig.github.io") {
      path = "home"; // default to home page
    }
    loadContent(path);
  }

  function updateLinks() {
    document.querySelectorAll("nav a").forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        var page = event.target.getAttribute("href").replace("/", "");
        history.pushState({}, "", "/isbig.github.io/" + page);
        loadContent(page);
      });
    });
  }

  window.onpopstate = handleNavigation;

  updateLinks();
  handleNavigation();
});