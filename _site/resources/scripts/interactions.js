$(function(){

	var Grace = Grace || {};

	Grace.Pagination = {

		DOM: {
			allPages: $('.js-animate.page'),
			links: $('.js-page-link')
		},

		config: {
			URLs : ['Home', 'About', 'Products']
		},

		initHistory: function() {
			History.Adapter.bind(window, 'hashchange', this.historyHandler);
		},

		historyHandler: function() {
			console.log('historyHandler')

			console.log(History.getState());

		},

		pushState: function() {
			var c = Grace.Pagination.config.URLs;
			var pageIndex = $(this).data().page;
			
			var data = '{state:' + pageIndex + '}';
			var title = c[pageIndex];
			var url = '/#/' + c[pageIndex]; 

			History.replaceState(data, title, url);
		},

		events: function() {
			this.DOM.links.on('click', this.pushState);
		},

		init: function() {
			this.initHistory();
			this.events();
		}

	}

	Grace.Pagination.init();
});
