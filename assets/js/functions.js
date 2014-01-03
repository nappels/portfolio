// remap jQuery to $
(function($){

	/* trigger when page is ready */
	$(document).ready(function (){

		// Mobile Nav IIFE
		(function() {
			
			var isModalOpen = false;

			var openModal = function() {
				$('.wrapper').animate({
						'left': '-300px'
					},600);
					// Set toggle to true
					isModalOpen = true;
					// Bind a click handler to the wrapper to close the click handler
					$('.wrapper').on('click', function(){ closeModal(); })
			};
			var closeModal = function() {
				console.log('closeModal');
				$('.wrapper').animate({
						'left': '0'
					},600);
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
	});

})(window.jQuery);