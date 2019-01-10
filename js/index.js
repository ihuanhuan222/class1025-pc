//等待页面加载完成（所有资源）
window.addEventListener('DOMContentLoaded',function () {
    //获取dom元素
    var liNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var upNodes = document.querySelectorAll('.up');
    var contentUlNode = document.querySelector('.content-main');
    var contentLiNodes = document.querySelectorAll('.content-main li');
    var navBarLiNode = document.querySelectorAll('.nav-bar li');
    var musicIcon = document.querySelector('.header-main .musicIcon');
    var homeNode = document.querySelector('.home');
    var plane1 = document.querySelector('.plane1');
    var plane2 = document.querySelector('.plane2');
    var plane3 = document.querySelector('.plane3');
    var pencel1 = document.querySelector('.works .pencel1');
    var pencel2 = document.querySelector('.works .pencel2');
    var pencel3 = document.querySelector('.works .pencel3');
    var aboutPhoto =document.querySelectorAll('.about-photo');
    var teamTitle = document.querySelector('.team-title');
    var teamContent = document.querySelector('.team-content');
    var bootAnimationLine = document.querySelector('.boot-animation .line');
    var bootAnimationTop = document.querySelector('.boot-animation .top');
    var bootAnimationBottom = document.querySelector('.boot-animation .bottom');
    var bootAnimation = document.querySelector('.boot-animation');

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
                    // console.log(111)
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

    //侧边导航
    for (var i = 0; i < navBarLiNode.length; i++) {
      this.index = i;
      navBarLiNode.onclick = function () {
        nowIndex = this.index;
        //默认清空所有width为0
        for (var j = 0; j < upNodes.length; j++) {
          upNodes[j].style.width = '';
          navBarLiNode[j].className = '';
        }
        //其他li切换 为100% --找到准确下标
        upNodes[ nowIndex].style.width = '100%';
        //小箭头去当前指定的li下面
        arrowNode.style.left = this.getBoundingClientRect().left + this.offsetWidth/2
          - arrowNode.offsetWidth/2 +'px';
        contentUlNode.style.top = - nowIndex* contentLiNodes[0].offsetHeight +'px';

        //侧边导航
        navBarLiNode[this.index].className = 'active';

      }

  }

    //音乐播放
    // musicIcon.onclick = function () {
    //   if(musicIcon.pushed){
    //       //当前音乐暂停，点击播放
    //     musicIcon.play();
    //   }
    // }


    //出入场动画
    var animationArr = [
      {
      anOut:function () {
        homeNode.style.transform = 'translateY(-200px)';
        homeNode.style.opacity = 0;
      },
      anIn:function () {
        homeNode.style.transform = 'translateY(0px)';
        homeNode.style.opacity = 1;
      }
      },
      {
        anOut:function () {
          plane1.style.transform = 'translate(-200px,-200px)';
          plane2.style.transform = 'translate(-200px,200px)';
          plane3.style.transform = 'translate(200px,-200px)';

        },
        anIn:function () {
          plane1.style.transform = 'translate(0)';
          plane2.style.transform = 'translate(0)';
          plane3.style.transform = 'translate(0)';
        }
      },
      {
        anOut:function () {
          pencel1.style.transform = 'translateY(-200px)';
          pencel2.style.transform = 'translateY(200px)';
          pencel3.style.transform = 'translateY(200px)';

        },
        anIn:function () {
          pencel1.style.transform = 'translate(0)';
          pencel2.style.transform = 'translate(0)';
          pencel3.style.transform = 'translate(0)';
        }
      },
      {
        anOut:function () {
          aboutPhoto[0].style.transform = 'rotate(30deg)';
          aboutPhoto[1].style.transform = 'rotate(-30deg)';
        },
        anIn:function () {
          aboutPhoto[0].style.transform = 'rotate(0deg)';
          aboutPhoto[1].style.transform = 'rotate(0deg)';
        }
      },
      {
        anOut:function () {
          teamTitle.style.transform = 'translateX(-200px)';
          teamContent.style.transform = 'translateX(200px)';
        },
        anIn:function () {
          teamTitle.style.transform = 'translateX(0px)';
          teamContent.style.transform = 'translateX(0px)';
        }
      },
    ]

    //开机动画
    var imgArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
    var num = 0;
    for (var i = 0; i < imgArr.length; i++) {
      var items = imgArr[i];
      //创建img
      var image = new Image();
      image.src = './img/'+ items;

      image.onload = function () {
        num++;
        bootAnimationLine.style.width = num/imgArr.length *100 + '%';
        if(num === imgArr.length){
          //说明图片加载完成
          bootAnimationTop.style.height = 0;
          bootAnimationBottom.style.height = 0;
          bootAnimationLine.style.display = 'none';
          bootAnimationTop.addEventListener('transitionend',function () {
            bootAnimation.remove();
          })
        }
        
      }

    }
  
})