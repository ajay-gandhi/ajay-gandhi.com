var t, metaBoxVisited = false;
$(document).ready(function() {
	/* Meta info box */
	//Animate rollover for meta info box
	$("div#meta").css({
		height: "30px",
		width: ($("div#meta").width() + 1) + "px"
	}).hover(function() {
		metaBoxVisited = true;
		$(this).stop().animate({
			height: "75px"
		});
	}, function() {
		$(this).stop().animate({
			height: "30px"
		});
	});

	//Have the box "shine" every few seconds until rollover
	t = setTimeout(function() { metaBoxShine(); }, 5000);

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

	/* Home page */
	/* Content pages */
});

//Function to "shine" the meta info box
function metaBoxShine() {
	if (metaBoxVisited == false) {
		$("div#meta").animate({
			width: "+=10"
		}, { complete: function() {
			$(this).animate({
				width: "-=10"
			});
		}});
		t = setTimeout(function() { metaBoxShine(); }, 5000);
	}
}