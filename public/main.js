var BG_HEIGHT = 1540;
var BG_WIDTH = 2310;
var card = document.querySelector(".CardContainer__Card");

// Using the linear equation in reposition(), a window width of wx should map
// to an offset of wy, resulting in y-intercept wb
var wx = 400;
var wy = -1400;
var wm = -wy / (BG_WIDTH - wx);
var wb = wm * BG_WIDTH;

// Same for height
var hx = 200;
var hy = -780;
var hx2 = BG_HEIGHT - 150;
var hm = -hy / (hx2 - hx);
var hb = hm * hx2;

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
    var top = wHeight * hm - hb;
    var left = wWidth * wm - wb;
    // console.log(left);
    container.style.transform = "translate(" + left + "px, " + top + "px)";
    // var scale = hScale > wScale ? hScale : wScale;
    // container.style.transform = "";
    // var cTop = card.offsetTop + 150;
    // var cLeft = card.offsetLeft + 150;
    // var hOffset = wHeight < cTop ? wHeight - cTop - (wHeight / 30) : 0;
    // var wOffset = wWidth < cLeft ? wWidth - cLeft - (wWidth / 15) : 0;

    // var scale = hScale > wScale ? hScale : wScale;
    // container.style.transform = "translate(" + wOffset + "px, " + hOffset + "px) scale(" + Math.cbrt(scale) + ")";
  }
}
reposition();
window.addEventListener("debouncedResize", reposition);

// Open links in new windows
document.querySelectorAll("a").forEach(function (a) { a.setAttribute("target", "_blank"); });
