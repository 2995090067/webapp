<template>
<div class="step1Page">
	<div class="stepBox">
		<ul>
			<li class="step active"><span class="success"></span><span class="ico">1</span>创建用户</li>
			<li class="line"></li>
			<li class="step"><span class="success"></span><span class="ico">2</span>实名认证</li>
			<li class="line"></li>
			<li class="step"><span class="success"></span><span class="ico">3</span>等待验证</li>
		</ul>
	</div>
	<div class="registerArea">
		<van-field @keyup="showNext" v-model="registerInfo.payload.phone" clearable placeholder="手机号" />
		<!-- <van-field v-model="registerInfo.code" clearable placeholder="验证码">
				<van-button class="sendSms" slot="button" size="small" :loading="sendSms.loading" :disabled="sendSms.disabled" @click="sendSmsFun">获取验证码</van-button>
			</van-field> -->
		<van-field type="password" @keyup="showNext" v-model="registerInfo.payload.password" clearable placeholder="登录密码" />
		<p class="tip">8-20位，包括至少1个小写字母，1个数字，1个特殊字符<br/>特殊字符支持!@#$%^&*?_</p>
	</div>
	<div class="registerBtn">
		<van-button class="van-button--custom" round :disabled="registerInfo.step1.disabled" :block="true" size="normal" @click="next">下一步</van-button>
	</div>
</div>
</template>

<script>
import Util from '../../libs/util'

export default {
	data() {
		return {
			sendSms: {
				disabled: true,
				loading: false,
				countTime: 60
			},
			registerInfo: this.$store.state.register
		}
	},
	methods: {
		showNext() {
			// 保存信息
			this.$store.dispatch('registerPage_saveData_action', {
				type: 'save',
				data: this.registerInfo.payload
			})
			// 禁止点击
			this.$store.dispatch('registerPage_saveData_action', {
				type: 'changeStatus',
				data: {
					step: 'step1',
					value: true
				}
			})
			if (!Util.verify.phone(this.registerInfo.payload.phone)) {
				return false;
			}
			if (!Util.verify.pass(this.registerInfo.payload.password)) {
				return false;
			}
			// 允许点击
			this.$store.dispatch('registerPage_saveData_action', {
				type: 'changeStatus',
				data: {
					step: 'step1',
					value: false
				}
			})
		},
		// sendSmsFun() {
		// 	this.sendSms.loading = true
		// 	setTimeout(function() {
		// 		this.sendSms.loading = false
		// 		this.sendSms.disabled = true
		// 		// setInterval(function() {
		// 		// 	this.countTime = this.countTime - 1
		// 		// }.bind(this), 1000);
		// 	}.bind(this), 1000);
		// },
		next() {
			this.$router.replace({
				name: 'RegisterPage2',
				query: {
					type: this.$route.query.type
				}
			})
		},
	},
	mounted: function() {},
	components: {}
}
</script>
<style lang="scss" scoped>
.step1Page {
    flex: 1;
    display: flex;
    flex-direction: column;
    .registerArea {
        flex: 1;
        // .sendSms {
        //     color: #2795ee;
        //     background: none;
        //     border: none;
        //     // font-size: 0.26rem;
        // }
        .tip {
            padding: 0.25rem;
            color: #999;
            font-size: 0.24rem;
        }
    }
    .registerBtn {
        padding: 0.25rem;
    }
}
</style>
