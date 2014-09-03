var limit, inside, outside; //Page layout sizes
var viewing = false, iconsReady = false; //Phases of viewership
var posTop; //Position of icons post-click

$(document).ready(function() {
	/* Page Layout */
	if ($(window).height() > $(window).width()) {
		limit = $(window).width(); 
	} else {
		limit = $(window).height();
	}
	if (limit <= 1000) {
		limit = 1000;
		inside = (limit / 10);
		outside = (limit / 8);
	}
	$("div.icon-container").css({
		width: (inside * 2) + "px",
		height: outside + "px",
		lineHeight: outside + "px"
	});
	/*$(window).resize(function() {
		if ($(window).height() > $(window).width()) {
			limit = $(window).width(); 
		} else {
			limit = $(window).height();
		}
		if (limit <= 1000) {
			limit = 1000;
		}
		$("img.icon").css({
			width: (limit / 10) + "px",
			height: (limit / 10) + "px",
		});
		$("div.icon-container").css({
			width: (limit / 5) + "px",
			height: (limit / 5) + "px",
			lineHeight: (limit / 5) + "px"
		});
		$("div#icon-wrapper").css({
			marginTop: ($(window).height() / 2) - (limit / 10) + "px",
			marginBottom: ($(window).height() / 2) - (limit / 10) + "px"
		});
	});*/
	$("div#icon-wrapper").css({
		marginTop: ($(window).height() / 2) - (outside / 2) + "px",
		marginBottom: ($(window).height() / 2) - (outside / 2) + "px"
	});

	/* Icons fade in */
	var imgIcons = ["resume", "work-experience", "skills", "hobbies", "github"];
	$("img#resume").load(function() {
		$("img.icon").attr({
			width: "1px",
			height: "1px"
		});
		setTimeout(function() { showImage(0) }, 300);
	});
	function showImage(i) {
		$("#" + imgIcons[i]).animate({
			opacity: 1,
			width: (inside + 20) + "px",
			height: (inside + 20) + "px"
		}, 300, "swing", function() {
			$("#" + imgIcons[i]).animate({
				width: inside + "px",
				height: inside + "px"
			}, { complete: function() {
				iconsReady = true;
			}});
		})
		if (i + 1 < imgIcons.length) {
			setTimeout(function() {
				showImage(i + 1);
			}, 100);
		}
	}

	/* Icon tooltip */
	$("img.icon").hover(function() {
		if (!viewing && iconsReady) {
			$("div#icon-tooltip").stop().html($(this).attr("id").replace('-', ' '));
			$("div#icon-tooltip").css({
				top: $(this).position().top + inside + 10 + "px",
				left: $(this).position().left + (inside / 2) - ($("div#icon-tooltip").outerWidth() / 2) + "px"
			});
			$("div#icon-tooltip").fadeIn();
		}
	}, function() {
		if (!viewing && iconsReady) {
			$("div#icon-tooltip").stop().fadeOut();
		}
	});

	/* Content display */
	$("img.icon").click(function() {
		var clickedImg = $(this);
		var container = clickedImg.closest("div.icon-container");
		if (viewing) {
			if (container.hasClass("current") == false) {
				/* Switch icons */
				var positionProps = [container.position().top, container.position().left, posTop];
				$("div.icon-container.current").removeClass("current").animate({
					top: positionProps[0]
				}, { queue: false, complete: function() {
					$(this).css("position", "static");
					$(this).next().remove();
				}});
				var invis = container.clone();
				invis.css("visibility", "hidden").insertAfter(container);
				container.addClass("current").css({
					position: "absolute",
					top: positionProps[0],
					left: positionProps[1]
				}).animate({
					top: positionProps[2]
				}, { queue: false });
	
				/* Moving tooltip */
				$("div#icon-tooltip").html(clickedImg.attr("id").replace('-', ' '));
				$("div#icon-tooltip").animate({
					left: positionProps[1] + inside - ($("div#icon-tooltip").outerWidth() / 2) + "px"
				});
			}
		} else {
			viewing = true;

			/* Keeping clicked icon stationary */
			posTop = container.position().top;
			var positionProps = [posTop, container.position().left];
			var invis = container.clone();
			invis.css("visibility", "hidden").insertAfter(container);
			container.addClass("current").css({
				position: "absolute",
				top: positionProps[0],
				left: positionProps[1]
			});

			/* Move all icons, tooltip */
			$("div#icon-wrapper").animate({
				marginTop: "0px",
				marginBottom: "0px"
			});
			$("div#icon-tooltip").stop().animate({ top: "-=" + (($(window).height() / 2) + ($("div#icon-tooltip").outerHeight() / 2)) });
		}

		//history.pushState({ id: $(this).attr("id") }, '', $(this).attr("id") + ".html");
	});
});