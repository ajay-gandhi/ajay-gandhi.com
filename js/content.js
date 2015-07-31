
var link, isViewingNav = false;

/**
 * Content page interactions
 */
$(document).ready(function() {

  // Hide all nav items except the one related to the current page
  $('div.nav-item').not('.current').css({
    bottom: '-80px',
    right: '1px'
  });

  // Click actions to expand/hide content
  $('div.module h2.heading').click(function () {
    var module = $(this).parent();
    if (module.hasClass('display-content')) {
      module.stop().animate({ height: 60 }).removeClass('display-content');
    } else {
      module.stop();
      module.css('height', 'auto');
      var full = module.height();
      module.height(60);
      module.animate({ height: full }).addClass('display-content');
    }
  });

  // When the current nav icon is clicked, it should either:
  //   open the navi menu if it is closed or
  //   visit the clicked page if navi menu is open
  link = $('div.nav-item.current a').attr('href');
  $('div.nav-item.current')
    .css({
      bottom: '0px',
      right: '1px'
    })
    .click(function(e) {
      if (isViewingNav == false) {
        // Display the navi menu
        e.preventDefault();
        $('div#nav-menu').trigger('click');
      }
    });
  $('div.nav-item.current a').removeAttr('href');

  // Rollover for navi menu
  var init_height = $('div#nav-menu').height();
  $('div#nav-menu')
    .hover(function() {
      if (isViewingNav == false) {
        $('div#nav-menu').stop().animate({
          height: (init_height + 30) + 'px'
        });
      }
    }, function() {
      if (isViewingNav == false) {
        $('div#nav-menu').stop().animate({
          height: init_height
        });
      }
    })
    // Click actions to expand nav menu
    .click(function() {
      if (isViewingNav == false) {
        isViewingNav = true;

        // Expand the menu itself
        $('div#nav-menu')
          .stop()
          .animate({
            height: '430px',
            paddingTop: '2px'
          })
          .css('cursor', 'default');

        // Display the other navi items
        $('div.nav-item').each(function(index) {
          $(this).animate({
            bottom: (index * 80) + 'px'
          });
        });

        // Navi menu is open now, so give the navi icon its
        // URL back
        $('div.nav-item.current a').attr('href', link);
        $('div#nav-hide').html('&or;&nbsp;');
      }
    });

  // Hover for nav menu hide button
  $('div#nav-hide').hover(function() {
    $(this).css('background-color', '#EEEEEE');
  }, function() {
    $(this).css('background-color', '#FFFFFF');
  });

  // Close nav menu on button click
  $('div#nav-hide').click(function() {
    if (isViewingNav) {
      // Shorten the actual menu
      $('div#nav-menu')
        .animate({
          height: '81px',
          paddingTop: '2px'
        }, {
          duration: 410,
          complete: function() {
            isViewingNav = false;
            $('div#nav-hide').css('background-color', '#FFFFFF');
          }
        })
        .css('cursor', 'pointer');

      // Hide the other navi items
      $('div.nav-item').not('.current').animate({
        bottom: '-80px',
        right: '1px'
      });

      $('div.nav-item.current').animate({
        bottom: '0px',
        right: '1px'
      });

      // Navi menu is closed now, so remove the navi's URL
      $('div.nav-item.current a').removeAttr('href');
      $('div#nav-hide').html('&and;&nbsp;');
    }
  });

  // If pushstate is supported, do animations
  // instead of loading new pages entirely
  if (history.pushState) {
    var which, title, clicked;
    // When any image is clicked on a content page,
    // hide the navigation tray and swap contents
    $('div.nav-item').not('.exclude').children('a').click(function(e) {
      // Do nothing unless nav menu is up
      if (isViewingNav) {
        e.preventDefault();

        // Store which link was clicked
        clicked = $(this);
        which = $(this).attr('href');
        title = $(this).attr('title');

        // Do nothing but hide nav menu if clicked current
        if (clicked.parent('div.nav-item').hasClass('current')) {
          $('div#nav-hide').trigger('click');
          return;
        }

        // Disable scrolling until everything is visible,
        // then scroll to the top
        $('body').css('overflow', 'hidden');
        $('html, body').animate({
          scrollTop: 0
        });

        // Minimize navi menu and change current nav item
        $('div.nav-item.current').removeClass('current');
        clicked.parent('div.nav-item').addClass('current');
        $('div#nav-hide').trigger('click');

        // Add a new click event for the current nav item
        $('div.nav-item.current').click(function(e) {
          if (isViewingNav == false) {
            // Display the navi menu
            e.preventDefault();
            $('div#nav-menu').trigger('click');
          }
        });

        // At the same time as navi, slide the old content
        // down, and the new content up from the bottom
        $('div#main-wrapper')
          .animate({
            marginTop: $(window).height() + 50 + 'px'
          })
          // Load new content
          .load(which + ' div#main', function() {

            // Click actions to expand/hide content
            // Copy/pasted to rebind
            $('div.module h2.heading').click(function () {
              var module = $(this).parent();
              if (module.hasClass('display-content')) {
                module.stop().animate({ height: 60 }).removeClass('display-content');
              } else {
                module.stop();
                module.css('height', 'auto');
                var full = module.height();
                module.height(60);
                module.animate({ height: full }).addClass('display-content');
              }
            });

            // Animate decreasing of margins to slide
            // content back up
            $(this).animate({
              marginTop: '0px'
            }, {
              // Vary duration of animation based on window height
              duration: $(window).height() / 1.5,
              complete: function() {
                // Allow scrolling once animation completes
                $('body').css('overflow', 'auto');
                document.title = title + ' | Ajay Gandhi';

                // Create a state object to pass to pushstate
                // (just needed for syntax, important
                // part is the last param)
                var state = { page: which };
                history.pushState(state, title, which);
              }
            });
          });
      }
    });

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
        duration: $(window).height() / 1.5,
        complete: function() {
          $(this).remove();

          // Load home page icons and slide them in
          // Loading the icons into a wrapper to keep
          // the meta box
          $('body').append('<div id="homepage-wrapper"></div>');
          $('div#homepage-wrapper').load('index.html div#icon-wrapper', function() {
            // Reinclude this script itself to rebind elements
            $.getScript('js/homepage.js');

            $('div#icon-wrapper')
              .unwrap()
              .css('margin-left', $(window).width() + 'px')
              .animate({
                marginLeft: '0px'
              }, {
                duration: $(window).width() / 1.5,
                complete: function() {

                  // Do pushstate things
                  var state = { page: 'index.html' };
                  history.pushState(state, 'Home', 'index.html');
                }
              });
          });
        }
      });
    });

  }
});