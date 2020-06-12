<template>
<Layout>
	<Headerlevel2 slot="header" :title="pageInfo.title"></Headerlevel2>

	<div class="listPage">
		<ul class="commonTab">
			<li @click="changeTab(index)" :class="active == index ? 'active' :'' " v-for="(item,index) in listTab.tabInfo" :key="item.channelIds">
				{{item.title}}
			</li>
		</ul>
		<Search :search="search"></Search>
		<!-- 列表组件 -->
		<div class="wukai" :style="customStyle">
			<van-pull-refresh v-model="currentTab.refresh" @refresh="onRefresh">
				<template slot="loading">
					<div class="refreshLoading"></div>
				</template>
				<List :list="currentTab.list" :loading="currentTab.loading" :finished="currentTab.finished" :onLoad="onLoad">
					<template slot-scope="slotProps">
					    <van-cell v-for="(item, index) in slotProps.cList" :key="index">
					        <router-link v-if="currentTab.channelIds.indexOf('fr') > -1" :to="{name: 'XygsDetailPage', params: {id: item.A000002,pName:$route.params.id,active:active,key:'A000002'}}">{{item.A000001}}</router-link>
					        <router-link v-else-if="currentTab.channelIds.indexOf('zrr') > -1" :to="{name: 'XygsDetailPage', params: {id: item.B000002,pName:$route.params.id,active:active,key:'B000002'}}">{{item.B000001}}</router-link>
					    </van-cell>
					</template>
				</List>
			</van-pull-refresh>
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import Search from '../components/Search'
import List from '../components/list'
import Axios from '../libs/axios'

export default {
	data() {
		return {
			pageInfo: this.$store.getters.getPageInfo(this.$route.params.id),
			listTab: {},
			currentTab: {
				list: [],
				loading: false,
				finished: false,
				refresh: false,
			},
			active: 0,
			keyword: '',
			customStyle: {
				height: (window.bodyHeightToRem - .9 - .3 - .5 - 1.34 - .46) + 'rem'
			}
		}
	},
	computed: {

	},
	methods: {
		changeTab(index) {
			this.active = index
			this.currentTab = this.listTab.tabInfo[this.active]
			// console.log(this.currentTab);
			this.getData()
		},
		search(keyword) {
			this.keyword = keyword
			this.$store.dispatch('xygsListPage_refresh_action', {
				channelIds: this.$route.params.id,
				active: this.active,
			}).then(() => {
				this.getData()
			})
		},
		getData() {
			let _this = this
			this.currentTab = this.listTab.tabInfo[this.active]

			let url
			if (this.currentTab.channelIds.indexOf('fr') > -1) {
				url = '/oneSearchAct/selectFrList.jspx'
			} else if (this.currentTab.channelIds.indexOf('zrr') > -1) {
				url = '/oneSearchAct/selectZrrList.jspx'
			}
			this.$store.dispatch('xygsListPage_loadData_action', {
				channelIds: this.$route.params.id,
				active: this.active,
				url: url,
				payload: {
					type: this.currentTab.channelIds,
					condition: this.keyword,
				},
				ajax: {
					type: 'post'
				}
			}).catch((err) => {
				this.$toast('接口出错')
			})
		},
		onRefresh() {
			this.$store.dispatch('xygsListPage_refresh_action', {
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
			this.$store.dispatch('xygsListPage_init_action', this.pageInfo)
		}

		// 接收初始化tab数据
		this.listTab = this.$store.state.listTab[`parentTab${this.$route.params.id}`]
		this.currentTab = this.listTab.tabInfo[this.active]
	},
	components: {
		Layout,
		Headerlevel2,
		List,
		Search
	}
}
</script>
<style scoped lang="scss">
.listPage {
    flex: 1;
    padding-top: 0.3rem;
    .wukai {
        overflow: auto;
        // position: absolute;
        // top: 3.05rem;
        // bottom: 0;
        // width: 100%;
    }
}
</style>
