var shine = 6000;
var t, metaBoxVisited = false;

$(document).ready(function() {
  /**
   * Meta info box
   */
  // Slide the meta box in at the outset
  $('div#metabox')
    .css('left', '-' + ($('div#metabox').outerWidth() + 20) + 'px')
    .delay(500)
    .animate({
      left: '0px'
    }, 750);

  // Have the meta box 'shine' every few seconds until rollover
  t = setTimeout(function() { metaBoxShine(); }, shine);

  $('div#metabox').css('height', '30px');
});

/**
 * Shines the meta information box every few seconds
 */
function metaBoxShine() {
  if (metaBoxVisited == false) {
    $('div#metabox').animate({
      width: '+=10'
    }, { complete: function() {
      $(this).animate({
        width: '-=10'
      });
    }});
    t = setTimeout(function() { metaBoxShine(); }, shine);
  }
}