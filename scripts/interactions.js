var Grace = Grace || {};

Grace.Data = {
	page : 1
};

Grace.Pagination = (function() {

	var config = {
		allPages: $('.js-animate.page'),
	};

	var init = function() {
		console.log(config.allPages)
	};

	return {
		init: init
	};

} ());

$(document).ready(function(){
	Grace.Pagination.init();
});
