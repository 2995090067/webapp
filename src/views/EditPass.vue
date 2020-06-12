<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="editPage">
		<div class="editArea">
			<van-field :clearable="true" v-model="edit.password" placeholder="请输入原密码" />
			<van-field :clearable="true" v-model="edit.newPassword" placeholder="请输入新密码" />
			<p class="tip">8-20位，包括至少1个小写字母，1个数字，1个特殊字符<br/>特殊字符支持!@#$%^&*?_</p>
		</div>

		<van-button :loading="loading" class="van-button--custom" :block="true" size="normal" @click="editFun">修改</van-button>
	</div>
</Layout>
</template>

<script>
import md5 from 'js-md5'
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
				password: '',
				newPassword: '',
				id: userInfo.id
			}
		}
	},
	methods: {
		editFun() {
			if (this.edit.password && this.edit.newPassword) {
				// if (!Util.verify.pass(this.edit.password)) {
				// 	this.$toast('密码只可以填写8-20位的英文数字或下划线')
				// 	return false;
				// }
				if (!Util.verify.pass(this.edit.newPassword)) {
					this.$toast('密码只可以填写8-20位的英文数字或下划线')
					return false;
				}
				this.loading = true
				Axios.axiosInstance.post('/credit-data-xypj/xypj/gateway/modifyUserInfo.json', {
						...this.edit,
						password: md5(this.edit.password),
						newPassword: md5(this.edit.newPassword)
					})
					.then((response) => {
						// this.loading = false
						this.$toast('修改成功,请重新登录');

						// 移除token
						Util.removesessionStorage('token')
						// 移除用户信息
						Util.removesessionStorage('userInfo')

						this.$router.push({
							name: 'Login',
						})
					}).catch((err) => {
						this.loading = false
					})
			} else {
				this.$toast('请输入原密码和新密码')
			}
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
        .tip {
            padding: 0.25rem;
            color: #999;
            font-size: 0.24rem;
        }
    }
}
</style>
