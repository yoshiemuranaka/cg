$(function(){

	var Grace = Grace || {};

	Grace.Pagination = {

		DOM: {
			allPages: $('.js-animate.page'),
			links: $('.js-page-target')
		},

		config: {
			URLs : ['Home', 'About', 'Products'],
			activePage: 1
		},

		initHistory: function() {
			History.Adapter.bind(window, 'statechange', this.historyHandler);
		},

		historyHandler: function() {
			var state = History.getState();

			Grace.Pagination.hidePage();

			var revealPage = $('[data-page=' + state.data.page + ']')
			revealPage.addClass('active')
		},

		pushState: function($this) {
			var c = Grace.Pagination.config.URLs;
			var pageIndex = $this.data().pageTarget;
			var data = {};
					data.page = pageIndex;
			var title = c[pageIndex];
			var url = '/?/' + c[pageIndex]; 

			History.pushState(data, title, url);
		},

		hidePage: function() {
			// this.DOM.allPages.find('.active').removeClass('active');
		},

		events: function() {
			this.DOM.links.click(function(event){
				event.preventDefault();
				Grace.Pagination.pushState($(this));
			});

		},

		init: function() {
			this.initHistory();
			this.events();
		}

	}
//if Modernizr.history
	Grace.Pagination.init();
});
