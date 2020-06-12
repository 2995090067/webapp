<template>
<Layout>
	<Headerlevel2 slot="header" :title="pageInfo.title"></Headerlevel2>
	<div class="listPage">
		<!-- 列表组件 -->
		<div class="wukai" :style="customStyle">
			<van-pull-refresh v-model="thisList.refresh" @refresh="onRefresh">
				<template slot="loading">
					<div class="refreshLoading"></div>
				</template>
				<List :list="thisList.list" :loading="thisList.loading" :finished="thisList.finished" :onLoad="onLoad"></List>
			</van-pull-refresh>
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import List from '../components/list'

export default {
	data() {
		return {
			pageInfo: this.$store.getters.getPageInfo(this.$route.params.id),
			listTab: {},
			thisList: {
				refresh: false
			},
			customStyle: {
				height: (window.bodyHeightToRem - .9) + 'rem'
			}
		}
	},
	computed: {

	},
	methods: {
		getData() {
			this.$store.dispatch('listPage_loadData_action', {
				channelIds: this.$route.params.id,
				active: this.listTab.active,
				url: '/api/content/list.jspx',
				payload: {
					channelIds: this.pageInfo.channelIds,
				}
			}).catch((err) => {
				this.$toast('接口出错')
			})
		},
		onRefresh() {
			this.$store.dispatch('listPage_refresh_action', {
				channelIds: this.$route.params.id,
				active: this.listTab.active,
			}).then(() => {
				this.getData()
			})
		},
		onLoad() {
			this.getData()
		}
	},
	mounted: function() {
		// 初始化tab数据
		if (!this.$store.state.listTab[`parentTab${this.$route.params.id}`]) {
			this.$store.dispatch('listPage_init_action', this.pageInfo)
		}

		// 接收初始化tab数据
		this.listTab = this.$store.state.listTab[`parentTab${this.$route.params.id}`]
		this.thisList = this.listTab.tabInfo[this.listTab.active]
	},
	components: {
		Layout,
		Headerlevel2,
		List
	}
}
</script>
<style scoped lang="scss">
.listPage {
    flex: 1;

    .wukai {
        overflow: auto;
    }
}
</style>
