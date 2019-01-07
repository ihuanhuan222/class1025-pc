//等待页面加载完成（所有资源）
window.addEventListener('DOMContentLoaded',function () {
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
    
    //第五屏js代码
    lastHandle();
    function lastHandle() {
      //获取dom元素
      var teamUlNode = document.querySelector('.team-person');
      var teamLiNode = document.querySelectorAll('.team-person li');
      var width = teamLiNode[0].offsetWidth;
      var height = teamLiNode[0].offsetHeight;
      var canvas = null;
      var creatCircleTimer = null;
      var paintingTimer = null;

      for (var i = 0; i < teamLiNode.length; i++) {
        teamLiNode[i].index = i;
        teamLiNode[i].onmouseenter = function () {
          //改变透明度
          for (var j = 0; j < teamLiNode.length; j++) {
            teamLiNode[j].style.opacity = 0.5;
          }
          this.style.opacity = 1;
          if(!canvas){
            //创建画布
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.className = 'canvas';
            //产生气泡
            buble(canvas);
            teamUlNode.appendChild(canvas);
          }
          //不管添加不添加canvas，left值都得改变
          canvas.style.left = this.index * width +'px';

        }
      }
      teamUlNode.onmouseleave = function () {
        for (var i = 0; i < teamLiNode.length; i++) {
          teamLiNode[i].style.opacity = 1;
        }
        //清除画布
        canvas.remove();
        canvas = null;
        //清除定时器，防止多次点击网页卡
        clearInterval(creatCircleTimer);
        clearInterval(paintingTimer);
      }
      //封装气泡运动函数
      function buble(myCanvas) {
        var circleArr = [];

        if(myCanvas.getContext){
          var ctx = myCanvas.getContext('2d');
          //画圆
          creatCircleTimer= setInterval(function () {
            //清除画布；把之前画的清除掉
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
            for (var i = 0; i < circleArr.length; i++) {
              circleArr[i].deg += 8;
              //弧度的值
              var rad = circleArr[i].deg *Math.PI/180;
              //计算得出小圆点运动坐标
              var nowLeft = Math.floor(Math.sin(rad)*circleArr[i].s + circleArr[i].x);
              var nowTop = Math.floor(circleArr[i].y -rad*circleArr[i].s);

              ctx.fillStyle = 'rgba('+ circleArr[i].r+','+ circleArr[i].g+','+ circleArr[i].b+')';
              ctx.beginPath();
              ctx.arc(nowLeft,nowTop,circleArr[i].c_r,0,Math.PI*2);
              ctx.fill();
            }
          },1000/60)

          //生成圆
          paintingTimer= setInterval(function () {
            //颜色随机
            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);
            //半径随机
            var c_r = Math.floor(Math.random()*8 +2);
            //位置随机
            var x = Math.floor(Math.random()*myCanvas.width);
            var y = myCanvas.height + c_r;
            var s =Math.floor(Math.random()*30 +20);

            circleArr.push({
              r: r,
              g: g,
              b: b,
              x: x,
              y: y,
              c_r: c_r,
              deg: 0,
              s: s
            });
          },20);
        }
      }
    }

  
})