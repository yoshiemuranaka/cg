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
			History.Adapter.bind(window, 'statechange', this.historyHandler);
		},

		historyHandler: function() {
			console.log('historyHandler');
		},

		pushState: function($this) {
			var c = Grace.Pagination.config.URLs;
			var pageIndex = $this.data().page;

			var data = '{state:' + pageIndex + '}';
			var title = c[pageIndex];
			var url = '/?/' + c[pageIndex]; 

			History.pushState(data, title, url);
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

	Grace.Pagination.init();
});
