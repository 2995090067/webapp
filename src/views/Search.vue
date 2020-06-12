<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="searchPage">
		<Search :search="search"></Search>
		<!-- 列表组件 -->
		<div class="wukai">
			<List :list="listTab.list" :loading="listTab.loading" :finished="listTab.finished" :onLoad="onLoad">
				<template slot-scope="slotProps">
				    <van-cell v-for="(item, index) in slotProps.cList" :key="index" @click="showDetail(item)">
                        <span>{{item.title}}</span>
				    </van-cell>
				</template>
			</List>
		</div>
	</div>

	<van-popup class="linesePopup" v-model="show" position="right" :overlay="false">
		<ListDetailPage :title="current.title" :url="current.url" :customBackFun="customBackFun"></ListDetailPage>
	</van-popup>
</Layout>
</template>

<script>
import Util from '../libs/util'
import ListDetailPage from './ListDetailPage'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import Search from '../components/Search'
import List from '../components/list'

export default {
	data() {
		return {
			show: false,
			listTab: {
				refresh: false,
				loading: false,
				finished: true,
				list: [],
			},
			payload: {
				title: '',
				siteIds: 1,
				first: 0,
				count: 10
			},
			current: {
				title: '',
				url: '',
			}
		}
	},
	methods: {
		customBackFun() {
			this.show = false
		},
		filterArticleUrl(url) {
			let aa = Util.findSign.checkSign(url)
			let piex = url.substring(0, aa[2])
			let piex1 = url.substring(aa[2], url.length)
			// console.log(piex + '/wap' + piex1);
			return piex + '/wap' + piex1
		},
		showDetail(item) {
			this.show = true
			this.current.url = this.filterArticleUrl(item.url)
			this.current.title = item.title
		},
		search(keyword) {
			this.payload.title = keyword
			this.payload.first = 0
			this.listTab.list = []
			this.getData()
		},
		getData() {
			if (this.listTab.loading) {
				return false;
			}
			this.listTab.loading = true
			Util.ajax.get('/api/content/list.jspx', {
					params: this.payload
				})
				.then((response) => {
					if (response.data) {
						if (response.data.data.length == 0) {
							this.listTab.finished = true
						} else {
							this.listTab.list = this.listTab.list.concat(response.data.data)
						}
						this.payload.first = this.payload.first + this.payload.count
					}
					this.listTab.loading = false
					setTimeout(function() {
						this.listTab.refresh = false
					}.bind(this), 1000);
				}).catch((err) => {
					this.$toast('接口出错')
					this.listTab.loading = false
				})
		},
		onLoad() {
			this.getData()
		}
	},
	components: {
		ListDetailPage,
		Layout,
		Headerlevel2,
		List,
		Search
	}
}
</script>
<style lang="scss">
.searchPage {
    flex: 1;

    .wukai {
        overflow: auto;
        position: absolute;
        top: 2.05rem;
        bottom: 0;
        width: 100%;
    }
}
.linesePopup {
    width: 100%;
    height: 100%;
}
</style>
