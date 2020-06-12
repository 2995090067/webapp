export default[
	{
		path: '/',
		name: 'HomePage',
		redirect: '/FirstPage',
		meta: {
			title: '首页框架'
		},
		component: (resolve) => require(['../views/HomePage/Index.vue'], resolve),
		children: [
			{
				path: 'FirstPage',
				name: 'FirstPage',
				meta: {
					title: '首页'
				},
				component: (resolve) => require(['../views/HomePage/FirstPage.vue'], resolve)
			}, {
				path: 'SecondPage',
				name: 'SecondPage',
				meta: {
					title: '信用服务'
				},
				component: (resolve) => require(['../views/HomePage/SecondPage.vue'], resolve)
			}, {
				path: 'UserCenter',
				name: 'UserCenter',
				meta: {
					title: '用户中心',
				},
				component: (resolve) => require(['../views/HomePage/UserCenter.vue'], resolve)
			}
		]
	}, {
		path: '/YzsPage',
		name: 'YzsPage',
		meta: {
			title: '一站式查询'
		},
		component: (resolve) => require(['../views/YzsPage.vue'], resolve)
	}, {
		path: '/YzsListPage/:keyword',
		name: 'YzsListPage',
		meta: {
			title: '一站式查询列表'
		},
		component: (resolve) => require(['../views/YzsListPage.vue'], resolve)
	}, {
		path: '/Search',
		name: 'Search',
		meta: {
			title: '文章搜索'
		},
		component: (resolve) => require(['../views/Search.vue'], resolve)
	}, {
		path: '/ListPage/:id',
		name: 'ListPage',
		meta: {
			title: '普通列表'
		},
		component: (resolve) => require(['../views/ListPage.vue'], resolve)
	}, {
		path: '/ListPageNoTab/:id',
		name: 'ListPageNoTab',
		meta: {
			title: '普通列表2'
		},
		component: (resolve) => require(['../views/ListPageNoTab.vue'], resolve)
	}, {
		path: '/ListDetailPage/:id',
		name: 'ListDetailPage',
		meta: {
			title: '文章详情'
		},
		component: (resolve) => require(['../views/ListDetailPage.vue'], resolve)
	}, {
		path: '/XygsListPage/:id',
		name: 'XygsListPage',
		meta: {
			title: '信用公示'
		},
		component: (resolve) => require(['../views/XygsListPage.vue'], resolve)
	}, {
		path: '/XygsDetailPage',
		name: 'XygsDetailPage',
		meta: {
			title: ''
		},
		component: (resolve) => require(['../views/XygsDetailPage.vue'], resolve)
	}, {
		path: '/HcbgPage',
		name: 'HcbgPage',
		redirect: '/ZxsqPage',
		meta: {
			title: '核查报告',
			auth: true
		},
		component: (resolve) => require(['../views/HcbgPage/index.vue'], resolve),
		children: [
			{
				path: '/ZxsqPage',
				name: 'ZxsqPage',
				meta: {
					title: '在线申请'
				},
				component: (resolve) => require(['../views/HcbgPage/ZxsqPage.vue'], resolve)
			}, {
				path: '/JdcxPage',
				name: 'JdcxPage',
				meta: {
					title: '进度查询'
				},
				component: (resolve) => require(['../views/HcbgPage/JdcxPage.vue'], resolve)
			}
		]
	}, {
		path: '/Jdcx_detailPage/:id',
		name: 'Jdcx_detailPage',
		meta: {
			title: '报告详情'
		},
		component: (resolve) => require(['../views/HcbgPage/Jdcx_detailPage.vue'], resolve)
	},{
		path: '/YyclPage',
		name: 'YyclPage',
		redirect: '/YyZxsqPage',
		meta: {
			title: '异议处理',
			auth: true
		},
		component: (resolve) => require(['../views/YyclPage/index.vue'], resolve),
		children: [
			{
				path: '/YyZxsqPage',
				name: 'YyZxsqPage',
				meta: {
					title: '在线申请'
				},
				component: (resolve) => require(['../views/YyclPage/YyZxsqPage.vue'], resolve)
			}, {
				path: '/YyJdcxPage',
				name: 'YyJdcxPage',
				meta: {
					title: '进度查询'
				},
				component: (resolve) => require(['../views/YyclPage/YyJdcxPage.vue'], resolve)
			}
		]
	}, {
		path: '/YyJdcx_detailPage/:id',
		name: 'YyJdcx_detailPage',
		meta: {
			title: '异议审批详情',
			// auth: true
		},
		component: (resolve) => require(['../views/YyclPage/YyJdcx_detailPage.vue'], resolve)
	}, {
		path: '/Authentication',
		name: 'Authentication',
		meta: {
			title: '实名认证',
			auth: true
		},
		component: (resolve) => require(['../views/Authentication.vue'], resolve)
	}, {
		path: '/Login',
		name: 'Login',
		meta: {
			title: '登陆'
		},
		component: (resolve) => require(['../views/Login.vue'], resolve)
	}, {
		path: '/Register',
		name: 'Register',
		meta: {
			title: '注册'
		},
		component: (resolve) => require(['../views/Register.vue'], resolve)
	}, {
		path: '/RegisterPage',
		name: 'RegisterPage',
		redirect: '/RegisterPage/step1',
		meta: {
			title: '注册'
		},
		component: (resolve) => require(['../views/RegisterPage/Index.vue'], resolve),
		children: [
			{
				path: '/RegisterPage/step1',
				name: 'RegisterPage1',
				meta: {
					title: '注册'
				},
				component: (resolve) => require(['../views/RegisterPage/Step1.vue'], resolve)
			}, {
				path: '/RegisterPage/step2',
				name: 'RegisterPage2',
				meta: {
					title: '注册'
				},
				component: (resolve) => require(['../views/RegisterPage/Step2.vue'], resolve)
			}, {
				path: '/RegisterPage/step3',
				name: 'RegisterPage3',
				meta: {
					title: '注册'
				},
				component: (resolve) => require(['../views/RegisterPage/Step3.vue'], resolve)
			}
		]
	}, {
		path: '/EditPass',
		name: 'EditPass',
		meta: {
			title: '修改密码',
			auth:true
		},
		component: (resolve) => require(['../views/EditPass.vue'], resolve)
	}, {
		path: '/BaseInfo',
		name: 'BaseInfo',
		meta: {
			title: '基本资料',
			auth:true
		},
		component: (resolve) => require(['../views/BaseInfo.vue'], resolve)
	}, {
		path: '/EditPhone',
		name: 'EditPhone',
		meta: {
			title: '修改手机号',
			auth:true
		},
		component: (resolve) => require(['../views/EditPhone.vue'], resolve)
	}, {
		path: '/FindPass',
		name: 'FindPass',
		meta: {
			title: '密码找回'
		},
		component: (resolve) => require(['../views/FindPass.vue'], resolve)
	}, {
		path: '/About',
		name: 'About',
		meta: {
			title: '关于我们'
		},
		component: (resolve) => require(['../views/About.vue'], resolve)
	}, {
		path: '/*',
		name: 'NotFound',
		meta: {
			title: '404'
		},
		component: (resolve) => require(['../views/NotFound.vue'], resolve)
	}
]
