$(document).ready(function() {
  // Animate rollover for meta info box
  $('div#metabox').hover(function() {
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
        duration: $(window).width(),
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

          // At the same time, slide down the back button
          $('body').append('<a id="back-link" href="/">' +
            '<div id="back" class="noselect"a>&lt;</div></a>');
          $('div#back')
            .css({
              position: 'absolute',
              top: '-50px',
              left: '260px'
            })
            .animate({
              top: '25px'
            })
          // When the back button is clicked, re-load the home page icons
          // and remove the navi and content
          $('a#back-link').click(function(e) {
            e.preventDefault();
            // Slide out and subsequently remove each elem
            $('div#back').animate({
              top: '-50px'
            }, {
              complete: function() {
                $('a#back-link').remove();
              }
            });

            $('div#nav-menu').animate({
              right: '-100px'
            }, {
              complete: function() {
                $(this).remove();
              }
            });

            $('div#main-wrapper').animate({
              marginTop: $(window).height() + 50 + 'px'
            }, {
              duration: $(window).height(),
              complete: function() {
                $(this).remove();

                // Load home page icons and slide them in
                // Loading the icons into a wrapper to keep
                // the meta box
                $('body').append('<div id="homepage-wrapper"></div>');
                $('div#homepage-wrapper').load('index.html div#icon-wrapper', function() {
                  $('div#icon-wrapper')
                    .unwrap()
                    .css('margin-left', $(window).width() + 'px')
                    .animate({
                      marginLeft: '0px'
                    }, {
                      duration: $(window).width(),
                      complete: function() {
                        // Reinclude this script itself to rebind elements
                        $.getScript('homepage.js');

                        // Do pushstate things
                        var state = { page: 'index.html' };
                        history.pushState(state, 'Home', 'index.html');
                      }
                    });
                });
              }
            });
          });

          // At the same time, slide in the content
          // from the bottom
          $('body').append('<div id="main-wrapper"></div>');
          $('div#main-wrapper')
            // Set margin equal to window height
            // so that content is initally hidden
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