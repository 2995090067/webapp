<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="editPage">
		<div class="editArea">
			<van-field class="van-hairline--bottom" :clearable="true" v-model="edit.sjhm" placeholder="请输入手机号" />
		</div>

		<van-button :loading="loading" class="van-button--custom" :block="true" size="normal" @click="editFun">修改</van-button>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import Axios from '../libs/axios'

export default {
	data() {
		let userInfo = Util.getsessionStorage('userInfo')
		return {
			loading: false,
			edit: {
				sjhm: userInfo.sjhm,
				id: userInfo.id
			}
		}
	},
	methods: {
		editFun() {
			if (!Util.verify.phone(this.edit.sjhm)) {
				this.$toast('请输入正确的手机号')
				return false;
			}
			this.loading = true

			let userInfo = Util.getsessionStorage('userInfo')
			Axios.axiosInstance.post('/credit-data-xypj/xypj/gateway/modifyUserInfo.json', {
					...this.edit,
					sjhm: this.edit.sjhm,
				})
				.then((response) => {
					// this.loading = false
					this.$toast.success('修改成功');
					// 更新本地缓存
					Util.setsessionStorage('userInfo', {
						...userInfo,
						sjhm: this.edit.sjhm
					})
					this.$router.push({
						name: 'UserCenter',
					})
				}).catch((err) => {
					this.loading = false
				})
		}
	},
	mounted: function() {},
	components: {
		Layout,
		Headerlevel2
	}
}
</script>
<style lang="scss" scoped>
.editPage {
    padding: 0.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
    .editArea {
        flex: 1;
    }
}
</style>
