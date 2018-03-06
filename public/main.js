// Position of card
var card = document.querySelector(".CardContainer__Card");
var CTOP = card.offsetTop;
var CLEFT = card.offsetLeft;

// Position we want
var WTOP = 0.7;
var WLEFT = 0.6;

// Debounce fn
var throttle = function (type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function () {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function () {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};
throttle("resize", "debouncedResize");

// Reposition bg based on window size
var container = document.querySelector(".Root");
var resizeBg = function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  container.style.top = parseInt(height * WTOP - CTOP) + "px";
  container.style.left = ((width * WLEFT) - CLEFT) + "px";
}
resizeBg();
window.addEventListener("debouncedResize", resizeBg);

// Open links in new windows
document.querySelectorAll("a").forEach(function (a) { a.setAttribute("target", "_blank"); });
