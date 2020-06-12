import axios from 'axios'
import Qs from 'qs'

let util = {};
util.title = function(title) {
	title = title
		? title + ' - 金电智诚'
		: '金电智诚';
	window.document.title = title;
};

util.msgText = {
	error: '接口异常'
}

// newObj
util.getNewObj = function(obj) {
	return JSON.parse(JSON.stringify(obj));
}

//本地存储
util.setlocalStorage = function(key, value) {
	window.localStorage.setItem(key, window.JSON.stringify(value));
}
util.getlocalStorage = function(key) {
	return window.JSON.parse(window.localStorage.getItem(key));
}
util.removelocalStorage = function(key) {
	window.localStorage.removeItem(key);
}

//session本地存储
util.setsessionStorage = function(key, value) {
	window.sessionStorage.setItem(key, window.JSON.stringify(value));
}
util.getsessionStorage = function(key) {
	return window.JSON.parse(window.sessionStorage.getItem(key));
}
util.removesessionStorage = function(key) {
	window.sessionStorage.removeItem(key);
}

//cookie 设置
util.setCookie = function(name, value, Hours) {
	if (Hours == null || Hours == '') {
		Hours = 0.5;
	}
	var exp = new Date();
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(window.JSON.stringify(value)) + "; path=/;expires=" + exp.toGMTString();
}

util.getCookie = function(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return window.JSON.parse(unescape(arr[2]));
	else
		return null;
	}

util.removeCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
	}

util.verify = {
	phone: function(value) {
		var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
		if (!reg.test(value)) {
			return false;
		}else{
            return true;
        }
	},
	pass:function (value) {
		// var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!_^&*]+$)[\da-zA-Z!_^&*]{8,20}$/;
		//密码强度正则，最少8到20位，包括至少1个小写字母，1个数字，1个特殊字符
		var reg = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*?_]).*/;
        if (!reg.test(value)) {
            return false;
        }else{
            return true;
        }
	}
}

util.findSign = {
	signArr: [],
	start:0,
	checkSign:function (url) {
		// console.log(this);
		// return false;
		let pos = url.indexOf('/', this.start)
		if (pos > -1) {
			this.start = pos + 1
			this.signArr.push(pos)

			this.checkSign(url)
			// console.log(this);
			// console.log(pos);
		}
		return this.signArr
	}
}

util.domain = process.env.NODE_ENV === 'development'
	? ''
	: '';

util.ajax = axios.create({
	baseURL: '',
	// timeout: 5000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		// 'JD-Token': util.getsessionStorage('auth') && util.getsessionStorage('auth')['JD-Token']
	},
	responseType: 'json',
	transformRequest: [function(data) {
			data = Qs.stringify(data);
			return data;
		}
	],
	transformResponse: [function(data) {
			// 这里提前处理返回的数据
			// console.log(JSON.parse(data));
			// console.log(data);

			return data;
		}
	]
});

export default util;
