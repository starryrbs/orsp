//搜产品的下边框显示效果
let li2=document.querySelector(".header_box .wp .box_right .above .li2");
let li1=document.querySelector(".header_box .wp .box_right .above .li1");
li2.onmouseover=function(){
    li1.style.borderBottom='none';
};
li2.onmouseout=function(){
    li1.style.borderBottom="1px solid #c80000";
};
li1.onmouseover=function(){
    li1.style.borderBottom='none';
};
li1.onmouseout=function(){
    li1.style.borderBottom='1px solid #c80000';
};
//导航栏的显示效果
let div_fo=document.querySelectorAll(".nav_box ul li div");
let a=document.querySelectorAll(".nav_box ul li>a");//获取元素的class
var flag="";
for(i=0;i<a.length;i++) {
    a[i].onclick = function (){
        for (t = 0; t < a.length; t++) {
            a[t].style.color = "#333";
        }
        // console.log(this.dataset.setId);
        flag=this.dataset.setId;
        for(j=0;j<div_fo.length;j++){
            div_fo[j].style.opacity=0;
        }
        div_fo[flag].style.opacity=1;
        this.style.color = "#c80000";
    }
}

