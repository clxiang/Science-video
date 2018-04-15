// 头部字体变换特效
(function () {
    var $banner=$('#inter .top .videoul');
    var $li=$banner.children();
    $banner.append($li.eq(0).clone());
    var num=0;
    (function fn(){
        num++;
        $banner.animate({top:-num*$li.eq(0).height()},function(){
            if(num >= $li.length){
                num=0;
                $banner.css({top:0})
            }
        });
        setTimeout(fn,1500);
    })();
})();
// make video 变换特效
(function (){
    var $img=$(".video-img"),
        $li=$img.children();
    $img.append($li.eq(0).clone());
    var num=0;
    (function fn(){
        num++;
        $img.animate({
            bottom:-num*$li.eq(0).height()
        },function(){
            if(num===$li.length){
                num=0;
                $img.css({bottom:0})
            }
        });
        setTimeout(fn,2000);
    })();
})();
// 视频播放
(function () {
    var $video = $('.h-video video');
        var length = $video.length;
        var num = 0;
        var $oldVideo,$currentVideo,$oldline;
        var onoff = true;
        var arr = ['vote_bg_video.mp4','magic_bg_video.mp4','shelves_video.mp4','trading_video.mp4'];
         $oldVideo  = $video.eq(num%length);

         //按钮
         var $tab = $('.jianbian');
         var timer;
        //  var $line= $('.banner .marker ul.tab li a i');
        var $line=$(".jianbian i.newline");
         reqeuest();
        function reqeuest(){
            var  progress = $oldVideo[0].currentTime/$oldVideo[0].duration;//视频播放进度
            // $oldline = $line.eq(num);
            // $oldline.css({width:progress*100+'%'});
            $line.eq(num).css({width:progress * 120 + '%'});
            if(progress > 0.95 && onoff){
                //下一个视频
                onoff = false;
                $currentVideo = $video.eq( (num+1)%length );
                $currentVideo[0].src = 'video/'+arr[(num+1)%arr.length];
                $currentVideo[0].play();//播放
                // $oldline.css({width:0});
                $line.eq(num).css({width:0});
                $currentVideo.animate({opacity:1},500);
                $oldVideo.animate({opacity:0},500,function(){
                    $oldVideo[0].pause();//暂停
                    $oldVideo[0].src = '';

                    $oldVideo =  $currentVideo;//更新$oldVideo
                    onoff = true;
                });
                num++;
                num%=arr.length;
                //下一个video 加载src
            }
            //console.log(  progress );
            timer = requestAnimationFrame( reqeuest );
        };

        $tab.click(function(){
            cancelAnimationFrame(timer);
            $oldVideo[0].pause();//暂停
            $oldVideo[0].src = '';
            $line.css({width:0});
            num = $(this).index();

            //console.log( num  )
            $oldVideo =  $video.eq( num%length );
            $oldVideo[0].src = 'video/'+arr[num%arr.length];
            console.log('video/'+arr[num%arr.length])
            $oldVideo[0].play();//播放
            onoff = true;
            reqeuest();
        })
})();
//视频展开收缩播放
(function(){
    var $btn=$(".h-btn .h-btn-right");
    var $yuan = $(".header-video .h-two .h-btn div.yuan");
    var $shipin= $(".header-video .h-two .h-btn div.shipin");
    var $video = $(".header-video .h-two .h-btn div.shipin video");
    var $close= $(".header-video .h-two .h-btn div.shipin div span.close");
    $btn.click(function () {
        $btn.animate({opacity:0},600,function () {
            $yuan.css({display:'block'});
            $yuan.animate({
                top:68,
                left:450
            },600,function () {
                $shipin.css({display:'block'});
                $shipin.animate({
                    width:1880,
                    height: 1880,
                    marginLeft:-956,
                    marginTop:-745
                },400,function () {
                    $video[0].currentTime=0;
                    $video[0].play();
                    $(window).scroll(function () {
                        $(window).scrollTop(0);
                    });
                });
            });
        });
    });

    $close.click(function () {
        $video[0].pause();
        $shipin.animate({
            width:0,
            height: 0,
            marginLeft:0,
            marginTop:0
        },500,function(){
            $shipin.css({display:'none'});
        });
        $yuan.animate({
            top:141,
            left:172
        },800,function () {
            $yuan.css({display:'none'});
            $btn.animate({opacity:1},600);
        });
        $(window).scroll(function () {
            $(window).unbind('scroll');
            $(window).scrollLeft(0);
        });
        
    })
})();
//波浪切换图片
(function(){
    var $pic=$(".wave .w-left li"),
        $i = $(".wave .w-right li.guang .hov"),
        $cli = $(".wave .w-right li.guang .cli"),
        $btn= $(".wave .w-right li.guang");

        //波浪上层点击切换
        var index,oldindex;
        $btn.click(function () {
            $pic.eq(oldindex-1).animate({opacity:0},500);
            $cli.eq(oldindex-1).animate({
                width:0,
                height:0
            },200);
            oldindex = index = $(this).index();
            $pic.eq(index-1).animate({opacity:1},500);
            $cli.eq(index-1).animate({
                width:40,
                height:3
            },200);
        });
        // $btn.mouseenter(function () {
        //     var index = $(this).index();
        //     $i.eq(index-1).animate({
        //         width:40,
        //         height:1
        //     },200)
        // })
        // $btn.mouseout(function () {
        //     var index = $(this).index();
        //     $i.eq(index-1).animate({
        //         width:0,
        //         height:0
        //     },200)
        // })

        //波浪起伏
        var canvas = document.getElementById('wave');
        var ctx =  canvas.getContext('2d');
        var  w =  canvas.width =  canvas.parentNode.offsetWidth;
        var  h =  canvas.height =  canvas.parentNode.offsetHeight;

        var waveDefault = h/2;//默认高度
        var waveBo = waveDefault/4;//波浪最大高度
        var colors = ["rgba(0,222,255, 0.2)",
                       "rgba(157,192,249, 0.2)",
                       "rgba(0,168,255, 0.2)"];
        var num=0;
        (function requestA(){
            ctx.clearRect(0,0,w,h);//擦除画布
            num++;
            for(var i=0;i<colors.length;i++){
                var angle = (num+i*50)*Math.PI/180;
                var sinHeight = Math.sin( angle )*waveBo;//左边
                var cosHeight = Math.cos( angle )*waveBo;//右边
                ctx.fillStyle=colors[i];   //绘制边框
                ctx.beginPath();//开始路径
                ctx.moveTo(0,waveDefault+sinHeight);//(x,y)移动画笔
                ctx.bezierCurveTo(w/2,waveDefault-waveBo+sinHeight,w/2,waveDefault-waveBo+cosHeight,w,waveDefault+cosHeight);
                ctx.lineTo(w,h);     //右下角
                ctx.lineTo(0,h);    //左下角
                ctx.lineTo(0,waveDefault+sinHeight);//移动画笔
                ctx.fill();          //画 填充
            }
            requestAnimationFrame(requestA);
        })();
})();
// 导航栏背景
(function () {
    var $tran=$(".bottom-nav .b-bg").eq(0);
    var $li = $(".b-nav > .b-nav-ul > li");

    $li.hover(function () {
        $tran.css({transform:'rotateX(0deg)'});
    },function(){
        $tran.css({transform:'rotateX(90deg)'});
    });

    window.addEventListener('scroll',function(){
        var scrtop = $(window).scrollTop();
        if(scrtop > 10){
            $tran.css({transform:'rotateX(0deg)'});
        }else{
            $tran.css({transform:'rotateX(90deg)'});
        }
    })
})();
//一站式电商解决方案
(function(){
    var $list=$(".p-cen .p-left .l-ul li.list");
    var $p=$(".p-cen .p-left .l-ul li p");
    var index,oldindex;
    var on=true;
    $list.click(function () {
        index=$(this).index();
        if(oldindex != index)on=true;
        if(on){
            $list.eq(oldindex).animate({height:30},500);
            $p.eq(oldindex).animate({fontSize:16},500);
            
            $list.eq(index).animate({height:100},500);
            $p.eq(index).animate({fontSize:20},500);
            oldindex=index;
            on=false;
        }else{
            $list.eq(index).animate({height:30},500);
            $p.eq(index).animate({fontSize:16},500);
            on=true;
        }
    });
})();
//Video++为 16,615 家企业客户提供服务
(function () {
    var $pic=$(".server .s-bottom img");
    var $docwidth=$(document).width();
    var $picwidth=$pic.width();
    var width = $picwidth - $docwidth;
    var num=0;
    var onoff = true;
        (function fn(){
            if(onoff){
                num+=2;
                if(num>width){
                    onoff =  false;
                }
            }else{
                num-=2;
                if(num<0){
                    num = 0;
                    onoff =  true;
                }
            }
            $pic.css({left:-num});
            requestAnimationFrame(fn);
        })();
})();
//他们说 | Cases
(function () {
    var $li=$(".cases .c-cen .c-bottom .list");
    var $pic = $(".cases .c-cen .c-top .c-right li img");
    var $ul = $(".cases .c-cen .c-top .c-left ul li");
    var index;
    var num = 0;
    $li.click(function(){
        fn(num);
        num = index = $(this).index();
        fn1(index);
    });

    function timer(){
        fn(num);
        num++;
        if(num == $li.length)num=0;
        fn1(num)
        setTimeout(timer,2000);
    };
    setTimeout(timer,2000);

    function fn(oldindex){
        $pic.eq(oldindex).animate({opacity:0},500);
        $ul.eq(oldindex).animate({top:-318},500);
        $li.eq(oldindex).css({borderBottomColor:'transparent'});
    }
    function fn1(index){
        $li.eq(index).css({borderBottomColor:'#9BE5D8'});
        $pic.eq(index).animate({opacity:1},500);
        $ul.eq(index).animate({top:-169},500);
    }
})();
// 发现更多 Video++ 正在创造的底部圆
(function(){
    var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var w = canvas.width = canvas.parentNode.offsetWidth;
        var h = canvas.height = canvas.parentNode.offsetHeight;
        var r = 200;//小圆半径
        var R = Math.sqrt( Math.pow(w/2,2)+Math.pow(h,2) );//圆的最大半径
        var offset = 150;//圆与圆之间距离
        var num = Math.floor( (R-r)/offset) ;

        var arr = [];
        for(var i=0;i<=num;i++){
            var obj = {};
            obj.r = offset*i + r;
            arr.push(obj);
        }
        //动画
        (function requestA(){
            ctx.clearRect(0,0,w,h);
            for(var i=0;i<arr.length;i++){
                if( arr[i].r > R ){
                    arr[i].r = r;

                }else{
                    arr[i].r++;
                }
                arr[i].opacity = (R-arr[i].r)/R;
                draw(arr[i]);
            }
            requestAnimationFrame(requestA);
        })();
        
        //绘制canvas
        function draw(obj){
            ctx.beginPath();
            ctx.lineWidth = obj.r/150;//线条宽度
            ctx.strokeStyle = 'rgba(0,0,0,'+obj.opacity+')';//绘制边框颜色
            ctx.arc(w/2,h,obj.r,0,360*Math.PI/180,true);//绘制圆路径
            ctx.stroke();
        };
})();
//开放式视频创收应用
(function(){
    var $revenue_content = $('.open .o-cen .o-bottom');
    var $h4 = $('.open .o-cen .o-bottom .js-bian');
    var arr = [106536169,340,36];
    var onoff = true;
    $(window).scroll(function(){
       var top =  $revenue_content.eq(0)[0].getBoundingClientRect().top;
       //console.log( top );
       if(top < 200 && onoff){
        onoff = false;
            for(var i=0;i<arr.length;i++){
                requestA(arr[i],5000,i);
            }


       }
        function requestA(number,duration,index){
                var init_t = new Date();
                (function run(){
                     var current_t =  new Date();
                     var percent = (current_t-init_t)/duration;//动画进度
                     if(percent>1){
                        percent = 1;
                     }else{
                        requestAnimationFrame(run);
                     }
                     var value = (number*percent).toFixed(0);
                     //console.log( 'ok')
                     switch (index) {
                         case 0:
                            var one =parseInt(value/1000000);
                            var two = parseInt(value%1000000/1000);
                            var three = parseInt(value%1000);
                            $h4.eq(index).html(one+','+two+','+three);
                             break;
                         case 1:
                             $h4.eq(index).html(value);
                             break;
                        case 2://5
                             $h4.eq(index).html(value/10);
                             break;
                     }
                })();
        };

    });
})();
$(window).scroll(function(){
    $(window).scrollLeft(0);
})