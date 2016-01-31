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
		init: function() {
			console.log('slide initiated');
		}
	}

};

