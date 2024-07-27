document.addEventListener("DOMContentLoaded", function() {
  function updateLinks() {
    document.querySelectorAll("nav a").forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        var page = event.target.getAttribute("href").replace("/", "");
        var newUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/') + page;
        window.location.href = newUrl;
      });
    });
  }

  updateLinks();
});
