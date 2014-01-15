// remap jQuery to $
(function($){

	/* trigger when page is ready */
	$(document).ready(function (){

		// Mobile Nav IIFE
		(function() {

			var isModalOpen = false;

			var openModal = function() {
				$('.wrapper').animate({
						'left': '-235px'
					},400);
					// Set toggle to true
					isModalOpen = true;
					// Bind a click handler to the wrapper to close the click handler
					$('.wrapper').on('click', function(){ closeModal(); })
			};
			var closeModal = function() {
				$('.wrapper').animate({
						'left': '0'
					},400);
					// Set toggle key to false
					isModalOpen = false;
					// Unbind the click on the wrapper to save memory
					$('.wrapper').off('click');
			};
			var mobileNavToggle = function(e) {
				// Don't let the click binding bubble up to the wrapper
				e.stopPropagation();
				if (!isModalOpen) {
					openModal();
				}
				else {
					closeModal();
				}
			};

			$('.hamburger').stop().click(mobileNavToggle);
		})();

		// Gravatar IIFE
		(function() {
			var md5Email = 'aec6e5136a0c26f669ba569e72a153a8';
			var size = 150;

			$('.gravatar').attr('src','http://www.gravatar.com/avatar/' + md5Email + '.jpg?s=' + size)
		})();

		// Nav Scroll IIFE
		(function() {
			var lastScrollTop = 0;
			var scrollIntent;
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				if (scrollTop > lastScrollTop && $(this).width() > 851) {
					// Scroll Down
					scrollIntent = scrollTop - 50;
					if (scrollTop > 100) {
						$('.header').slideUp(300);
					}
				} 
				else if (scrollTop < scrollIntent) {
					// Scroll Up
					$('.header').slideDown(300);
				}
				lastScrollTop = scrollTop;
			});
		})();
	});

})(window.jQuery);