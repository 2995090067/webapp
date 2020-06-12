<style scoped>
</style>

<template>
<div class="messBtn">
	<span v-if="resend.isShowResend" class="mess reSendMess">重新发送<i>{{resend.seconds}}</i></span>
	<label v-if="!resend.isShowResend" class="mess sendMess" @click="sendMess">点击获取验证码</label>
</div>
</template>

<script>
export default {
	data() {
		return {
			resend: {
				isShowResend: false,
				seconds: 5
			},
		}
	},
	props: ['username'],
	methods: {
		sendMess() {
			if (this.username == '') {
				this.$message({
					message: '用户名不能为空',
					type: 'error'
				})
				return
			}

			this.$store.dispatch('commonPage_sendAuthCode', {
				'username': this.username,
			}).then((res) => {
				//倒计时
				this.resend.isShowResend = true
				this.resend.seconds = 5
				let coundDown = setInterval(() => {
					this.resend.seconds = this.resend.seconds - 1
					if (this.resend.seconds < 0) {
						clearInterval(coundDown)
						this.resend.isShowResend = false
					}
				}, 1000)

				//提示信息
				this.$alert(res.msg)
			}).catch(err => {
				//发送失败
				this.$message({
					message: '验证码发送失败',
					type: 'error'
				})
			})
		}
	},
	mounted: function() {},
}
</script>
