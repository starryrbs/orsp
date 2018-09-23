let container = document.querySelector('.container');
let icon_change = document.querySelector('.icon-change');
let flag = true;
let body = document.querySelector('body');
let main = document.querySelector('main');
let nav = document.querySelector('nav');
let footer = document.querySelector('footer');
list_ul = document.querySelector('.header ul');
console.log(document.documentElement.scrollHeight);
icon_change.onclick = function () {

    console.log(main.style.height);
    if (flag) {
        icon_change.style.backgroundImage = "url('images/close.svg')";
        icon_change.style.backgroundPosition = '3px';
        icon_change.style.backgroundSize = 'contain';
        body.style.overflowY = 'hidden';
        var height_list = document.documentElement.scrollHeight;
        console.log(height_list);
        // list_ul.style.height='800px';
        list_ul.style.height = '800px';
        list_ul.style.backgroundColor = 'black';
        main.style.display = 'none';
        nav.style.display = 'none';
        footer.style.display = 'none';
        list_ul.style.display = 'block';
        flag = false;
    } else {
        icon_change.style.backgroundImage = "url('images/change.svg')";
        // icon_change.style.backgroundPosition='';
        icon_change.style.backgroundSize = 'contain';
        flag = true;

        body.style.overflowY = 'auto';
        console.log(height_list);
        list_ul.style.backgroundColor = 'black';
        main.style.display = 'block';
        nav.style.display = 'block';
        footer.style.display = 'block';
        list_ul.style.display = 'none';
    }
};

function startMove(ele, iTarget, speed) {
    var timer = null;
    clearInterval(timer);//防止方法重复执行时，计时器的重复使用

    timer = setInterval(function () {
        if (ele.offsetLeft != iTarget) {
            ele.style.height = ele.offsetHeight + speed + "px";
        }
    }, 1);
}


let type = $('.good-ul');
let goods_type_two = $('.goods-type-two');
let good_container = $('.goods-container');
//二级类型
let type_second = [];
good_container.mouseover(function (event) {
    if (event.target.className == "good-li") {
        goods_type_two.fadeIn();
        goods_type_two.css('display','flex')
    } else if (event.target.className == "goods-type-two") {

    }
});
good_container.mouseleave(function (event) {

    goods_type_two.fadeOut();

});
//get侧边栏添加mouseover和mouseout事件
// type.addEventListener('mouseover',function (event) {
//     // console.log("event.target.nodeName",event.target.nodeName)
//     if (event.target.nodeName=="LI"){
//         type_name=event.target.innerText;
//         if (goods_type_two.css('display')=='none'){
//             goods_type_two.fadeIn()
//         }
//     }
// });
// type.addEventListener('mouseleave',function (event) {
//     // console.log("event.target.nodeName",event.target.nodeName)
//     if (event.target.nodeName=="LI"){
//         type_name=event.target.innerText;
//         //给二级类型和三级类型添加mouseover和mouseout事件
//         goods_type_two.mouseover(function (event) {
//             // console.log("event.target.nodeName",event.target.nodeName);
//             // console.log("执行了mouseover");
//         });
//
//
//     }
// });
// goods_type_two.mouseleave(function (event) {
//     console.log("执行了mouseout");
//     // console.log("event.target.nodeName",event.target.nodeName)
//     goods_type_two.fadeOut()
// });
//发送ajax请求获取商品类型
ajax('get', 'http://127.0.0.1:8080/goods/getgoodtype', null, function (res) {
    console.log(res);
    result = res["result"];
    console.log(result);
    for (let r in  result) {
        // console.log(result[r]["name"]);
        // console.log(result[r]["category"]);
        // console.log(type);
        type.html(type.html()+ `
        
        <li class="good-li">
                <a href="##">${result[r]["name"]}</a>
                <span></span>
        </li>
        `) ;
        //    增加一个hover事件

        //    渲染二级类型和三级类型
        //
        // type_twos = result[r]["category"];
        // console.log("type_twos",type_twos);


        // console.log("type_second",type_second)
    }
    // console.log(type)
});
type.mouseover(function (event) {
    if (event.target.nodeName == "LI") {
        console.log(event.target.innerText);
        current_li=event.target.innerText;
        for (let r of  result){
            if (r["name"]==current_li.trim()){
                console.log('-------');
                console.log(r["category"]);
                goods_type_two.html("");
                for (let two_name of r["category"]) {
                    console.log(11,two_name["name"]);
                    goods_type_two.html(goods_type_two.html()+`
                    
                    <div class="good-panel">
                        <h5 >${two_name["name"]}</h5>
                        <p class="good-two">
                            <!--<a href="">女装</a>-->
                            <!--<a href="">女装</a>-->
                            <!--<a href="">女装</a>-->
                        </p>
                    </div>
                    
                    `)

                }
                let good_two=$('.good-two');
                console.log("good_two",good_two);
                console.log(2,good_two[0])
                for (let good_three in r["category"]){

                    console.log(good_three,r["category"][good_three]["category"]);
                    for (let good in r["category"][good_three]["category"]) {
                        // good_two[good].html(good_two.html()+`
                        // <a href="">${r["category"][good_three]["category"][good]}</a>
                        // `)
                    }
                }
                good_two.each(function (index) {
                    console.log(index,r["category"][index]["category"]);
                    for (let good of r["category"][index]["category"]) {
                        console.log($(this).html());;
                        $(this).html($(this).html()+`
                        <a href="">${good}</a>
                        `)
                    }
                    // console.log("---",index+$(this));
                    //     // $(this).html()
                    // for (let good_three in r["category"]){
                    //     console.log("r[\"category\"][good_three]",r["category"][good_three]);
                    // // for (let good in r["category"][good_three]["category"]) {
                    //     $(this).html($(this).html()+`
                    //     <a href="">${r["category"][good_three]["category"][good_three]}</a>
                    //     `);
                    //     console.log("r[\"category\"][good_three][\"category\"][good]",r["category"][good_three]["category"][good_three])
                    // // }
                    //     }
                })
                // for (let good_three in good_two){
                //     console.log(good_two[good_three])
                // }
            }
        }

        console.log(result)
    }


});