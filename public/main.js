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
var background = document.querySelector(".Root__BackgroundImage");
var resizeBg = function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  if (width > height) {
    background.style.width = (width / 2500 * 3000) + "px";
    background.style.height = "auto";
  } else {
    background.style.height = (height / 2500 * 3000) + "px";
    background.style.width = "auto";
  }
}
resizeBg();
window.addEventListener("debouncedResize", resizeBg);

// Open links in new windows
document.querySelectorAll("a").forEach(function (a) { a.setAttribute("target", "_blank"); });
