$(function(){

	var Grace = Grace || {};

	Grace.Pagination = {

		DOM: {
			allPages: $('.js-animate.page'),
			links: $('.js-page-target')
		},

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
			var title = c[pageIndex];
			var url = '/?/' + c[pageIndex]; 

			History.pushState(data, title, url);
		},

		revealPage: function(state) {
			var stateIndex = state.data.page;

			if(stateIndex === undefined) {
				stateIndex = 0;
			}

			var revealPage = $('[data-page=' + stateIndex + ']');
			revealPage.addClass('active');
		},

		hidePage: function() {
			this.DOM.allPages.removeClass('active');
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

	};
//if Modernizr.history
	Grace.Pagination.init();
});
