(function($){
	window.APP = {
		$: window.jQuery,
		$window: $(window),
		$doc: $(document),
		$html: $(document.documentElement),
		$body: $(document.body),
		$page: $('#page-wrap'),
	};

	APP.scrollTop = APP.$window.scrollTop();
	APP.scrollLeft = APP.$window.scrollLeft();
	APP.scrolledPixels = 0;
	APP.windowHeight = APP.$window.height();


	// Setup Window Events Callbacks
	APP.setWindowEvents = function() {
		this.$html.on('touchmove', function(e) { APP.onWindowScroll() });
		this.$window.scroll(function() { APP.onWindowScroll() });
		this.$window.bind('resize', function(e) {
			window.resizeEvt;
			this.$window.resize(function() {
				clearTimeout(window.resizeEvt);
				window.resizeEvt = setTimeout(function(){ onWindowResize(); }, 100);
			});
		});
	}


	// Listner for Scroll Event
	APP.onWindowScroll = function() {
		APP.updateScrollPositions();

		APP.scrolledPixels = APP.$window.scrollTop();

		// Back To Top Button
		if( APP.$backToTop == undefined ) {
			APP.$backToTop = $('<a href="#top" id="back-to-top"></a>');
			APP.$body.append(APP.$backToTop);
		}

		if( APP.scrolledPixels > APP.windowHeight/2 ) {
			$('#back-to-top').addClass('visible');
		} else {
			$('#back-to-top').removeClass('visible');
		}
	}


	// Listner for Resize Event
	APP.onWindowResize = function() {
		APP.windowHeight = APP.$window.height();
		APP.updateScrollPositions();
	}


	// Utility: Set Scroll Positions
	APP.updateScrollPositions = function() {
		APP.scrollTop = (APP.$window.scrollTop() * -1)+'px';
		APP.scrollLeft = (APP.$window.scrollLeft() * -1)+'px';
	}


	// Utility: Scroll to Element Animated
	APP.scrollToElement = function( selector, time, offset ) {
		time = time || 100;
		offset = offset || 0;
		$('html, body').animate({
			scrollTop: $(selector).offset().top - offset
		}, time);
	}



	// Init APP
	APP.setWindowEvents();

})(jQuery);



jQuery(document).ready(function($){

	// Back To Top Event
	APP.$html.on('click', '#back-to-top', function(ev){
		ev.preventDefault();
		$(this).blur();
		APP.scrollToElement('body', 250);
	});

});

