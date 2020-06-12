<template>
<header class="header">
	<div class="head Headerlevel2">
		<span class="back" v-show="showBack != false" @click="backFun">返回</span>
		<span class="title van-ellipsis">{{title}}</span>
	</div>
</header>
</template>

<script>
import Util from '../libs/util'

export default {
	props: ['title', 'showBack', 'customBackFun'],
	data() {
		return {
			// show:this.showBack
		}
	},
	methods: {
		backFun() {
			// 自定义返回方法
			if (this.customBackFun) {
				this.customBackFun()
				return false;
			}
			if (window.history.length <= 1) {
				this.$router.push({
					name: 'HomePage'
				})
			} else {
				this.$router.back()
			}
			//上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
			//如果上面都执行了 页面都跳走了，这个也就不用管了
			// setTimeout(() => {
			// 	this.$router.push({
			// 		name: 'HomePage'
			// 	})
			// }, 500)

			// return false;
			// let _query = this.$route.query
			// let params = this.$route.params
			// //
			// if (_query.backName) { //常用返回
			// 	this.$router.push({
			// 		name: _query.backName,
			// 		params: {
			// 			id: _query.id
			// 		}
			// 	})
			// 	// } else if (params.back) { //自定义返回
			// 	// 	// console.log(params.back);
			// 	// 	this.$router.push({
			// 	// 		...params.back
			// 	// 	})
			// } else {
			// 	this.$router.push({
			// 		name: 'HomePage'
			// 	})
			// }
		}
	},
	mounted: function() {},
}
</script>
