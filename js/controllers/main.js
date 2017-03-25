/**
 * Created by Silence-JK on 2017/3/24.
 */
(function(angular){
	'use strict'

	//独立的模块
	var controllers=angular.module('app.controllers.main',['app.services.main']);

	controllers.controller('MainController',
		['$scope','$routeParams','$route','MainService',
			function ($scope,$routeParams,$route,MainService) {

				//初始化文本内容
				$scope.text='';

				$scope.todos=MainService.get();
				console.log('嘿嘿嘿'+$scope.todos);

				$scope.add= function () {
					if($scope.text==''){
						return false;
					}
					MainService.add($scope.text);
					$scope.text='';
				}

				$scope.remove= function (id) {
					MainService.remove(id);
				}

				//clear already completed
				//思路：创建一个新数组,将没有完成的push进去
				$scope.clear= function () {
					var newTodos=MainService.clear();
					$scope.todos=newTodos;
				}

				//clear completed btn is exist
			/*	$scope.existCompleted= function () {
					MainService.existCompleted;
				}*/

				// 是否有已经完成的
				$scope.existCompleted = MainService.existCompleted;

				//edit content
				$scope.currentEditingId=-1;
				$scope.editing= function (id) {
					console.log('嘿哈'+id);
					$scope.currentEditingId=id;
				}
				//保存，及不可编辑(通过设置不可能的id来实现)
				$scope.save= function () {
					$scope.currentEditingId=-1;
				}

				$scope.toggleAll= function () {
					MainService.toggleAll();
				}

				//$scope.toggleAll = MainService.toggleAll;

				$scope.toggle= function () {
					MainService.save();
				}

				//路由改变时会自动调用控制器，所以不需要watch
				//$locationProvider.hashPrefix('');
				$scope.selector={};
				var status=$routeParams.status;
				switch (status) {
					case 'active':
						$scope.selector = { completed: false };
						break;
					case 'completed':
						$scope.selector = { completed: true };
						break;
					default:
						$route.updateParams({status:''})
						$scope.selector = {};
						break;
				}


				//自定义比较函数（ng中filter匹配默认是模糊匹配，上面completed写成‘fa'时也能匹配到）
				$scope.equalCompare= function (source,target) {
					return source===target;
				}

			}])
})(angular)
