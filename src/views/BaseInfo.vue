<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>
	<van-cell-group v-if="userInfo.type== 'C'">
		<van-cell title="企业名称" :label="userInfo.ztmc" />
		<van-cell title="统一社会信用代码" :label="userInfo.tybm" />
		<van-cell title="法定代表人" :label="userInfo.fddbr" />
		<van-cell title="法定代表人身份证号" :label="userInfo.bm" />
		<van-cell title="手机号 " :label="userInfo.sjhm " />
	</van-cell-group>
	<van-cell-group v-else>
		<van-cell title="姓名 " :label="userInfo.ztmc " />
		<van-cell title="手机号 " :label="userInfo.sjhm " />
		<van-cell title="身份证类型 " label="身份证" />
		<van-cell title="身份证号 " :label="userInfo.bm " />
	</van-cell-group>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'

export default {
	data() {
		let userInfo = Util.getsessionStorage('userInfo')
		return {
			userInfo: userInfo
		}
	},
	methods: {
		editFun() {

		}
	},
	mounted: function() {},
	components: {
		Layout,
		Headerlevel2
	}
}
</script>
<style scoped>
.van-cell>>>.van-cell__title span {
	color: #8d8d8d;
}

.van-cell>>>.van-cell__label {
	color: #333;
}
</style>
<style lang="scss" scoped>
</style>
