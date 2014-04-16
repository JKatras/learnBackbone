//$(document).ready(function() {
//	$.ajaxPrefilter( function( options, originalOptions, jqXHR) {
//		options.url = 'api/' + options.url;
//	});
	var Item = Backbone.Model.extend();
	
	var Articles = Backbone.Collection.extend({
		model: Item,
		url: 'api/posts.json',
		
		parse: function(response) {
			return response.results;
		},
		
		sync: function(method, model, options) {
			var that = this;
			var params = _.extend({
				type: 'GET',
				dataType: 'json',
				url: that.url,
				processData:false
			}, options);
			
			return $.ajax(params);
		}
	});
	
	var ArticleList = Backbone.View.extend({
		el: '.view',
		
		initialize: function() {
			_.bindAll(this, 'render');
			this.collection = new Articles();
			this.render();
		},
		render: function () {
			var that = this;
			var articles = new Articles();
			articles.collection.fetch({
				success: function(articles) {
//					var template = _.template($('#article-list-template').html(), {articles: articles.models});
//					that.$el.html(template);
					console.log(that.collection.toJSON());
				}
			});
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