$(function(){

	var Grace = Grace || {};

	Grace.Pagination = {

		DOM: {
			allPages: $('.js-animate.page'),
			links: $('.js-page-link')
		},

		config: {
			URLs : ['home', 'about', 'products']
		},

		initHistory: function() {
			History.Adapter.bind(window, 'statechange', this.historyHandler);
		},

		historyHandler: function() {
			console.log('historyHandler')
		},

		pushState: function() {
			var c = Grace.Pagination.config.URLs;
			var pageIndex = $(this).data().page;

			var url = '/#' + c[pageIndex] 

			History.replaceState('', '', url);
		},

		events: function() {
			this.DOM.links.on('click', this.pushState);
		},

		init: function() {
			console.log('init');
			this.initHistory();
			this.events();
		}

	}

	Grace.Pagination.init();
});
