var Grace = Grace || {};

Grace.Animations = {

	easePage: function($page) {
		Grace.el.allPages.removeClass('ease');
		setTimeout(function(){
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
		init: function() {
			if(Modernizr.csstransitions && Modernizr.csstransforms) {
				if(Grace.el.drawerMenu.hasClass('open')){
					Grace.el.drawerMenu.removeClass('open')
				}else {
					Grace.el.drawerMenu.addClass('open')
				}
			}else {
				//javascript animate top: 200px
			}
		},

		events: function() {
			Grace.el.links.click(Grace.Animations.drawer.init());
		}
	}

};

