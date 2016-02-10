$(function(){
	Grace.Animations.slide.init();//initiate slide if feature content is active
	$('#fullpage').fullpage();
});

var Grace = Grace || {};

Grace.Animations = {

	easePage: function($page) {
		Grace.el.allPages.removeClass('ease');
		setTimeout(function(){ //this is so I can see the animation
			$page.addClass('ease');			
		}, 10); 
	},

	fadeIn: function($el, speed) {
		$el.animate({
			opacity: 1
		}, speed)
	}, 

	fadeOut: function($el, speed) {
		$el.animate({
			opacity: 0
		}, speed)
	},

	drawer: {
		init: function(e) {
		
			e.preventDefault(); //this is to stop the window scroll
			e.stopPropagation(); //this is to stop bubbling up
			
			if(Modernizr.csstransitions && Modernizr.csstransforms) {
				if(Grace.el.drawerMenu.hasClass('open')) {
					Grace.Animations.drawer.close();
				} else {
					Grace.Animations.drawer.open();
				};
			} else { //using JavaScript to animate drawer
				if(Grace.el.drawerMenu.hasClass('open')) {
					Grace.Animations.drawer.close();
					Grace.el.drawerMenu.animate({'top': '-150px'}, 350)
				} else {
					Grace.Animations.drawer.open();
					Grace.el.drawerMenu.animate({'top': '50px'}, 350)
				};
			};	

			Grace.Animations.drawer.events();
		},

		open: function() {
			Grace.el.drawerMenu.addClass('open');
			Grace.el.overlay.animate({'opacity': '0.75'}, 450);
			$('body').addClass('drawer-open'); //this it to prevent scrolling while drawer is open
		},

		close: function() {
			Grace.el.drawerMenu.removeClass('open');
			Grace.el.overlay.css({'opacity': '0'});
			$('body').removeClass('drawer-open');
		},

		events: function() {
			Grace.el.overlay.one('click', Grace.Animations.drawer.close)
			Grace.el.mainNav.one('click', Grace.Animations.drawer.close)
			Grace.el.links.one('click', Grace.Animations.drawer.close)
		}
	},

	slide: {

		active: true,
		screenSize: true,
		
		init: function() {
			this.isSlideActive();
			$('.js-page-target').on('click', Grace.Animations.slide.checkIfActive);
			$(window).on('resize', Grace.debounce(Grace.Animations.slide.checkWindowSize, 500));
		},

		isSlideActive: function() {
			//work on this
			if(this.active && this.screenSize){
					Grace.Animations.slide.events();
				}else {
					$('.js-animate__text, .js-animate__image').css({'opacity': '1', 'top': '0'})
				}

		},

		checkIfActive: function() {
			if($('.feature-content').hasClass('active')){
				this.active = true;
			}else {
				this.active = false;
			}
		},

		checkWindowSize: function() {
			if(window.innerWidth >= 700) {
				this.screenSize = true;
			} else {
				this.screenSize = false;
			}
		},

		events: function() {
			//checking for scroll and click events
			$('.arrow-icon').on('click', Grace.Animations.slide.checkDirection);
		},

		checkDirection: function(e) {
			//after touchpad scroll event, check which direction swiping
			//slide.next or slide.previous

			if($('.js-animate.slide.active').data().slide < 2) {
				Grace.Animations.slide.next();
			}

		},

		next: function() {	
			var slideIndex = $('.js-animate.slide.active').data().slide;
			
			if(slideIndex < 2 ) {
				var nextSlideIndex = slideIndex + 1; 
			} 

			var currentSlide = $('.js-animate.slide[data-slide=' + slideIndex + ']');
			var nextSlide = $('.js-animate.slide[data-slide=' + nextSlideIndex + ']');

			Grace.Animations.slide.animateOut(currentSlide, 'up', nextSlide, this.animateIn);

		},

		previous: function() {
			//slide down
		},


		animateOut: function($currentSlide, direction, $nextSlide, callback) {
			var config = { image: {'opacity': '0'}, text: {'opacity': '0'}};

			if(direction === 'up') {
				config.text.top = '-20px'
			}else {
				config.text.top = '30px'
			}

			$currentSlide.find('.js-animate__text').animate(config.text, 200)
			
			var timer;
			clearTimeout(timer);

			timer = setTimeout(function(){
				$currentSlide.find('.js-animate__image').animate(config.text, 550, function(){
					$currentSlide.removeClass('active');
					callback($nextSlide, direction);
				})
			}, 150)

		},

		animateIn: function($nextSlide, direction) {
			console.log('animate in')
			$nextSlide.find('.js-animate__text, .js-animate__image').css({'opacity': '0'})
			$nextSlide.addClass('active');

			var config = { image: {'opacity': '1'}, text: {'opacity': '1', 'top': '0'}};

			if(direction === 'up') {
				$nextSlide.find('.js-animate__text').css({'top': '30px'});
			}else {
				$nextSlide.find('.js-animate__text').css({'top': '-20px'});
			}
			
			$nextSlide.find('.js-animate__text').animate(config.text, 200);
			
			var timer;
			clearTimeout(timer);

			timer = setTimeout(function(){
				$nextSlide.find('.js-animate__image').animate(config.image, 650)
			}, 150)


		}

	}

};


// Debounce Method
// ---------------
Grace.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if ( !immediate ) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
		if ( callNow ) { 
			func.apply(context, args);
		}
	};
};

