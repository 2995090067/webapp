<template>
<div class="layout">
	<Headerlevel2 slot="header" title="核查报告" :customBackFun="customBackFun"></Headerlevel2>

	<div class="customTab">
		<van-tabs v-model="active" type="card" @click="changeTab">
			<van-tab :title="item.title" v-for="(item,index) in hcbgPage" :key="index"></van-tab>
		</van-tabs>
	</div>

	<router-view></router-view>
</div>
</template>

<script>
import Util from '../../libs/util'
import Axios from '../../libs/axios'
import Layout from '../../components/Layout'
import Headerlevel2 from '../../components/Headerlevel2'

export default {
	data() {
		return {
			active: 0,
			hcbgPage: [{
					title: '在线申请',
					name: 'ZxsqPage'
				},
				{
					title: '进度查询',
					name: 'JdcxPage'
				}
			],
			currentTab: {}
		}
	},
	methods: {
		customBackFun() {
			this.$router.push({
				name: 'SecondPage'
			})
		},
		changeTab(index, title) {
			this.currentTab = this.hcbgPage[index]
			this.$router.push({
				name: this.currentTab.name,
				query: this.$route.query
			})
		}
	},
	mounted: function() {
		this.currentTab = this.hcbgPage[0]
	},
	components: {
		Layout,
		Headerlevel2,
	}
}
</script>
<style scoped lang="scss">

</style>
