//等待页面加载完成（所有资源）
window.addEventListener('DOMContentLoaded',function () {
    //处理头部js代码
    //获取dom元素
    var liNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var upNodes = document.querySelectorAll('.up');
    var contentUlNode = document.querySelector('.content-main');
    var contentLiNodes = document.querySelectorAll('.content-main li');
    var count = 0;
    var timer = null;

    //第一屏js代码
    headerHandle();
    function headerHandle() {
       //初始化时小箭头来到第一个Li的位置
       arrowNode.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth/2
           - arrowNode.offsetWidth/2 +'px';
       //第一个li显示
       upNodes[0].style.width = '100%';
       for (var i = 0; i < liNodes.length; i++) {
           liNodes[i].index = i;
           liNodes[i].onclick = function () {
               //默认清空所有width为0
               for (var j = 0; j < upNodes.length; j++) {
                   upNodes[j].style.width = '';
               }
               //其他li切换 为100% --找到准确下标
               upNodes[this.index].style.width = '100%';
               //小箭头去当前指定的li下面
               arrowNode.style.left = this.getBoundingClientRect().left + this.offsetWidth/2
                   - arrowNode.offsetWidth/2 +'px';
               contentUlNode.style.top = -this.index* contentLiNodes[0].offsetHeight +'px';
           }
       }
   }
    //轮播图
    carousel();
    function carousel() {
        var carouselLiNode = document.querySelectorAll('.carousel li');
        var pointLiNode = document.querySelectorAll('.point li');
        var lastIndex = 0;
        var nowIndex = 0;
        for (var i = 0; i < pointLiNode.length; i++) {
            pointLiNode[i].index = i;

            //函数节流：规定时间内，只让第一次操作生效，后面不生效
            var lastTime = 0;
            pointLiNode[i].onclick = function () {
                var nowTime = Date.now(); //得到当前的格林时间 单位：毫秒
                //如果点击的时间间隔小于2秒，不生效
                if(nowTime - lastTime <= 2000) return;
                //同步上一次的点击时间
                lastTime = nowTime;

                //nowIndex=lastIndex时
                nowIndex = this.index;
                if(nowIndex ==lastIndex)return;
                if(nowIndex > lastIndex){
                    //如果nowIndex>lastIndex时，右边显示左边隐藏
                    carouselLiNode[nowIndex].className = 'common right-show';
                    carouselLiNode[lastIndex].className = 'common left-hide';
                } else {
                    //如果nowIndex<lastIndex时，左边显示右边隐藏
                    carouselLiNode[nowIndex].className = 'common left-show';
                    carouselLiNode[lastIndex].className = 'common right-hide';
                }
                //小圆点切换
                pointLiNode[nowIndex].className = 'active';
                pointLiNode[lastIndex].className = '';
                lastIndex = nowIndex;
            }
        }
        //自动轮播
        var timers = null;
        timers = setInterval(function () {
            nowIndex++;
            //同步上一次点击时间，为了在轮播时用户不能点击小圆点 ，用户过2后再点轮播图
            lastTime = Date.now();
            if(nowIndex >= 4) nowIndex = 0;
            //如果nowIndex>lastIndex时，右边显示左边隐藏
            carouselLiNode[nowIndex].className = 'common right-show';
            carouselLiNode[lastIndex].className = 'common left-hide';
            //小圆点切换
            pointLiNode[nowIndex].className = 'active';
            pointLiNode[lastIndex].className = '';
            lastIndex = nowIndex;

        },3000)
    }
    //滚轮事件
    document.onmousewheel = wheel;
    document.addEventListener('DOMMouseScroll',wheel);
    function wheel(event) {
        //关闭定时器
        clearTimeout(timer);
        timer=setTimeout(function () {
            var flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            }

            switch (flag) {
                case 'up' :
                    console.log(111)
                    if(count >0){
                        count--;
                        contentUlNode.style.top = -count* contentLiNodes[0].offsetHeight +'px';
                        arrowNode.style.left = liNodes[count].getBoundingClientRect().left + liNodes[count].offsetWidth/2
                            - arrowNode.offsetWidth/2 +'px';
                        for (var j = 0; j < upNodes.length; j++) {
                            upNodes[j].style.width = '';
                        }
                        //其他li切换 为100% --找到准确下标
                        upNodes[count].style.width = '100%';
                    }

                    break;
                case 'down' :
                    console.log(111)
                    if(count <4){
                        count++;
                        contentUlNode.style.top = -count* contentLiNodes[0].offsetHeight +'px';
                        arrowNode.style.left = liNodes[count].getBoundingClientRect().left + liNodes[count].offsetWidth/2
                            - arrowNode.offsetWidth/2 +'px';
                        for (var j = 0; j < upNodes.length; j++) {
                            upNodes[j].style.width = '';
                        }
                        //其他li切换 为100% --找到准确下标
                        upNodes[count].style.width = '100%';
                    }
                    break;
            }

        },200)
        event = event || window.event;
        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }
    //同步窗口
    window.onresize = function () {
            arrowNode.style.left = liNodes[count].getBoundingClientRect().left + liNodes[count].offsetWidth/2
                - arrowNode.offsetWidth/2 +'px';
        }
})