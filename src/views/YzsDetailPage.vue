<template>
<Layout>
	<Headerlevel2 slot="header" title="一站式查询详情" :customBackFun="customBackFun"></Headerlevel2>
	<van-tabs color="#2795ee" v-model="active" @change="tabChange">
		<van-tab :title="item.text" v-for="(item, index) in tabInfo" :key="index">
			<van-cell v-for="(item, index) in detail[active]" :key="index" :title="item.name" :label="item.value" />
		</van-tab>
	</van-tabs>

</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import Axios from '../libs/axios'

export default {
	props: ['tybm', 'type', 'customBackFun'],
	data() {
		return {
			cTybm: this.tybm,
			cType: this.type,
			detail: [],
			active: 0,
			tabInfo: []
		}
	},
	methods: {
		tabChange(index) {
			this.getData(this.tabInfo[index])
		},
		getData(params) {
			if (this.detail[this.active]) {
				return false;
			}
			this.$toast.loading({
				message: '加载中...'
			});
			let url;
			if (this.cType.indexOf('fr') > -1) {
				url = '/oneSearchAct/selectFrDetail.jspx'
			} else {
				url = '/oneSearchAct/selectZrrDetail.jspx'
			}
			Axios.axiosInstance.get(url, {
					params: {
						tybm: this.cTybm,
						type: params.value,
					}
				})
				.then((response) => {
					setTimeout(function() {
						this.$toast.clear()
					}.bind(this), 500);
					if (response.data) {
						let data = response.data.data[0] || {}
						let tempData = []
						if (this.active == 0) {
							if (this.cType.indexOf('fr') > -1) {
								tempData = [{
										name: '企业名称',
										value: data.A000001 || '--'
									},
									{
										name: '统一社会信用代码',
										value: data.A000002 || '--'
									},
									{
										name: '工商登记码',
										value: data.A000003 || '--'
									},
									{
										name: '组织机构代码',
										value: data.A000004 || '--'
									},
									{
										name: '税务登记号',
										value: data.A000005 || '--'
									}
								]
							} else {
								tempData = [{
										name: '姓名',
										value: data.B000001 || '--'
									},
									{
										name: '居民身份证号',
										value: data.B000002 || '--'
									},
									{
										name: '住址',
										value: data.B000003 || '--'
									},
								]
							}
						} else if (this.active == 1) {
							if (this.cType.indexOf('fr') > -1) {
								tempData = [{
										name: '法定代表人姓名',
										value: data.XK_FDDB || '--'
									},
									{
										name: '行政许可决定文书号',
										value: data.XK_WSH || '--'
									},
									{
										name: '地方编码',
										value: data.DFBM || '--'
									},
									{
										name: '审批类别',
										value: data.XK_XKLB || '--'
									},
									{
										name: '许可机关',
										value: data.XK_XKJG || '--'
									},
									{
										name: '许可内容',
										value: data.XK_NR || '--'
									},
									{
										name: '许可决定日期',
										value: (data.XK_JDRQ && new Date(data.XK_JDRQ).format('yyyy-MM-dd')) || '--'
									},
									{
										name: '许可截止期',
										value: (data.XK_YXQZI && new Date(data.XK_YXQZI).format('yyyy-MM-dd')) || '--'
									},
									{
										name: '数据更新时间',
										value: (data.sjgxsjc && new Date(data.sjgxsjc).format('yyyy-MM-dd')) || '--'
									}
								]
							} else {
								tempData = [{
										name: '姓名',
										value: data.B000001 || '--'
									},
									{
										name: '行政许可决定文书号',
										value: data.XK_WSH || '--'
									},
									{
										name: '许可决定日期',
										value: (data.XK_JDRQ && new Date(data.XK_JDRQ).format('yyyy-MM-dd')) || '--'
									}, {
										name: '审批类别',
										value: data.XK_XKLB || '--'
									}, {
										name: '许可机关',
										value: data.XK_XKJG || '--'
									}, {
										name: '许可截止期',
										value: (data.XK_YXQZI && new Date(data.XK_YXQZI).format('yyyy-MM-dd')) || '--'
									}, {
										name: '许可内容',
										value: data.XK_NR || '--'
									},
								]
							}
						} else if (this.active == 2) {
							if (this.cType.indexOf('fr') > -1) {
								tempData = [{
										name: '法定代表人姓名',
										value: data.CF_FDDB || '--'
									},
									{
										name: '行政处罚决定文书号',
										value: data.CF_WSH || '--'
									},
									{
										name: '违法事实',
										value: data.CF_SY || '--'
									},
									{
										name: '处罚类别',
										value: data.CF_CFLB || '--'
									},
									{
										name: '处罚机关',
										value: data.CF_CFJG || '--'
									},
									{
										name: '处罚内容',
										value: data.CF_NR || '--'
									},
									{
										name: '处罚决定日期',
										value: (data.CF_JDRQ && new Date(data.CF_JDRQ).format("yyyy-MM-dd")) || '--'
									},
									{
										name: '处罚依据',
										value: (data.CF_YJ && new Date(data.CF_YJ).format("yyyy-MM-dd")) || '--'
									},
									{
										name: '数据更新时间',
										value: (data.sjgxsjc && new Date(data.sjgxsjc).format("yyyy-MM-dd")) || '--'
									}
								]
							} else {
								tempData = [{
										name: '姓名',
										value: data.B000001 || '--'
									},
									{
										name: '违法事实',
										value: data.CF_SY || '--'
									},
									{
										name: '处罚类别',
										value: data.CF_CFLB || '--'
									},
									{
										name: '处罚机关',
										value: data.CF_CFJG || '--'
									},
									{
										name: '处罚内容',
										value: data.CF_NR || '--'
									},
									{
										name: '处罚决定日期',
										value: (data.CF_JDRQ && new Date(data.CF_JDRQ).format('yyyy-MM-dd')) || '--'
									}, {
										name: '处罚依据',
										value: data.CF_YJ || '--'
									},
								]
							}
						} else if (this.active == 3) {
							if (this.cType.indexOf('fr') > -1) {
								tempData = [{
										name: '认定单位',
										value: data.IDENTIFICATION_DEPT || '--'
									},
									{
										name: '认定文号',
										value: data.IDENTIFICATION_NO || '--'
									},
									{
										name: '住址',
										value: data.B000003 || '--'
									},
									{
										name: '注册地址',
										value: data.A000006 || '--'
									},
									{
										name: '认定时间',
										value: (data.IDENTIFICATION_DATE && new Date(data.IDENTIFICATION_DATE).format(
											"yyyy-MM-dd")) || '--'
									},
								]
							} else {
								tempData = [{
										name: '认定单位',
										value: data.IDENTIFICATION_DEPT || '--'
									},
									{
										name: '认定文号',
										value: data.IDENTIFICATION_NO || '--'
									},
									{
										name: '住址',
										value: data.B000003 || '--'
									},
									{
										name: '认定时间',
										value: (data.IDENTIFICATION_DATE && new Date(data.IDENTIFICATION_DATE).format('yyyy-MM-dd')) || '--'
									},
								]
							}
						} else if (this.active == 4) {
							if (this.cType.indexOf('fr') > -1) {
								tempData = [{
										name: '执行单位',
										value: data.EXECUTE_DEPT || '--'
									},
									{
										name: '执行依据文号',
										value: data.EXECUTE_REFRENCE_NO || '--'
									},
									{
										name: '注册地址',
										value: data.A000006 || '--'
									},
									{
										name: '立案时间',
										value: (data.REGISTER_DATE && new Date(data.REGISTER_DATE).format('yyyy-MM-dd')) || '--'
									},
								]
							} else {
								tempData = [{
										name: '执行单位',
										value: data.EXECUTE_DEPT || '--'
									},
									{
										name: '执行依据文号',
										value: data.EXECUTE_REFRENCE_NO || '--'
									},
									{
										name: '注册地址',
										value: data.B000003 || '--'
									},
									{
										name: '立案时间',
										value: (data.REGISTER_DATE && new Date(data.REGISTER_DATE).format('yyyy-MM-dd')) || '--'
									},
								]
							}
						} else if (this.active == 5) {
							// tempData = [{
							// 		name: '企业名称',
							// 		value: data.qymc || '--'
							// 	},
							// 	{
							// 		name: '法定代表',
							// 		value: data.fddb || '--'
							// 	},
							// 	{
							// 		name: '统一社会代码',
							// 		value: data.tyshdm || '--'
							// 	},
							// 	{
							// 		name: '企业资质名称',
							// 		value: data.qyzzmc || '--'
							// 	},
							// 	{
							// 		name: '发证机关',
							// 		value: data.fzjg || '--'
							// 	},
							// 	{
							// 		name: '资质证书编号',
							// 		value: data.zzzsbm || '--'
							// 	},
							// 	{
							// 		name: '资质等级',
							// 		value: data.zzdj || '--'
							// 	},
							// 	{
							// 		name: '发证时间',
							// 		value: (data.fztime && data.fztime.substring(0, 10)) || '--'
							// 	},
							// 	{
							// 		name: '证书有效期',
							// 		value: (data.zsyxq && data.zsyxq.substring(0, 10)) || '--'
							// 	},
							// 	{
							// 		name: '资质等级',
							// 		value: data.zzdj || '--'
							// 	},
							// ]
						}
						this.detail.splice(this.active, 1, tempData)
					} else {
						this.$toast('无数据')
					}
				}).catch((err) => {
					// console.log(err);
					this.$toast.clear()
					this.$toast('接口出错')
				})
		},
		getTableInfo() {
			return [{
				text: '基本信息',
				value: this.cType.indexOf('fr') > -1 ? 'frBase' : 'zrrBase'
			}, {
				text: '行政许可',
				value: this.cType.indexOf('fr') > -1 ? 'frXk' : 'zrrXk'
			}, {
				text: '行政处罚',
				value: this.cType.indexOf('fr') > -1 ? 'frCf' : 'zrrCf'
			}, {
				text: '红名单',
				value: this.cType.indexOf('fr') > -1 ? 'frHon' : 'zrrHon'
			}, {
				text: '黑名单',
				value: this.cType.indexOf('fr') > -1 ? 'frHei' : 'zrrHei'
				// }, {
				// 	text: '自报数据',
				// 	value: ''
			}]
		}
	},
	watch: {
		tybm(val) {
			this.cTybm = val
			this.active = 0
			this.getData(this.tabInfo[this.active])
			this.tabInfo = this.getTableInfo()
		},
		type(val) {
			this.cType = val
		},
	},
	mounted: function() {
		this.tabInfo = this.getTableInfo()
		this.getData(this.tabInfo[this.active])
	},
	components: {
		Layout,
		Headerlevel2,
	}
}
</script>
<style lang="scss">
.searchPage {
    flex: 1;
}
</style>
