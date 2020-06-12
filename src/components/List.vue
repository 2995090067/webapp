<template>
<div class="">
	<van-list v-model="cLoading" :finished="cFinished" finished-text="没有更多了" @load="onLoad">
		<slot :cList="cList">
			<van-cell v-for="(item, index) in cList" :key="index">
				<!-- 默认列表 -->
				<router-link :to="{name:'ListDetailPage',params:{id:item.id},query:{url:filterArticleUrl(item.url)}}">{{item.title}}</router-link>
			</van-cell>
		</slot>
	</van-list>
</div>
</template>

<script>
import Util from '../libs/util'
import Axios from '../libs/axios'

export default {
	props: ['loading', 'finished', 'list', 'onLoad'],
	data() {
		return {
			cList: this.list,
			cLoading: this.loading,
			cFinished: this.finished,
		}
	},
	methods: {
		filterArticleUrl(url) {
			if (url) {
				let aa = Util.findSign.checkSign(url)
				let piex = url.substring(0, aa[2])
				let piex1 = url.substring(aa[2], url.length)
				// console.log(piex + '/wap' + piex1);
				return piex + '/wap' + piex1
			}
		}
	},
	watch: {
		list(val) {
			this.cList = val
		},
		loading(val) {
			this.cLoading = val
		},
		finished(val) {
			this.cFinished = val
		}
	},
	mounted: function() {
		// console.log(this.$route);
	},
	components: {}
}
</script>
<style scoped lang="scss">
.van-cell {
    line-height: 0.5rem;
    a {
        display: block;
        font-size: 0.28rem;
    }
}
</style>
