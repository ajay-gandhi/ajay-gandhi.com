var BG_HEIGHT = 1540;
var BG_WIDTH = 2310;
var card = document.querySelector(".CardContainer__Card");

// Using the linear equation in reposition(), a window width of wx should map
// to an offset of wy, resulting in y-intercept wb
var wx = 400;
var wy = -1300;
var wm = -wy / (BG_WIDTH - wx);
var wb = wm * BG_WIDTH;

// Same for height
var hx1 = 200;
var hx2 = BG_HEIGHT - 150;
var hy = -730;
var hm = -hy / (hx2 - hx1);
var hb = hm * hx2;

// Same for scale
var sx = 0.2;
var sy = 0.70;
var sm = (1 - sy) / (1 - sx);
var sb = 1 - sm;


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
  var scale = hScale > wScale ? hScale : wScale;
  if (hScale > 1 || wScale > 1) {
    container.style.transform = "scale(" + scale + ")";
  } else {
    var top = wHeight * hm - hb;
    var left = wWidth * wm - wb;
    scale = scale * sm + sb;
    container.style.transform = "translate(" + left * scale + "px, " + top * scale + "px) scale(" + scale + ")";
  }
}
reposition();
window.addEventListener("debouncedResize", reposition);

// Open links in new windows
document.querySelectorAll("a").forEach(function (a) { a.setAttribute("target", "_blank"); });
