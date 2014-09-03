var t, metaBoxVisited = false;
var navLeftDistance;
$(document).ready(function() {
	/* Meta info box */
	//Have the meta box "shine" every few seconds until rollover
	t = setTimeout(function() { metaBoxShine(); }, 5000);

	/* Home page */
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

	/* Content pages */
	//Animate rollover for meta info box
	$("div#meta-content").css({
		height: "65px",
		width: ($("div#meta-content").width() + 1) + "px"
	}).hover(function() {
		metaBoxVisited = true;
		$(this).stop().animate({
			height: "108px"
		});
	}, function() {
		$(this).stop().animate({
			height: "65px"
		});
	}).click(function() {
		if ($(this).css("height") == "65px") {
			$(this).stop().animate({
				height: "108px"
			});
		} else {
			$(this).stop().animate({
				height: "65px"
			});
		}
	});

	//Move navigation if small screen (mimic CSS float)
	navLeftDistance = $("div#navigation").width() + $("div#navigation").position().left;
	if ($(window).width() < navLeftDistance) {
		$("div#meta-content").css({
			position: "initial",
			marginTop: "20px"
		});
		$("div#navigation").css({
			position: "initial",
			marginTop: "20px"
		});
	}
	//Also do ^ on window resize
	$(window).resize(function() {
		if ($(window).width() < navLeftDistance) {
			$("div#meta-content").css({
				position: "initial",
				marginTop: "20px"
			});
			$("div#navigation").css({
				position: "initial",
				marginTop: "20px"
			});
		} else {
			$("div#meta-content").css({
				position: "absolute",
				marginTop: "0px"
			});
			$("div#navigation").css({
				position: "absolute",
				marginTop: "0px"
			});
		}
	});
});

//Function to "shine" the meta info box
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