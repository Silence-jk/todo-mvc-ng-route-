/**
 * Created by Silence-JK on 2017/3/24.
 */
(function (angular) {

	angular.module('app.services.main',[])
		.service('MainService',['$window', function ($window) {
			var storage=$window.localStorage;
			//将字符串转化为JSON对象
			var todos=storage['my_todo_list']?JSON.parse(storage['my_todo_list']):[];
			console.log('乌拉拉'+todos);
			function getId(){
				var id=Math.random();
				//利用递归来避免id重复
				for(var i=0;i<todos.length;i++){
					if(todos[i].id===id){
						//调用递归，直到找到突破口，否则会成为死循环
						id=getId();
						break;
					}
				}
				return id;
			}

			//
			this.save= function () {
				storage['my_todo_list']=JSON.stringify(todos);
			}

			this.get= function () {
				return todos;
			}

			this.add= function (text) {
				todos.push({
					//id:todos.length+1,缺点：由于id是根据长度变化的，所以删除时可能误删
					id:getId(),
					text:text,
					completed: false,
				});
				this.save();
				console.log('嘿哈');
			}

			this.remove= function (id) {
				for(var i=0;i<todos.length;i++){
					if(todos[i].id===id){
						todos.splice(i,1);
						break;
					}
				}
				this.save();
			}

			//clear already completed
			//思路：创建一个新数组,将没有完成的push进去
			this.clear= function () {
				var result=[];
				for(var i=0;i<todos.length;i++){
					if(todos[i].completed!==true){
						result.push(todos[i]);
					}
				}
				todos=result;
				this.save();
				//将清除完后的结果给了todos后，使todos指向一个新地址，不然只是背后清除了，而界面上仍保留
				return todos;
			}

			//clear completed btn is exist
			this.existCompleted= function () {
				for(var i=0;i<todos.length;i++){
					if(todos[i].completed==true){
						return true;
					}
				}
				return false;
			}



			var now=true;
			this.toggleAll= function () {
				for(var i=0;i<todos.length;i++){
					todos[i].completed=now;
				}
				console.log('呜拉巴哈');
				now=!now;
				this.save();
			}
		}])

})(angular)
