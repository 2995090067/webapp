<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="register">
		<p class="tip">短信验证码已发送至{{$route.query.phone}}，请查收</p>
		<ul>
			<li class="code van-hairline--bottom">
				<input class="customInput" type="text" v-model="registerInfo.phone" placeholder="验证码">
			</li>
			<li class="code van-hairline--bottom">
				<input class="customInput" type="text" v-model="registerInfo.password" placeholder="登录密码">
			</li>
		</ul>
		<p class="tip" style="text-align:left;">8-16位，数字、字母或数字字母组合</p>
		<div class="linese">
			<van-checkbox v-model="linese.checked">

			</van-checkbox>
			我已阅读并同意<span @click="show">《注册服务协议》</span>
		</div>

		<van-button class="van-button--custom" round :block="true" size="normal" @click="register">注 册</van-button>
	</div>

	<van-popup class="linesePopup" v-model="linese.show" position="right">
		<Linese></Linese>
	</van-popup>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import Linese from '../components/Linese'

export default {
	data() {
		return {
			registerInfo: {
				code: '',
				password: '',
			},
			linese: {
				checked: false,
				show: false
			},
		}
	},
	methods: {
		show() {
			this.linese.show = true
		},
		register() {
			if (this.linese.checked && this.registerInfo.code && this.registerInfo.password) {
				const loading = this.$loading({
					lock: true,
					text: '加载中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.5)'
				});
				this.$store.dispatch('registerPage_register', this.ruleForm).then(() => {
					loading.close();
					if (this.$store.state.register.status == 'success') {
						this.$alert('注册成功了', '提示', {
							confirmButtonText: '确定',
							callback: action => {

							}
						});
					}
				})
			}
		}
	},
	mounted: function() {},
	components: {
		Layout,
		Headerlevel2,
		Linese
	}
}
</script>
<style lang="scss" scoped>
.register {
    padding: 0.45rem;
    height: 100%;
    background: #fff;
    ul {
        li {
            &:after {
                border-color: #ccc;
            }
            .customInput {
                height: 0.9rem;
                color: #666;
                font-size: 0.3rem;
                &::placeholder {
                    color: #ccc;
                }
            }
            &:first-child {
                margin-bottom: 0.4rem;
            }
        }
    }
    .tip {
        padding: 0.25rem;
        text-align: center;
        color: #999;
        font-size: 0.24rem;
    }
    .linese {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.1rem 0 0.2rem;
        text-align: center;
        font-size: 0.28rem;
        span {
            color: #2795ee;
        }
        .van-checkbox {
            margin-right: 0.2rem;
        }
    }
}
.linesePopup {
    width: 80%;
    height: 100%;
    padding: 0.4rem;
}
// .popupPage {
//     width: 5rem;
//     height: 100%;
//     // position: absolute;
//     // left: 0;
//     // right: 0;
//     // bottom: 0;
//     // top: 0;
// }
</style>
