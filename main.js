var t, metaBoxVisited = false;

$(document).ready(function() {
  /**
   * Meta info box
   */
  // Slide the meta box in at the outset
  $('div#metabox')
    .css('left', '-220px')
    .delay(500)
    .animate({
      left: '0px'
    }, 'slow');

  // Have the meta box 'shine' every few seconds until rollover
  t = setTimeout(function() { metaBoxShine(); }, 5000);

  // Animate rollover for meta info box
  $('div#metabox').css({
    height: '30px',
    width: ($('div#metabox').width() + 1) + 'px'
  }).hover(function() {
    metaBoxVisited = true;
    // Only move main if it is underneath meta box
    if ($(window).width() < ($('div#metabox').outerWidth() * 2) + 790) {
      $('div#main').stop().animate({
        marginTop: '145px'
      });
    }
    $(this).stop().animate({
      height: '75px'
    });
  }, function() {
    $('div#main').stop().animate({
      marginTop: '100px'
    });
    $(this).stop().animate({
      height: '30px'
    });
  })

  // Activate on-click too for mobile users
  .click(function() {
    if ($(this).css('height') == '30px') {
      metaBoxVisited = true;
      // Only move main if it is underneath meta box
      if ($(window).width() < ($('div#metabox').outerWidth() * 2) + 790) {
        $('div#main').stop().animate({
          marginTop: '145px'
        });
      }
      $(this).stop().animate({
        height: '75px'
      });
    } else {
      $('div#main').stop().animate({
        marginTop: '100px'
      });
      $(this).stop().animate({
        height: '30px'
      });
    }
  });

  /**
   * Home page interactions
   */
  // Icon tooltip
  $('div.icon-container img').hover(function() {
    $('div#icon-tooltip')
      .stop()
      .text($(this).attr('id').replace('-', ' '))
      .css({
        top: $(this).position().top + $(this).height() + 10 + 'px',
        left: $(this).position().left + ($(this).width() / 2) - ($('div#icon-tooltip').width() / 2) - 10 + 'px'
      })
      .fadeIn();
  }, function() {
    $('div#icon-tooltip').stop().fadeOut();
  });

  // If pushstate is supported, do animations
  // instead of just loading new pages entirely
  if (history.pushState) {
    var which, title;

    // When any image is clicked on the home page,
    // slide them all to the right and then remove them
    $('div.icon-container a').click(function(e) {
      e.preventDefault();

      // Store which link was clicked
      which = $(this).attr('href');
      title = $(this).attr('title');

      // Disable scrolling until everything is visible,
      // then scroll to the top
      $('body').css('overflow', 'hidden');
      $('html, body').animate({
        scrollTop: 0
      });

      // Sliiiiide to the right
      $('div#icon-wrapper').animate({
        marginLeft: '+=' + $(window).width()
      }, {
        duration: 1000,
        complete: function() {
          // Delete the whole container
          $(this).remove();

          // Now slide in the navigation tray for content pages
          // Load it via ajax from a doc first
          $('body').append('<div id="nav-wrapper"></div>');
          $('div#nav-wrapper')
            .css({
              display: 'none',
              position: 'fixed',
              bottom: '-0px',
              right: '-100px'
            })
            // .load(which + ' div#nav-menu', function() {
            .load('hobbies.html div#nav-menu', function() {
              // Nav menu is loaded, remove the wrapper
              // and slide it in
              $('div#nav-menu')
                .css({
                  position: 'fixed',
                  bottom: '0px',
                  right: '-100px'
                })
                .unwrap();
              $('div.nav-item').not('.current').css('bottom', '-80px');
              $('div#nav-menu').animate({
                bottom: '0px',
                right: '0px'
              }, {
                complete: function() {
                  // Load content.js now that we are on a content page
                  $.getScript('content.js');
                }
              });
            });

          // At the same time as navi, slide in the content
          // from the bottom
          $('body').append('<div id="main-wrapper"></div>');
          $('div#main-wrapper')
            // Set a large margin so that content is initally hidden
            .css({
              marginTop: $(window).height() + 50 + 'px'
            })
            .load('hobbies.html div#main', function() {
              // Animate decreasing of margins to slide content up
              $(this).animate({
                marginTop: '0px'
              }, {
                // Vary duration of animation based on window height
                duration: $(window).height(),
                complete: function() {
                  // Allow scrolling once animation completes
                  $('body').css('overflow', 'auto');
                  document.title = title + ' | Ajay Gandhi';

                  // Create a state object to pass to pushstate
                  // (just needed for the method), important
                  // part is the last param
                  var state = { page: which };
                  history.pushState(state, title, which);
                }
              });
            });
        }
      });
    });
  }
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
    t = setTimeout(function() { metaBoxShine(); }, 5000);
  }
}