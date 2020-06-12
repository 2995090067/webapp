<template>
<div class="step3">
	<div class="stepBox">
		<ul>
			<li class="step"><span class="success"></span><span class="ico">1</span>创建用户</li>
			<li class="line"></li>
			<li class="step"><span class="success"></span><span class="ico">2</span>实名认证</li>
			<li class="line"></li>
			<li class="step active"><span class="success"></span><span class="ico">3</span>等待验证</li>
		</ul>
	</div>
	<div class="registerArea">
		<img :src="registerSuccess" />
		<h2>
			提交成功！<br/>个人身份正在审核中 ...
		</h2>
		<p>我们会在一到两个工作日内审核您的个人信息，确认无误之后，我们将通过发送短信通知到您输入的手机上，您即可享有信用APP的所有功能权限。</p>
		<p>您输入的手机号码可用来登录信用APP。</p>
	</div>

	<div class="registerBtn">
		<van-button class="van-button--custom" round :block="true" size="normal" @click="registerFun">完成</van-button>
	</div>
</div>
</template>

<script>
import Util from '../../libs/util'

export default {
	data() {
		return {
			registerSuccess: require('../../assets/registerSuccess.png')
		}
	},
	methods: {
		registerFun() {
			this.$router.replace({
				name: 'Login',
			})
		},
	},
	mounted: function() {},
	components: {}
}
</script>
<style lang="scss" scoped>
.step3 {
    flex: 1;
    display: flex;
    flex-direction: column;
    .registerArea {
        flex: 1;
        img {
            display: block;
            margin: 1.5rem auto 0.25rem;
            width: 1.52rem;
            height: 1.52rem;
        }
        h2 {
            margin-bottom: 0.45rem;
            line-height: 1.5;
            text-align: center;
            color: #111;
            font-size: 0.34rem;
        }
        p {
            padding: 0 0.55rem;
            // text-align: center;
            color: #aaaaaa;
            font-size: 0.26rem;
        }

    }
    .registerBtn {
        padding: 0.25rem;
    }
}
</style>
