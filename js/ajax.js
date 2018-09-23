function ajax(type,url,data,callback) {
    var oAjax=null;
    type=type.toUpperCase();
    //1. 创建对象
    if (window.XMLHttpRequest){
        oAjax=new XMLHttpRequest();
    } else {
        oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }
//    open

    if (type=="GET"){

        url=data?addURLPararm(url,data):url;
        oAjax.open('GET',url,true);
        console.log(url);
        oAjax.send(null);
    } else if (type=="POST"){

        oAjax.open('POST',url,true);
        oAjax.setRequestHeader("Content-Type","application/json");
        // oAjax.send(JSON.stringify(data));
        // oAjax.send('user={\n' +
        //     '       "name":"san",\n' +
        //     '       "id":"001"\n' +
        //     '   }');
        console.log(1);
        console.log(typeof JSON.stringify(data));
        oAjax.send(JSON.stringify(data));
    }

    // 4. 当oAjax状态为4的时候,判断statuscode,然后取数据
    oAjax.onreadystatechange=function () {
        try{
            if (oAjax.readyState==4){
                if (oAjax.status>=200 &&oAjax.status<=300||oAjax.status>=400){
                    var result=JSON.parse(oAjax.responseText);
                    callback(result)

                }else {
                    callback('error');
                }
            }
        }
        catch (e) {
            callback(e);
        }
    };
}


//get方式将数据添加到url上
function addURLPararm(url,data) {
    for (let k in data){

        console.log(data[k]);
        url+=url.indexOf('?')<0?'?'+k+'='+data[k]:'&'+k+'='+data[k];
        console.log(url);
    }
    console.log(url);
    url=encodeURI(url);
    return url
}






// var oAjax=null;
// if (window.XMLHttpRequest){
//     oAjax=new XMLHttpRequest();
// } else {
//     oAjax=new ActiveXObject('Microsoft.XMLHTTP');
// }
//
//
// var url='http://www.baidu.com?id="张三"';
// //发送请求,第一个参数请求方法,第二个参数是url,第三个参数是是否异步
// oAjax.open('POST',url,true);
// oAjax.setRequestHeader("Content-type","application/x-www-form-urlencoded")
// oAjax.send('id=001&name=tom');
// //    send()请求是同步的
//
// //    3. 发送请求,这个时候服务器才会接受到请求
// //     oAjax.send(null)//如果不需要发送数据
//
// function addURLPararm(url,name,value) {
//     url+=url.indexOf('?');
// }
// // 4. 当oAjax状态为4的时候,判断statuscode,然后取数据
// oAjax.onreadystatechange=function () {
//     if (oAjax.readyState==4){
//         if (oAjax.status>=200 &&oAjax.status<=300||oAjax.status>=400){
//             var result=oAjax.responseText;
//             var j=JSON.parse(result);
//             alert(j.name)
//         }else {
//             alert('error');
//         }
//     }
// };