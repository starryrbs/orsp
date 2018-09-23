window.onload=function () {
    //判断是否完成了短信验证
    //    拖动按钮进行验证
    slide_flag=false;
//    判断手机号是否存在
    telephone_exist="exist";
//    手机号是否存在的提示标签
    tel_tag=document.querySelector('#tel_tag');
//一、定义一个获取DOM元素的方法
    var $ = function(selector){
            return  document.querySelector(selector);
        },
        box = $(".drag"),//容器
        bg = $(".bg"),//背景
        text = $(".text"),//文字
        btn = $(".btn"),//滑块
        success = false,//是否通过验证的标志
        distance = box.offsetWidth - btn.offsetWidth;//滑动成功的宽度（距离）
    message_flag=false;
    let id_container=document.querySelectorAll('.id-container>div');
    disappear_bottom(0);

//    从输入框获取手机号
    let telephone=document.querySelector('#telephone');
    let telephone_val=null;
//短信验证按钮
    let verification=jQuery('#verification');
    verification.click(function () {
        //进行短信验证
        MsgVertify()
    });
//填写完手机号后的下一步
    let next_step=document.querySelector('#next_step_1');
    console.log(next_step);
    let telephone_div=document.querySelector('.telephone-div');
    let account_msg=document.querySelector('.account-msg');
    next_step.onclick=function () {
        telephone_val=telephone.value;
        if (isPoneAvailable(telephone_val)){
            if (telephone_exist=="exist"){
                tel_tag.innerText="手机号已被注册过,请直接登录"

            } else if (telephone_exist=="not exist") {
                tel_tag.innerText="可以注册"
                //    点击下一步,telephone_div消失
                console.log("执行到了这里");
                //获取手机号输入框的值
                telephone_val=telephone.value;
                //如果进行了短信验证,可以进行下一步
                console.log(message_flag);
                console.log(slide_flag);
                if (slide_flag) {
                    telephone_div.style.display = 'none';
                    account_msg.style.display = 'flex';
                    disappear_bottom(1);
                }
            }

        }else {
            tel_tag.innerText="请输入正确的手机号"
        }

    };
    //第二个下一步
    let account_msg_next_step=document.querySelector('.account-msg>div:nth-child(4)');
    // 获取用户名
    let username=jQuery('.nickname>input');
    let username_tag=jQuery('.nickname>p');
    username.bind('input porpertychange',function () {
        let tt=null;
        let result=null;
        tt=setInterval(function () {
            clearInterval(tt);
            username_val=username.val();

            result=verytifyUsername(username_val);
            console.log(result);
           if (result){
               username_tag.text(result)
           }else {
               username_tag.text("")
           }
        },1000)
    });
    //获取密码
    let password=jQuery('.password>input');
    let password_tag=jQuery('.password>p');
    //进度条
    let progress_psd_par=jQuery('.progress_psd_par');
    password.bind('input porpertychange',function () {
        let tt=null;
        tt=setInterval(function () {
           clearInterval(tt);
            let strong_degree=judge_strong(password.val());
            progress_psd_par.css({'display':'block'}).children();
            if (strong_degree===2){
                progress_psd_par.children().removeClass().addClass("progress-bar progress-bar-warning").css("width","75%")
            } else if (strong_degree===3){
                progress_psd_par.children().removeClass().addClass("progress-bar progress-bar-danger").css("width","100%")

            }else if (strong_degree===1){
                progress_psd_par.children().removeClass().addClass("progress-bar progress-bar-info").css("width","50%")
            }else {
                progress_psd_par.children().removeClass().addClass("progress-bar progress-bar-success").css("width","25%")

            }
            console.log(progress_psd_par.children());
            password_tag.text("弱")
        },1000);
        
    });
    //获取确认密码
    let password_confirm=jQuery('.password_confirm>input');
    let password_p=jQuery('.password_confirm>p');
    let register_success=document.querySelector('.register-success');

    let result_msg=false;
    //当确认密码框的值改变时进行判断
    password_confirm.bind('input porpertychange',function () {

        let tt=null;
        //    获取用户名密码,并拿去验证
        tt=setInterval(function () {
            clearInterval(tt);
            username_val=username.val();
            password_val=password.val();
            password_confirm_val=password_confirm.val();
            result_msg=vertifyUsername_psd(username_val,password_val,password_confirm_val);
            console.log("返回的结果是:",result_msg);
            if (result_msg==="两次输入的密码不同"){
                password_p.text("两次输入的密码不同")
            } else if (result_msg==="请输入密码") {
                password_p.text("请输入密码")
            }else {
                password_p.text("")

                //    验证手机号界面的下一步添加点击事件
                account_msg_next_step.onclick=function () {
                    //强弱程度
                    console.log("result_msg",result_msg);
                    if (telephone_val && password_val && username_val) {
                        // if (typeof result_msg=="number"){
                        account_msg.style.display='none';
                        register_success.style.display='flex';
                        disappear_bottom(2);
                        //    发送ajax请求
                        let data={
                            "telephone":telephone_val,
                            "password":password_val,
                            "username":username_val
                        };
                        console.log("data",data);
                        ajax('post',"http://127.0.0.1:8080/user/register",data,function (result) {
                            console.log("result",result);
                            if ("token" in result){
                                window.sessionStorage.setItem("token",result["token"]);
                                window.sessionStorage.setItem("username",username_val);
                                window.sessionStorage.setItem("telephone",telephone_val);
                            }
                        })

                        // } else {
                        //
                        // }

                    }};
            }
        },1000)
    });

    let register_success_btn=document.querySelector('.register-success>div');
    register_success.onclick=function () {
        window.open('index.html');
        window.close();
    };

//使下边界消失
    function disappear_bottom(i) {
        for (let i of id_container){
            i.style.borderBottom='none';
        }
        id_container[i].style.borderBottom='1px solid red';
    }



//判断验证是否完成




//二、给滑块注册鼠标按下事件
    btn.onmousedown = function(e){
        //1.鼠标按下之前必须清除掉后面设置的过渡属性
        btn.style.transition = "";
        bg.style.transition ="";

        //说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。

        //2.当滑块位于初始位置时，得到鼠标按下时的水平位置
        var e = e || window.event;
        var downX = e.clientX;

        //三、给文档注册鼠标移动事件
        document.onmousemove = function(e){

            var e = e || window.event;
            //1.获取鼠标移动后的水平位置
            var moveX = e.clientX;

            //2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
            var offsetX = moveX - downX;

            //3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
            if( offsetX > distance){
                offsetX = distance;//如果滑过了终点，就将它停留在终点位置
            }else if( offsetX < 0){
                offsetX = 0;//如果滑到了起点的左侧，就将它重置为起点位置
            }

            //4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
            btn.style.left = offsetX + "px";
            bg.style.width = offsetX + "px";

            //如果鼠标的水平移动距离 = 滑动成功的宽度
            if( offsetX == distance){

                //1.设置滑动成功后的样式
                text.innerHTML = "验证通过";
                text.style.color = "#fff";
                btn.innerHTML = "&radic;";
                btn.style.color = "green";
                bg.style.backgroundColor = "lightgreen";

                //2.设置滑动成功后的状态
                success = true;
                //成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
                btn.onmousedown = null;
                document.onmousemove = null;

                //3.成功解锁后的回调函数
                setTimeout(function(){
                    // alert('解锁成功！');
                    telephone_val=telephone.value;
                    let data_exist={
                        "telephone":telephone_val
                    };
                    console.log("telephone_val",data_exist);
                    console.log(data_exist.telephone);
                    ajax('get','http://127.0.0.1:8080/user/isexist',data_exist,function (res) {
                        console.log("判断手机号是否存在的res",res)

                        if (res["status"]=="exist") {
                            telephone_exist="exist"
                        }else if (res["status"] =="not exist"){
                            telephone_exist="not exist"
                        }
                    });
                    slide_flag=true;
                },100);
            }
        }

        //四、给文档注册鼠标松开事件
        document.onmouseup = function(e){

            //如果鼠标松开时，滑到了终点，则验证通过
            if(success){
                return;
            }else{
                //反之，则将滑块复位（设置了1s的属性过渡效果）
                btn.style.left = 0;
                bg.style.width = 0;
                btn.style.transition = "left 1s ease";
                bg.style.transition = "width 1s ease";
            }
            //只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
            document.onmousemove = null;
            document.onmouseup = null;
        }


    }

};

//短信验证函数 ??????????????????
function MsgVertify() {
    message_flag=true
}

//用户名和密码验证
function vertifyUsername_psd(username_val,password_val,password_confirm_val) {
    let result=null;
    if (username_val.length>4){
        if (password_val){
            if (password_val === password_confirm_val){
                let strong_degree=0;
                strong_degree=judge_strong(password_val);
                result=strong_degree;
            } else {
                result="两次输入的密码不同";
            }

        } else {
            result="请输入密码";
        }
    } else {
        result="用户名的长度必须大于4"
    }
    return result
}
//用户名长度验证
function verytifyUsername(username) {
    console.log("执行了用户名长度验证");
    console.log(username.length);
    if (username.length>4){
        return false
    } else {
        return "用户名的长度必须大于4"
    }
}

function judge_strong(password_val) {
    let strong_degree=0;
    //判断用户名和密码是否符合规则
    console.log(password_val);
    console.log("密码是:",password_val);
    //只包含数字
    re_num=/^\d{8,}$/;
    //数字加字母正则表达式
    re_alnum=  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
    //数字加字母加特殊字符正则表达式
    re_alnum_charater=/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$/;
    if (re_num.test(password_val)) strong_degree=1;
    if (re_alnum.test(password_val)) strong_degree=2;
    if (re_alnum_charater.test(password_val)) strong_degree=3;
    console.log("密码强弱等级:",strong_degree);
    return strong_degree
}

//判断手机号是否合法

function isPoneAvailable(str) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
