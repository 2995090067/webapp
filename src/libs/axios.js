import axios from 'axios'
import Qs from 'qs'

import Util from './util'

const axiosInstance = axios.create({
	baseURL: '',
	timeout: 30000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'XYPJ-Gateway-Token': Util.getsessionStorage('token')
		// 'XYPJ-Gateway-Token': Util.getsessionStorage('token') && Util.getsessionStorage('token')['XYPJ-Gateway-Token']
	},
	responseType: 'json',
	transformRequest: [function(data) {
		data = Qs.stringify(data);
		return data;
	}],
	// transformResponse: [function(data) {
	// 	  这里提前处理返回的数据
	// 	  console.log(JSON.parse(data));
	// 	  console.log(data);
	// 		return data;
	// 	}
	// ]
})

export default {
	init(router, store, Toast) {
		// console.log(router);
		// console.log(store);
		
		// 拦截器
		axiosInstance.interceptors.request.use(config=>{
			const token = Util.getsessionStorage('token')
			if (token) {
				config.headers['XYPJ-Gateway-Token'] = token
				// axiosInstance.defaults.headers.common['XYPJ-Gateway-Token'] = token
			}
			return config
		}, function(error) {
			return Promise.reject(error);
		});

		axiosInstance.interceptors.response.use(function(response) {
			if (response.data.code == 0) { //正常
				return response;
			} else if (response.data.code == -1) { //失败
				// Toast.fail(response.data.msg)
				Toast(response.data.msg)
			} else if (response.data.code == -2) { //未登陆
				// 移除token
				Util.removesessionStorage('token')
				// 移除用户信息
				Util.removesessionStorage('userInfo')
				router.push({name: 'Login'})
			} else if (response.data.code == -3) { //无权限
				Toast(response.data.msg)
			}

			return Promise.reject();
		}, function(error) {
			// console.log(error);
			Toast('接口异常')

			return Promise.reject(error);
		});
	},
	axiosInstance
}
