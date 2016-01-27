var Grace = Grace || {};

Grace.Animations = {

	easePage: function($page) {
		//animate page content on page load or when initialized
		if(Modernizr.csstransitions && Modernizr.csstransforms) {
			Grace.el.allPages.removeClass('ease');
			$page.addClass('ease')
		} else {
			//animate with JavaScript
		}
	}

};

