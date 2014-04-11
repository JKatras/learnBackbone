//$(document).ready(function() {
	$.ajaxPrefilter( function( options, originalOptions, jqXHR) {
		options.url = 'api/' + options.url;
	});

	var Articles = Backbone.Collection.extend({
		url: 'posts.json'
	});
	
	var ArticleList = Backbone.View.extend({
		el: '.view',
		render: function () {
			var that = this;
			var articles = new Articles();
			articles.fetch({
				success: function(articles) {
					var template = _.template($('#article-list-template').html(), {articles: articles.models});
					that.$el.html(template);
				}
			})
		}
	});
	
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home'
		}
	});
	
	var articleList = new ArticleList();
	
	var router = new Router();
	
	router.on('route:home', function () {
		articleList.render();
	});
	
	Backbone.history.start();
//});