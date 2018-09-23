let tel = document.querySelector('#telephone');
let pas = document.querySelector('#password');
//登录按钮
let login = document.querySelector('#login');
//登录成功
let login_success = document.querySelector('.login-success');
let telephone_div = document.querySelector('.telephone-div');
login.onclick = function () {
    let telephone = tel.value;
    let password = pas.value;
    //    进行手机号和密码简单验证
    var pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    if (pattern.test(telephone) && password.length > 1) {
        //发送ajax请求
        let data = {
            "telephone": telephone,
            "password": password
        };
        ajax('GET', 'http://127.0.0.1:5081/user/login', data, function (res) {
            console.log(res);
            if (res.code == "200") {
                telephone_div.style.display = 'none';
                login_success.style.display = 'flex';
            }

            else if (res.code == "400") {
                return "手机号或密码不正确"
            }
            else {
                return "代码有问题"
            }
        })


    }
};