angular.module('articleApp', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider',
	function($routeProvider) {
  		$routeProvider
		    .when('/list', {
		      controller:'ListCtrl',
		      templateUrl:'views/list.html'
		    })
		    .when('/detail/:articleId', {
		      controller:'DetailCtrl',
		      templateUrl:'views/detail.html'
		    })
		    .otherwise({
		      redirectTo:'/list'
		    });
}])

.controller('ListCtrl', function($scope, $http) {
	$scope.articles = [];
	$http.get('api/posts.json')
		.success(function(data) {
			angular.forEach(data.posts,
				function(article, index) {
					$scope.articles.push(article);
			});
		})
		.error(function(error) {
			alert("I'm sorry, Dave, I'm afraid I can't do that.");
		});
})

.controller('DetailCtrl', function($scope, $routeParams, $http) {
	$scope.id = $routeParams.articleId;
	$http.get('api/posts/' + $scope.id + '.json')
		.success(function(data) {
			$scope.details = data.post;
		})
		.error(function(error) {
			alert("I'm sorry, Dave, I'm afraid I can't do that.");
		});
});