import axios from 'axios'
//import {Toast} from 'antd-mobile'

//设置get和post请求
let config = axios.create({
    //baseURL: 'https://cnodejs.org/api/v1',
    baseURL: 'http://127.0.0.1:5000/api/v1',
    transformRequest:[
        function (data) {
            let ret = '';
            for (let it in data){
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ],
    transformResponse:[
        function (data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    responseType:'json',

});

//拦截器结合load组件
//config.interceptors.request.use(function (res) {
//    Toast.loading('加载中',0);
//    return res.data;
//});

//config.interceptors.response.use(function (res) {
//    Toast.hide();
//    return res.data;
//});

export function get(url) {
    return config.get(url)
}

export function post(url,data) {
    return config.post(url,data)
}