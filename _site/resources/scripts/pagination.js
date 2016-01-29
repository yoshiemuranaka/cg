var Grace = Grace || {};

Grace.Pagination = {

	config: {
		URLs : ['Home', 'About', 'Products']
	},

	initHistory: function() {
		History.Adapter.bind(window, 'statechange', this.historyHandler);
		this.historyHandler();
	},

	historyHandler: function() {
		var state = History.getState();

		Grace.Pagination.hidePage();
		Grace.Pagination.revealPage(state);
	},

	pushState: function($this) {
		var c = Grace.Pagination.config.URLs;
		var pageIndex = $this.data().pageTarget;
		var data = {};
				data.page = pageIndex;
		var title = c[pageIndex] + " | Cosmos Grace";
		var url = '/?/' + c[pageIndex]; 

		History.pushState(data, title, url);
	},

	revealPage: function(state) {
		$('html, body').animate({'scrollTop': 0}, 150)

		var stateIndex = state.data.page;

		if(stateIndex === undefined || "" ) {
			stateIndex = 0;
		}

		var page = $('[data-page=' + stateIndex + ']');
		page.addClass('active', Grace.Animations.easePage(page));
		Grace.Animations.fadeIn(Grace.el.footer, 1200);
		
	},

	hidePage: function() {
		Grace.el.allPages.removeClass('active');
		Grace.el.footer.css({'opacity': 0});
	},

	events: function() {
		Grace.el.links.click(function(event){
			event.preventDefault();
			Grace.Pagination.pushState($(this));
		});
		Grace.el.burgerMenu.click(Grace.Animations.drawer.init)
	},

	init: function() {
		this.initHistory();
		this.events();
	}

};

$(function(){
	
	Grace.el = {
			allPages: $('.js-animate.page'),
			links: $('.js-page-target'),
			footer: $('.footer'),
			activePage: $('.js-animate.active'),
			burgerMenu: $('.menu--burger'),
			drawerMenu: $('.js-animate.drawer')
	};

	if (Modernizr.history) {
		Grace.Pagination.init();
	} else {
		//Grace.Animations.easePage();
	};

});
