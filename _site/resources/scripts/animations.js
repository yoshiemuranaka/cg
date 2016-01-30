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
			
			if(Modernizr.csstransitions && Modernizr.csstransforms) {
				if(Grace.el.drawerMenu.hasClass('open')) {
					Grace.Animations.drawer.close();
				} else {
					Grace.Animations.drawer.open();
				};
			} else {

				//javascript animate top: 200px
			};	

			Grace.Animations.drawer.events();
		},

		open: function() {
			Grace.el.drawerMenu.addClass('open');
			$('.overlay').animate({'opacity': '0.75'}, 450);
		},

		close: function() {
			Grace.el.drawerMenu.removeClass('open');
			$('.overlay').css({'opacity': '0'});
		},

		events: function() {
			$('.overlay').one('click', Grace.Animations.drawer.close)
			$('.main-nav__home').one('click', Grace.Animations.drawer.close)
			Grace.el.links.one('click', Grace.Animations.drawer.close)
		}
	}

};

