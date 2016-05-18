// remap jQuery to $
(function($){

	$(document).ready(function (){

		// Mobile Nav Module
		var openModal = (function() {
			var isModalOpen = false;

			return {
				open: function() {
					var self = this;
					$('.wrapper').animate({
						'left': '-235px'
					},400);
					$('.header').animate({
						'left': '-235px'
					},400);
					// Set toggle to true
					isModalOpen = true;
					// Bind a click handler to the wrapper to close the click handler
					$('.wrapper').on('click', function(){ self.close(); });
				},
				close: function() {
					$('.wrapper').animate({
						'left': '0'
					},400);
					$('.header').animate({
						'left': '0'
					},400);
					// Set toggle key to false
					isModalOpen = false;
					// Unbind the click on the wrapper to save memory
					$('.wrapper').off('click');
				},
				mobileNavToggle: function(e) {
					// Don't let the click binding bubble up to the wrapper
					e.stopPropagation();
					if (!isModalOpen) {
						this.open();
					}
					else {
						this.close();
					}
				}
			};
		})();

		$('.hamburger').stop().click(function(e) {
			openModal.mobileNavToggle(e);
		});
		$('.closeModal').click(function() {
			openModal.close();
		});

		// Nav Hide
		(function() {
			var lastScrollTop = 0;
			var scrollIntent;
			$(window).scroll(function() {
				var scrollTop = $(this).scrollTop();
				if (scrollTop > lastScrollTop) {
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

		// Nav Scroll
		(function() {
			$('.navItem').click(function() {
				var section = $(this).data('section');
				$('html, body').animate({
					scrollTop: $('#' + section).offset().top
				});
			});
			$('.logo').click(function() {
				$('html, body').animate({
					scrollTop: 0
				});
			});
			$('.mobile .navItem').click(function() {
				openModal.close();
			});
		})();

		//Form submit
		(function() {

			// After form submition, hide the form
			if (window.location.search.indexOf('PHPSESSID') > -1) {
				$('#ss-form').hide();
				$('.thankYou').show();
			}

			var validate = function(data) {
				data = data || {};

				var valid = true;

				$.each(data, function(x,i) {
					if (!$(i).val()) {
						$(i).addClass('error');
						valid = false;
					}
				});
				return valid;

			};
			$('#ss-form').submit(function() {
				var formData = {
					name: $('.name'),
					email: $('.email'),
					comments: $('.comments')
				};
				if (validate(formData)) {
					return true;
				}
				return false;
			}).on('focus','.error', function() {
				$(this).removeClass('error');
			});

		})();

		// Work show more
		(function() {

			$('.workSection .hamburger, .workSection .close').click(function() {
				$(this).parent('.workSection').toggleClass('showing-more');
			});

		})();


	});

})(window.jQuery);
