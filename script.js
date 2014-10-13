var t, metaBoxVisited = false;
var navLeftDistance;
var isViewingNav = false, link;

$(document).ready(function() {
  /**
   * Meta info box
   */
  // Have the meta box 'shine' every few seconds until rollover
  t = setTimeout(function() { metaBoxShine(); }, 5000);

  // Animate rollover for meta info box
  $('div#metabox').css({
    height: '30px',
    width: ($('div#metabox').width() + 1) + 'px'
  }).hover(function() {
    metaBoxVisited = true;
    $(this).stop().animate({
      height: '75px'
    });
  }, function() {
    $(this).stop().animate({
      height: '30px'
    });
  })

  // Activate on-click too for mobile users
  .click(function() {
    if ($(this).css('height') == '30px') {
      $(this).stop().animate({
        height: '75px'
      });
    } else {
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

  /**
   * Content page interactions
   */
  // Hide all nav items except the one related to the current page
  $('div.nav-item').not('.current').css({
    bottom: '-80px',
    right: '1px'
  });

  // When the current nav icon is clicked, it should either
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
  $('div#nav-menu').hover(function() {
    if (isViewingNav == false) {
      $('div#nav-menu').stop().animate({
        paddingTop: '+=25'
      });
    }
  }, function() {
    if (isViewingNav == false) {
      $('div#nav-menu').stop().animate({
        paddingTop: '-=25'
      });
    }
  });

  // Click actions to expand nav menu
  $('div#nav-menu').click(function() {
    if (isViewingNav == false) {
      isViewingNav = true;

      // Expand the menu itself
      $('div#nav-menu')
        .animate({
          height: '425px',
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

  // Contract nav menu on button click
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
