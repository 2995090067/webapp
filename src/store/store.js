import Util from '../libs/util'
import Axios from '../libs/axios'

export default {
	state: {
		nav: [
			{
				title: '信用动态',
				channelIds: 75,
				child: [
					{
						title: '本地动态',
						channelIds: 95
					}, {
						title: '本省动态',
						channelIds: 96
					}, {
						title: '国家动态',
						channelIds: 97
					}
				]
			}, {
				title: '政策法规',
				channelIds: 94,
				child: [
					{
						title: '本地政策',
						channelIds: 98
					}, {
						title: '本省政策',
						channelIds: 99
					}, {
						title: '国家政策',
						channelIds: 100
					}
				]
			}, {
				title: '一站式查询',
				channelIds: 'yzs'
			}, {
				title: '双公示',
				channelIds: 'xygs',
				child: [
					{
						title: '法人许可',
						channelIds: 'frXk'
					}, {
						title: '法人处罚',
						channelIds: 'frCf'
					}, {
						title: '自然人许可',
						channelIds: 'zrrXk'
					}, {
						title: '自然人处罚',
						channelIds: 'zrrCf'
					}
				]
			}, {
				title: '红黑名单',
				channelIds: 'hhmd',
				child: [
					{
						title: '法人守信红名单',
						channelIds: 'frHon'
                    }, {
						title: '法人失信黑名单',
						channelIds: 'frHei'
                    }, {
						title: '自然人守信红名单',
						channelIds: 'zrrHon'
					}, {
						title: '自然人失信黑名单',
						channelIds: 'zrrHei'
					}
				]
			}, {
				title: '信用承诺',
				channelIds: 144
			// }, {
			// 	title: '信用热点', //新闻动态
			// 	channelIds: 101
			}
		],
		register: {
            payload:{
                phone: '',
                // code: '',
                password: '',
                ztmc:'',
                bm:'',
                fddbr:'',
                file1: {},
                file2: {},
                file3: {},
            },
            step1:{
                disabled:true
            },
            step2:{
                disabled:true
            }
		},
		listTab: {},
		login: {
			status: '',
			msg: ''
		},
		search: {},
		yzsPage:{
			active:0,
		}
	},
	getters: {
		// 获取导航当前信息
		getPageInfo: (state) => (id) => {
			let result = state.nav.filter(item => (item.channelIds == id))
			if (result.length > 0) {
				return result[0]
			} else {
				return {}
			}
		}
	},
	mutations: {
		SET_AUTHCODE(state, data) {
			state.authCode = data
		},
		// 主页

		// 列表
		SET_listPage_tab_init(state, data) {
			state.listTab[`parentTab${data}`] = {
				active: 0,
				tabInfo: []
			}
		},
		SET_listPage_init(state, data) {
			state.listTab[`parentTab${data.channelIds}`].tabInfo.push(data.obj)
		},
		SET_listPage_load_refresh(state, data) {
			state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active].refresh = data.refresh
		},
		SET_listPage_load_status(state, data) {
			state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active].loading = data.loading
		},
		SET_listPage_load_data(state, data) {
			// let thisList = state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active]
			// thisList.list = thisList.list.concat(data.list)
			state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active].list = data.list
		},
		SET_listPage_load_finished(state, data) {
			state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active].finished = data.finished
		},
		SET_listPage_load_payload(state, data) {
			state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active].payload.first = data.first
		},
		// 双公示 红黑榜
		SET_xygslistPage_load_payload(state, data) {
			state.listTab[`parentTab${data.channelIds}`].tabInfo[data.active].payload.pageNo = data.pageNo
		},
		// 一站式
		SET_yzsPage_change_active(state, data) {
			state.listTab.yzsPage = {
				...data
			}
		},
        // 注册
        SET_registerPage_saveData(state, data) {
			state.register.payload = {
                ...data,
            }
		},
		SET_registerPage_changeStatus(state, data) {
			state.register[data.step] = {
                disabled:data.value
            }
		},
		// 登陆
		SET_loginpage_login_status(state, data) {
			// state.login.status = data.status
			// state.login.msg = data.msg
			state.login = {
				...data
			}
		},
	},
	actions: {
		// 初始化
		listPage_init_action({
			commit
		}, paramsObj) {
			if (!this.state.listTab[`parentTab${paramsObj.channelIds}`]) {
				commit('SET_listPage_tab_init', paramsObj.channelIds)

				let initObj = {
					// index: index,
					list: [],
					payload: {
						first: 0,
						count: 10
					},
					loading: false,
					finished: false,
					refresh: false
				}
				if (paramsObj.child) {
					paramsObj.child.map(function(item, index) {
						commit('SET_listPage_init', {
							channelIds: paramsObj.channelIds,
							obj: {
								title: item.title,
								channelIds: item.channelIds,
								...Util.getNewObj(initObj)
							}
						})
					})
				} else {
					commit('SET_listPage_init', {
						channelIds: paramsObj.channelIds,
						obj: {
							title: paramsObj.title,
							channelIds: paramsObj.channelIds,
							...initObj
						}
					})
				}
			}
		},
		// 刷新
		listPage_refresh_action({
			commit
		}, paramsObj) {
			// commit('SET_listPage_load_refresh', {
			// 	channelIds: paramsObj.channelIds,
			// 	active: paramsObj.active,
			// 	refresh: true
			// })
			commit('SET_listPage_load_finished', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				finished: false
			})
			commit('SET_listPage_load_payload', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				first: 0
			})
			commit('SET_listPage_load_data', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				list: []
			})
		},
		// 获取数据
		listPage_loadData_action({
			commit
		}, paramsObj) {
			let thisList = this.state.listTab[`parentTab${paramsObj.channelIds}`].tabInfo[paramsObj.active]

			if(thisList.loading){// 加载中
				return false;
			}
			commit('SET_listPage_load_status', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				loading: true
			})

			return new Promise((resolve, reject) => {
				Util.ajax.get(paramsObj.url, {
					params: {
						...paramsObj.payload,
						...thisList.payload
					}
				}).then((response) => {
					if (response.data) {
						if (response.data.data.length == 0) {
							commit('SET_listPage_load_finished', {
								channelIds: paramsObj.channelIds,
								active: paramsObj.active,
								finished: true
							})
						} else {
							commit('SET_listPage_load_data', {
								channelIds: paramsObj.channelIds,
								active: paramsObj.active,
								list: thisList.list.concat(response.data.data)
							})
						}

						commit('SET_listPage_load_payload', {
							channelIds: paramsObj.channelIds,
							active: paramsObj.active,
							first: thisList.payload.first + thisList.payload.count
						})
						resolve()
					} else {
						reject()
					}

					// setTimeout(function () {
					// 	commit('SET_listPage_load_refresh', {
					// 		channelIds: paramsObj.channelIds,
					// 		active: paramsObj.active,
					// 		refresh: false
					// 	})
					// }, 1000);
					commit('SET_listPage_load_refresh', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						refresh: false
					})
					commit('SET_listPage_load_status', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						loading: false
					})
				}).catch((err) => {
					console.log(err);
					reject(err)
					commit('SET_listPage_load_refresh', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						refresh: false
					})
					commit('SET_listPage_load_status', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						loading: false
					})
				})
			})
		},
		// 双公示 红黑榜 初始化
		xygsListPage_init_action({
			commit
		}, paramsObj) {
			if (!this.state.listTab[`parentTab${paramsObj.channelIds}`]) {
				commit('SET_listPage_tab_init', paramsObj.channelIds)

				let initObj = {
					// index: index,
					list: [],
					payload: {
						pageNo: 0,
						pageSize: 10
					},
					loading: false,
					finished: false,
					refresh: false
				}
				if (paramsObj.child) {
					paramsObj.child.map(function(item, index) {
						commit('SET_listPage_init', {
							channelIds: paramsObj.channelIds,
							obj: {
								title: item.title,
								channelIds: item.channelIds,
								...Util.getNewObj(initObj)
							}
						})
					})
				} else {
					commit('SET_listPage_init', {
						channelIds: paramsObj.channelIds,
						obj: {
							title: paramsObj.title,
							channelIds: paramsObj.channelIds,
							...initObj
						}
					})
				}
			}
		},
		// 双公示 红黑榜 刷新
		xygsListPage_refresh_action({
			commit
		}, paramsObj) {
			// commit('SET_listPage_load_refresh', {
			// 	channelIds: paramsObj.channelIds,
			// 	active: paramsObj.active,
			// 	refresh: true
			// })
			commit('SET_listPage_load_finished', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				finished: false
			})
			commit('SET_xygslistPage_load_payload', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				pageNo: 0
			})
			commit('SET_listPage_load_data', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				list: []
			})
		},
		// 双公示 红黑榜 获取数据
		xygsListPage_loadData_action({
			commit
		}, paramsObj) {
			let thisList = this.state.listTab[`parentTab${paramsObj.channelIds}`].tabInfo[paramsObj.active]

			if(thisList.loading){// 加载中
				return false;
			}

			commit('SET_listPage_load_status', {
				channelIds: paramsObj.channelIds,
				active: paramsObj.active,
				loading: true
			})

			return new Promise((resolve, reject) => {
				let ajaxIns
				if (paramsObj.ajax && paramsObj.ajax.type == 'post') {
					ajaxIns = Util.ajax.post(paramsObj.url, {
						...paramsObj.payload,
						...thisList.payload
					})
				} else {
					ajaxIns = Util.ajax.get(paramsObj.url, {
						params: {
							...paramsObj.payload,
							...thisList.payload
						}
					})
				}

				ajaxIns.then((response) => {
					if (response.data) {
						if (response.data.data.length == 0) {
							commit('SET_listPage_load_finished', {
								channelIds: paramsObj.channelIds,
								active: paramsObj.active,
								finished: true
							})
						} else {
							commit('SET_listPage_load_data', {
								channelIds: paramsObj.channelIds,
								active: paramsObj.active,
								list: thisList.list.concat(response.data.data)
							})
						}

						commit('SET_xygslistPage_load_payload', {
							channelIds: paramsObj.channelIds,
							active: paramsObj.active,
							pageNo: thisList.payload.pageNo + thisList.payload.pageSize
						})
						resolve()
					} else {
						reject()
					}

					// setTimeout(function () {
					// 	commit('SET_listPage_load_refresh', {
					// 		channelIds: paramsObj.channelIds,
					// 		active: paramsObj.active,
					// 		refresh: false
					// 	})
					// }, 1000);
					commit('SET_listPage_load_refresh', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						refresh: false
					})
					commit('SET_listPage_load_status', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						loading: false
					})
				}).catch((err) => {
					console.log(err);
					reject(err)
					commit('SET_listPage_load_refresh', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						refresh: false
					})
					commit('SET_listPage_load_status', {
						channelIds: paramsObj.channelIds,
						active: paramsObj.active,
						loading: false
					})
				})
			})
		},
		// 一站式切换tab
		yzsPage_change_action({
			commit
		}, paramsObj) {
			commit('SET_yzsPage_change_active', paramsObj)
		},
		// 登陆
		loginPage_login_action({
			commit
		}, paramsObj) {
			commit('SET_loginpage_login_status', {
				status: 'loading',
				msg: ''
			})
			return new Promise((resolve, reject) => {
				let url = Util.domain + paramsObj.type == 'login'
					? '/credit-data-xypj/xypjUser/login.json'
					: '/credit-data-xypj/xypjUser/logout.json'

				Axios.axiosInstance.post(url, paramsObj.data).then((response) => {
					// 判断操作类型
					if (paramsObj.type == 'login') {
						commit('SET_loginpage_login_status', {
							status: 'success',
							msg: '登陆成功'
						})
					} else {
						commit('SET_loginpage_login_status', {
							status: 'success',
							msg: '登出成功'
						})
					}

					resolve(response)
				}).catch((err) => {
					console.log(err);
					commit('SET_loginpage_login_status', {
						status: 'error',
						msg: '接口异常'
					})

					reject(err)
				})
			})
		},
        registerPage_saveData_action({commit},paramsObj) {
            if(paramsObj.type == 'save'){
                commit('SET_registerPage_saveData',paramsObj.data)
            }else{
                commit('SET_registerPage_changeStatus',paramsObj.data)
            }
		},
	}
};
