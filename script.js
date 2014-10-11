var t, metaBoxVisited = false;
var navLeftDistance;

$(document).ready(function() {
  /**
   * Meta info box
   */
  //Have the meta box "shine" every few seconds until rollover
  t = setTimeout(function() { metaBoxShine(); }, 5000);

  //Animate rollover for meta info box
  $("div#meta-index").css({
    height: "30px",
    width: ($("div#meta-index").width() + 1) + "px"
  }).hover(function() {
    metaBoxVisited = true;
    $(this).stop().animate({
      height: "75px"
    });
  }, function() {
    $(this).stop().animate({
      height: "30px"
    });
  }).click(function() {
    // Activate on-click too for mobile users
    if ($(this).css("height") == "30px") {
      $(this).stop().animate({
        height: "75px"
      });
    } else {
      $(this).stop().animate({
        height: "30px"
      });
    }
  });

  /**
   * Home page interactions
   */
  //Icon tooltip
  $("div.icon-container img").hover(function() {
    $("div#icon-tooltip").stop().html($(this).attr("id").replace('-', ' '));
    $("div#icon-tooltip").css({
      top: $(this).position().top + $(this).height() + 10 + "px",
      left: $(this).position().left + ($(this).width() / 2) - ($("div#icon-tooltip").width() / 2) - 10 + "px"
    });
    $("div#icon-tooltip").fadeIn();
  }, function() {
    $("div#icon-tooltip").stop().fadeOut();
  });
});

/**
 * Shines the meta information box every few seconds
 */
function metaBoxShine() {
  if (metaBoxVisited == false) {
    $("div.metabox").animate({
      width: "+=10"
    }, { complete: function() {
      $(this).animate({
        width: "-=10"
      });
    }});
    t = setTimeout(function() { metaBoxShine(); }, 5000);
  }
}
