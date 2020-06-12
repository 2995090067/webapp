<template>
<div class="login">
	<div class="loginBox">
		<h1 class="loginLogo"></h1>
		<div class="loginArea">
			<ul class="loginInputBox">
				<li class="van-hairline--bottom">
					<input class="customInput" type="text" v-model="loginInfo.username" :placeholder="loginInfo.placeholder1" @focus="loginInfo.placeholder1 = ''" @blur="blurFocus('username')">
				</li>
				<li class="van-hairline--bottom">
					<input class="customInput" type="password" v-model="loginInfo.password" :placeholder="loginInfo.placeholder2" @focus="
					loginInfo.placeholder2 = '';loginInfo.password = ''" @blur="blurFocus('password')">
				</li>
			</ul>

			<van-button class="van-button--custom" :loading="$store.state.login.status == 'loading'" round :block="true" size="normal" @click="login">登录</van-button>
			<p class="toggle" @click="toggleType">{{arr[index].text}}</p>
		</div>
	</div>

	<div class="other">
		<!-- <router-link class="FindPass" :to="{'name': 'FindPass'}">忘记密码</router-link>
		| -->
		<router-link class="Register" :to="{'name': 'Register'}">立即注册</router-link>
	</div>
</div>
</template>

<script>
import md5 from 'js-md5'
import Util from '../libs/util'

export default {
	data() {
		let arr = [{
			text: '切换个人用户',
			type: 'C',
			placeholder1: '请输入企业帐号',
			placeholder2: '请输入密码'
		}, {
			text: '切换企业用户',
			type: 'P',
			placeholder1: '请输入用户名',
			placeholder2: '请输入密码'
		}]
		return {
			index: 0,
			arr: arr,
			loginInfo: {
				username: '',
				password: '',
				placeholder1: arr[0].placeholder1,
				placeholder2: arr[0].placeholder2,
				type: arr[0].type
			}
		}
	},
	methods: {
		//判断登录
		isLogin() {
			let auth = Util.getsessionStorage('auth')
			if (auth) {
				this.$router.push({
					'name': 'UserCenter'
				})
			}
		},
		blurFocus(type) {
			if (type == 'username') {
				this.loginInfo.placeholder1 = this.loginInfo.username == '' ? this.arr[this.index].placeholder1 : ''
			} else {
				this.loginInfo.placeholder2 = this.loginInfo.password == '' ? this.arr[this.index].placeholder2 : ''
			}
		},
		toggleType() {
			this.index = (this.index + 1) % 2;
			this.loginInfo.type = this.arr[this.index].type
			this.loginInfo.username = ''
			this.loginInfo.password = ''
			this.loginInfo.placeholder1 = this.arr[this.index].placeholder1
			this.loginInfo.placeholder2 = this.arr[this.index].placeholder2
		},
		//登录
		login() {
			this.$store.dispatch('loginPage_login_action', {
				data: {
					...this.loginInfo,
					password: md5(this.loginInfo.password)
				},
				type: 'login'
			}).then((response) => {
				// 设置token
				Util.setsessionStorage('token', response.data.data['XYPJ-Gateway-Token'])
				// 设置用户信息
				Util.setsessionStorage('userInfo', response.data.data)

				// 跳转
				this.$router.push({
					'name': 'UserCenter'
				})
			}).catch(() => {
				// 移除token
				Util.removesessionStorage('token')
				// 移除用户信息
				Util.removesessionStorage('userInfo')
			})
		}
	},
	beforeMount: function() {
		this.isLogin()
	},
	mounted: function() {},
	components: {}
}
</script>
<style lang="scss" scoped>
.login {
    position: relative;
    height: 100%;
    background: url("../assets/loginBg.png") no-repeat;
    background-size: cover;
    .loginBox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-70%);
        padding: 0 0.45rem;
        width: 100%;

        .loginLogo {
            height: 3.7rem;
            background: url("../assets/loginLogo.png") center no-repeat;
            background-size: 2rem;
        }
        .loginArea {
            .loginInputBox {
                margin-bottom: 0.9rem;
                li {
                    margin-bottom: 0.15rem;
                    &:after {
                        border-color: #949ded;
                    }
                    input {
                        text-align: center;
                    }
                }
            }
        }
        .toggle {
            padding-top: 0.2rem;
            text-align: center;
            color: #fff;
            font-size: 0.24rem;
        }
    }
    .other {
        position: absolute;
        left: 50%;
        bottom: 0.6rem;
        transform: translate(-50%,0);
        color: #fff;
        font-size: 0.3rem;
        a {
            padding: 0 0.25rem;
            color: #fff;
            &:active {
                color: #2795ee;
            }
        }
    }
}
</style>
