var t, metaBoxVisited = false;
$(document).ready(function() {
	/* Meta info box */
	//Animate rollover for meta info box
	$("div#meta").css({
		height: "30px",
		width: ($("div#meta").width() + 1) + "px"
	}).stop().hover(function() {
		metaBoxVisited = true;
		$(this).animate({
			height: "75px"
		});
	}, function() {
		$(this).animate({
			height: "30px"
		});
	});

	//Have the box "shine" every few seconds until rollover
	t = setTimeout(function() { metaBoxShine(); }, 5000);
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