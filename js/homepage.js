
/**
 * Home page interactions
 */

$(document).ready(function() {

  // // Fade in images after 1.5s
  // setTimeout(function () {
  //   $('img').fadeIn();
  // }, 1500);
  // Fade in on load
  $('img').load(function () {
    $(this).fadeIn('fast');
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
      // Actually follow link if external
      if ($(this).hasClass('exclude')) return;

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
        duration: $(window).width() / 1.5,
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
            .load(which + ' div#nav-menu', function() {
              // Nav menu is loaded, remove the wrapper
              // and slide it in
              $('div#nav-menu')
                .css({
                  position: 'fixed',
                  bottom: '0px',
                  right: '-100px'
                })
                .unwrap();
              $('div.nav-item').each(function () {
                if (!$(this).hasClass('current'))
                  $(this).css('bottom', '-80px');
              });
              $('div#nav-menu').animate({
                bottom: '0px',
                right: '0px'
              }, {
                complete: function() {
                  // Load js files now that we are on a content page
                  $.getScript('js/content.js');

                  // Only get lightbox if needed
                  if (which === 'projects.html') $.getScript('js/lightbox.js');
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
              left: '260px',
              width: '30px',
              height: '30px',
              padding: '10px',
              borderRadius: $('div#back').outerWidth() / 2
            })
            .animate({
              top: '25px'
            })

          // At the same time, slide in the content
          // from the bottom
          $('body').append('<div id="main-wrapper"></div>');
          $('div#main-wrapper')
            // Set margin equal to window height
            // so that content is initally hidden
            .css({
              marginTop: $(window).height() + 50 + 'px'
            })
            .load(which + ' div#main', function() {
              // Animate decreasing of margins to slide content up
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