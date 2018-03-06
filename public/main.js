// Positions
var card = document.querySelector(".CardContainer__Card");
var CARD_TOP = card.offsetTop;
var CARD_LEFT = card.offsetLeft;
var WANT_TOP = 0.65;
var WANT_LEFT = 0.5;

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

// Resize bg based on window size
var container = document.querySelector(".Root");
console.log(CARD_TOP, CARD_LEFT);
var reposition = function () {
  container.style.top = parseInt(WANT_TOP * window.innerHeight - CARD_TOP) / 2 + "px";
  container.style.left = parseInt(WANT_LEFT * window.innerWidth - CARD_LEFT) / 2 + "px";
}
reposition();
window.addEventListener("debouncedResize", reposition);

// Open links in new windows
document.querySelectorAll("a").forEach(function (a) { a.setAttribute("target", "_blank"); });
