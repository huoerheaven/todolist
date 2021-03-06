
/*双向数据绑定*/
angular.module("myapp",[])//启动模块
    .controller("ctrl",["$scope","$filter",function($scope,$filter){//依赖注入
        /*参数初始化*/
        $scope.data=localStorage.messages?JSON.parse(localStorage.messages):[];
        //console.log($scope.data);
        /*当前的子内容  默认的为第一个*/
        $scope.currentId=$scope.data.length?$scope.data[0].id:null;
        $scope.currentCon=$scope.data.length?$scope.data[getIndex($scope.currentId)]:null;
        /*监控search*/
        $scope.search='';
        $scope.$watch("search",function(){
            var arr=$filter("filter")($scope.data,$scope.search);
            $scope.currentCon=$scope.data[getIndex(arr[0].id)]
        });

        /*开关*/

        $scope.isshow=true;
        /*添加列表*/
        $scope.addList=function(){
            $scope.isshow=true;
            var maxid=getMaxId($scope.data);
//alert(1)
            var obj={id:maxid+1,title:"",son:[]};

            $scope.data.push(obj);

            localStorage.messages=JSON.stringify($scope.data);
        };

        /*删除列表*/
        $scope.removeList=function(id){
            angular.forEach($scope.data,function(val,index){

                if(val.id==id){
                    if($scope.data.length==1){
                        $scope.currentId= null   ;
                        $scope.currentCon=[];
                    }else if(id===$scope.data[$scope.data.length-1].id){
                        $scope.currentId= $scope.data[$scope.data.length-2].id;
                        $scope.currentCon=$scope.data.length?$scope.data[getIndex($scope.currentId)]:null;

                    }



                    $scope.data.splice(index,1);
                    localStorage.messages= JSON.stringify($scope.data);



                }

            })
        };

        /*更改列表数据*/

        $scope.blur=function(id){

            localStorage.messages=JSON.stringify($scope.data);


        };


        /*列表映射*/

        $scope.focus=function(id){
            $scope.isshow=true;
            $scope.currentId=id;
            $scope.currentCon=$scope.data.length?$scope.data[getIndex($scope.currentId)]:null;
        };

        /*添加内容*/
        $scope.addCon=function(){
            var id=getMaxId($scope.currentCon.son);
            var obj={id:id+1,title:"New Content"};
            $scope.currentCon.son.push(obj);
            localStorage.messages=JSON.stringify($scope.data);
        };


        /*修改内容*/

        $scope.conBlur=function(){
            localStorage.messages=JSON.stringify($scope.data);
        };



        /*删除内容*/

        $scope.removeCon=function(id){
            for(var i=0;i<$scope.currentCon.son.length;i++){
                if(id==$scope.currentCon.son[i].id){
                    $scope.currentCon.son.splice(i,1);
                }
            }

            localStorage.messages=JSON.stringify($scope.data);
        };


        /*通过ID获取下标*/
        function getIndex(id,arr){
            var arr=arr||$scope.data;
            for (var i = 0; i < arr.length; i++) {
                if (id== arr[i].id) {
                    return i;
                }
            }

        };

        /*获取最大的id*/
        function getMaxId(arr){
            //var temp=arr[0]?arr[0].id:0;
            if(arr.length>0){
                var temp=arr[0].id;
                for(var i=0;i<arr.length;i++){
                    if(temp<arr[i].id){
                        temp=arr[i].id
                    }
                }
            }else{
                temp=0;
            }
                return parseInt(temp);

        }

        /*将已完成的信息存储到本地*/
        $scope.success=localStorage.success?JSON.parse(localStorage.success):[];
        /*存入已完成数组*/
        $scope.done=function(id){
            //1.放到scuuess
            var index=getIndex(id,$scope.currentCon.son);
            var obj=$scope.currentCon.son[index];
            obj.id=getMaxId($scope.success)+1;
            $scope.success.push(obj);
            //2.将已完成的信息从数组里删掉
            $scope.currentCon.son.splice(index,1);
            localStorage.success=JSON.stringify($scope.success);
            localStorage.messages=JSON.stringify($scope.data);

        };

        /*删除已完成*/
        $scope.removeDone=function(id){
            for(var i=0;i<$scope.success.length;i++){
                if(id==$scope.success[i].id){
                    $scope.success.splice(i,1)
                }
            }
            localStorage.success=JSON.stringify($scope.success);
        }

    }]);



