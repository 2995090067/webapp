// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import StoreConfig from './store/store'
import Util from './libs/util'
import RouterConfig from './router/config'
import Axios from './libs/axios'
import App from './App'

Vue.use(Vuex)
Vue.use(VueRouter)

import {
	List,
	Panel,
	cell,
	CellGroup,
	Tab,
	Tabs,
	Icon,
	Swipe,
	SwipeItem,
	Lazyload,
	Toast,
	Tabbar,
	TabbarItem,
	PullRefresh,
	NavBar,
	PasswordInput,
	NumberKeyboard,
	Field,
	Button,
	Actionsheet,
	Picker,
	Uploader,
	Checkbox,
	Switch,
	Popup,
	Tag,
	Loading
} from 'vant';
Vue.use(List).use(Panel).use(cell).use(CellGroup).use(Tab).use(Tabs).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(Toast).use(Tabbar).use(TabbarItem).use(PullRefresh).use(NavBar).use(PasswordInput).use(NumberKeyboard).use(Field).use(Button).use(Actionsheet).use(Picker).use(Uploader).use(Checkbox).use(Switch).use(Popup).use(Tag).use(Loading)

// 路由配置
const router = new VueRouter({
	// mode: 'history',
	// history: true,
	saveScrollPosition: true,
	transitionOnLoad: true,
	routes: RouterConfig
})

router.beforeEach((to, from, next) => {
	// console.log(to,from)
	// console.log(to.name);

	if (to.matched.some(m => m.meta.auth)) {// 路由需要身份验证
		// console.log('--start--');
		// console.log(to.name + ':to');
		// console.log(from.name + ':from');
		// console.log('--end--');
		let userInfo = Util.getsessionStorage('userInfo')

		// 可以取到本地token 已登陆
		if (Util.getsessionStorage('token')) {
			//禁止跳转异议申请 核查报告
			if (to.name == 'ZxsqPage' || to.name == 'YyZxsqPage') {
				if (Util.getsessionStorage('token')) {
					if(userInfo.shzt == 'U'){//驳回时跳转到实名认证
						Toast('请先实名认证')
						// 定向到实名认证
						next({
							name: 'Authentication',
						})
					}else if(userInfo.shzt == 'S'){
						Toast('当前实名信息审核中')
						next(false)
					}else{
						next()
					}
				}else{
					next()
				}
			}else{
				next()
			}
		} else {
			// 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
			next({
				name: 'Login',
				query: {
					Rurl: to.fullPath
				}
			})
		}
	} else {//路由无身份验证
		// 已经登陆
		if (to.name == 'Login' || to.name == 'Register') { //禁止跳转至登陆和注册
			if (Util.getsessionStorage('token')) {
				next(false)
			}else{
				next()
			}
		}else{
			next()
		}
	}
});

router.afterEach((to, from) => {
	// 设置当前页面标题
	if (to.meta && to.meta.title) {
		Util.title(to.meta.title)
	}
});

// vuex
const store = new Vuex.Store(StoreConfig)

Vue.config.productionTip = false

// 注入对象
Axios.init(router, store, Toast)

const VM = new Vue({el: '#app', router, store: store, template: '<App/>', components: {
		App
	}})

export default VM
