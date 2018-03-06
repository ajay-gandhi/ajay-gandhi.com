var BG_HEIGHT = 1540;
var BG_WIDTH = 2310;
var card = document.querySelector(".CardContainer__Card");

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
var reposition = function () {
  var wWidth = window.innerWidth;
  var wHeight = window.innerHeight;

  var hScale = wHeight / BG_HEIGHT;
  var wScale = wWidth / BG_WIDTH;
  if (hScale > 1 || wScale > 1) {
    container.style.transform = "scale(" + (hScale > wScale ? hScale : wScale) + ")";
  } else {
    var cTop = card.offsetTop + 150;
    var cLeft = card.offsetLeft + 300;
    var hOffset = wHeight < cTop ? wHeight - cTop - (wHeight / 30) : 0;
    var wOffset = wWidth < cLeft ? wWidth - cLeft - (wWidth / 5) : 0;
    container.style.transform = "translate(" + wOffset + "px, " + hOffset + "px)";
  }
}
reposition();
window.addEventListener("debouncedResize", reposition);

// Open links in new windows
document.querySelectorAll("a").forEach(function (a) { a.setAttribute("target", "_blank"); });
