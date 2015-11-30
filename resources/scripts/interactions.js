var Grace = Grace || {};

Grace.Data = {
	page : 1
};

Grace.Pagination = (function() {

	var config = {
		allPages: $('.js-animate.page'),
	};

	var init = function() {
		config.allPages.addClass('hidden')
	};

	return {
		init: init
	};

} ());

$(document).ready(function(){
	Grace.Pagination.init();
});
