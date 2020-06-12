<template>
<Layout>
	<Headerlevel2 slot="header" :customBackFun="customBackFun"></Headerlevel2>

	<div class="listPage">
		<h5>决定文书号</h5>
		<!-- <Search :search="search"></Search> -->
		<!-- 列表组件 -->
		<div class="wukai" :style="customStyle">
			<van-pull-refresh v-model="listTab.refresh" @refresh="onRefresh">
				<template slot="loading">
					<div class="refreshLoading"></div>
				</template>
				<List :list="listTab.list" :loading="listTab.loading" :finished="listTab.finished" :onLoad="onLoad">
					<template slot-scope="slotProps">
					    <van-cell v-for="(item, index) in slotProps.cList" :key="index" @click="showDetail(item)">
                            <span>{{item[key]}}</span>
					    </van-cell>
					</template>
				</List>
			</van-pull-refresh>
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../../libs/util'
import Layout from '../../components/Layout'
import Headerlevel2 from '../../components/Headerlevel2'
import Search from '../../components/Search'
import List from '../../components/list'
import Axios from '../../libs/axios'

export default {
	props: ['tableId', 'tableType', 'showDetail', 'customBackFun'],
	data() {
		let userInfo = Util.getsessionStorage('userInfo') || {}
		return {
			userInfo: userInfo,
			listTab: {
				refresh: false,
				loading: false,
				finished: false,
				list: [],
			},
			key: this.tableType.indexOf('fr') > -1 ? 'A000001' : 'B000001',
			payload: {},
			customStyle: {
				height: (window.bodyHeightToRem - .9 - .7) + 'rem'
			}
		}
	},
	watch: {
		tableId(val) {
			this.payload = {
				page: 1,
				limit: 10,
				tableId: val,
				tybm: this.userInfo.tybm
			}
			this.onRefresh()
		},
		tableType(val) {
			this.key = val.indexOf('fr') > -1 ? 'A000001' : 'B000001'
		},
	},
	methods: {
		// search(keyword) {
		// 	this.payload.title = keyword
		// 	this.listTab.list = []
		// 	this.getData()
		// },
		getData() {
			if (!this.payload.tableId) {
				return false;
			}
			if (this.listTab.loading) {
				return false;
			}
			this.listTab.loading = true
			Axios.axiosInstance.get('/credit-data-platform/dissentProcess/selectTableList.json', {
					params: this.payload
				})
				.then((response) => {
					if (response.data) {
						if (response.data.data.length == 0) {
							this.listTab.finished = true
						} else {
							this.listTab.list = this.listTab.list.concat(response.data.data)
						}
						this.payload.page = this.payload.page + this.payload.limit
					}
					this.listTab.loading = false
					this.listTab.refresh = false
					// setTimeout(function() {
					// 	this.listTab.refresh = false
					// }.bind(this), 1000);
				}).catch((err) => {
					this.$toast('接口出错')
					this.listTab.loading = false
				})
		},
		onRefresh() {
			this.listTab.refresh = true
			this.listTab.list = []
			this.payload.page = 1
			this.getData()
		},
		onLoad() {
			this.getData()
		}
	},
	mounted: function() {
		this.payload = {
			page: 1,
			limit: 10,
			tableId: this.tableId,
			tybm: this.userInfo.tybm
		}
	},
	components: {
		Layout,
		Headerlevel2,
		List,
		Search
	}
}
</script>
<style lang="scss">
.listPage {
    flex: 1;
    h5 {
        padding-left: 0.3rem;
        line-height: 0.7rem;
        background: #e8e8e8;
        color: #333;
        font-weight: normal;
        font-size: 0.28rem;
    }

    .wukai {
        overflow: auto;
    }
}
</style>
