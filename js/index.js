// 一，关键词轮换       // 块级作用域：因为里面let声明的变量，只在此范围内有效，不会污染区域外的变量。   
{
// 1.首先，获取到搜索框的对象（即内部的单行文本框）
let input=document.querySelector('.search input');

// 2.其次，设置关键词的数组
const keyWords=['Java','Python','Vue3.0','SpringBoot','微服务','多线程'];

// 3.最后，使用定时器setInterval，每隔2秒切换一个关键词，即切换搜索框对象的placeholder值
let i=0;                             // i 代表数组的索引，从0开始
input.placeholder=keyWords[i];       // 定时器之前，单行文本框中初始值为首个关键词
setInterval(()=>{
    i++;
    if(i==5){
        i=0;    
    }
    input.placeholder=keyWords[i];
},2000);

}


// 二、轮播图       // 块级作用域
{
    // 首先，声明轮播图数组
    const swiperImgList=[
        {                                        // 第一个对象
            path:'./images/swiper/swiper-1.jpg',        // 轮播的图
            bg:'./images/swiper/bj-0.jpg'               // 轮播的图，的外层div的背景图，一一对应
        },
        {                                        // 第二个对象
            path:'./images/swiper/swiper-2.jpg',
            bg:'./images/swiper/bj-1.jpg'

        },
        {
            path:'./images/swiper/swiper-3.jpg',
            bg:'./images/swiper/bj-2.jpg'

        },
        {
            path:'./images/swiper/swiper-4.jpg',
            bg:'./images/swiper/bj-3.jpg'

        }
    ];

    // 其次，获取右侧切换按钮
    const rightArrow=document.querySelector('.arrow-r');
    const leftArrow=document.querySelector('.arrow-l');
    // 获取a标签对象
    const swiperA=document.querySelector('.swiper a');
    // 获取最外层通栏的div对象
    const banner=document.querySelector('#banner');
    // 获取所有的切换圆点
    const lis=document.querySelectorAll('.circle-list li');
    const ul=document.querySelector('.circle-list');
    

    let i=0;                    // 用来控制数组索引的
    function changeImg(index){          // 将重复的代码封装成一个函数，下面直接调用即可
        swiperA.style.backgroundImage = `url(${swiperImgList[index].path})`;
        banner.style.backgroundImage = `url(${swiperImgList[index].bg})`;
        currentCircle(index);           // 直接调用下面的currentCircle函数，用于圆点切换
    }

    changeImg(i);       // 提前调用上面的changeImg函数，保证页面一开始就必须有背景图。

    // 最后，为右箭头绑定鼠标单击事件
    rightArrow.onclick=function(){
        i++;
        if(i==4){
            i=0;
        }
        changeImg(i);               // 直接调用上面的changeImg函数
    }

    leftArrow.onclick=function(){
        i--;
        if(i==-1){
            i=3;
        }
        changeImg(i);               // 直接调用上面的changeImg函数
    }


    // 封装一个函数，根据当前图片的索引值来通过圆点切换对应图片
    function currentCircle(index){
        for(let i=0;i<lis.length;i++){      // 循环读取lis数组，所有的lis
            lis[i].className='';
            lis[index].className='current';
        }
    }


    // 通过循环，来注册所有四个圆点的点击事件
    for(let i=0;i<lis.length;i++){
        lis[i].onclick=function(){
            if(flag==false){
                return;
            }
            flag = false;

            changeImg(i);

            setTimeout(()=>{
                flag=true;
            },1000)
        }
    }

    // 自动轮播
    timer=setInterval(()=>{             // 定义一个定时器setInterval
        i++;
        if(i==4){
            i=0;
        }
        changeImg(i);                   // 每过一段时间3s，调用下changeImg函数
    },3000)

    swiperA.onmouseenter = function(){  // 注册一个鼠标进入事件，一旦鼠标进入
        clearInterval(timer);           // 消除定时器，暂停轮播
    }

    swiperA.onmouseleave = function(){   // 注册一个鼠标离开事件，一旦鼠标离开
        timer=setInterval(()=>{          // 就继续启动定时器，自动的轮播
            i++;
            if(i==4){
                i=0;
            }
            changeImg(i);  
        },3000)
    }

    leftArrow.onmouseenter = function(){        // 左箭头、右箭头，也注册鼠标进入事件，但是，只注册进入事件，因为鼠标离开后，也是停止。
        clearInterval(timer);
    }
    rightArrow.onmouseenter = function(){
        clearInterval(timer);
    }
    ul.onmouseenter = function(){               // 切换圆点同理。
        clearInterval(timer);
    }
    
}


// 三，倒计时       // 块级作用域
{
    // 1.获取结束时间点的时间戳
    let endDate=new Date('2023-12-31 23:00:00');
    endDate=parseInt(endDate.getTime()/1000);        // 得到时间戳毫秒数+毫秒转秒+毫秒转秒后，有可能有小数，所以只要整数部分

    let timer=null;
    // 获取时分秒的标签对象
    const hourDom=document.getElementById('hour');
    const minDom=document.getElementById('min');
    const secDom=document.getElementById('sec');

    function countDown(){                       // 封装成一个获取结束时间、当前时间、计算剩余时间、填入页面时间框的步骤，封装成一个函数
        // 2. 获取当前时间点的时间戳
        let nowDate=new Date();
        nowDate=parseInt(nowDate.getTime()/1000);
        // 3. 计算剩余的总秒数
        let seconds=endDate-nowDate;

        if(seconds>=0){
            // 4.根据剩余总秒数，计算剩余小时、分钟、秒；（关键）
            let hours=parseInt(seconds/3600);
            hours=hours>9?hours:'0'+hours;          // 小时如果是2时，只是1位，不好看，所以就变为02的规范形式

            let mins=parseInt(seconds%3600/60);
            mins=mins>9?mins:'0'+mins;

            let secs=seconds%3600%60;
            secs=secs>9?secs:'0'+secs;
            // 5.再将剩余的小时、分钟、秒显示在页面上，填到框里；
            hourDom.innerText=hours;
            minDom.innerText=mins;
            secDom.innerText=secs;
        }else{
            clearInterval(timer);               // 如果结束时间已经小于当前时间点了，就说明倒计时已过完了
            document.querySelector('.countdown p').innerText='拼团已结束';
        }
    }

    countDown();             // 页面载入时，先调用执行以下countDown函数，否则就会页面已载入，就前1秒就会显示HTML中默认的15：30：45了

    timer=setInterval(()=>{
        countDown();         // 再调用上面的countDown函数
    },1000)
}


// 四，滚动课程     // 块级作用域
{
    const ul=document.querySelector('.ms-list ul');

    let timer=null;
    let leftPX=0;           // 向左的边偏移：默认是0

    timer=setInterval(()=>{ // 设置一个定时器
        leftPX = --leftPX == -1920 ? 0 : leftPX;    // 三元运算符
        ul.style.left=leftPX+'px';
    },10);


    ul.onmouseenter=function(){
        clearInterval(timer);               // 当鼠标进入区域时，消除定时器，即停止滚动
    }

    ul.onmouseleave=function(){             // 当鼠标再次离开时，就必须再启动定时器功能
        timer=setInterval(()=>{
            leftPX = --leftPX == -1920 ? 0 : leftPX;    
            ul.style.left=leftPX+'px';
        },10);
    }

}


// 五，新上好课：课程切换       // 块级作用域
{
    // 1. 获取所有的a标签（Tab栏）
    const tabs=document.querySelectorAll('#course .title-pic a');       // a标签只有3个，即tab栏选项有3个
    const uls=document.querySelectorAll('#course  .course ul');

    // 2.循环为所有的Tab栏绑定点击事件
    for(let i=0;i<tabs.length;i++){
        tabs[i].onclick=function(){
            // 2.1 当点击任何一个tab栏时，先通过循环清除所有a标签和ul标签的样式
            for(let j=0;j<tabs.length;j++){
                tabs[j].className='';            // 因为tab栏和ul数一样，一一对应
                uls[j].className='';
            }
            // 2.2 显示出当前点击的tab栏、匹配的ul
            tabs[i].className='active';            // active用来切换tab选项，都显示
            uls[i].className='current';            // current用来标记要显示出来的ul，因为有三个ul，默认是隐藏状态

        }
    }
}
