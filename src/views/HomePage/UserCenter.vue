<template>
<div class="userCenter">
	<div class="userInfo">
		<div class="title">
			<span>我的</span>
			<!-- <em class="msg"></em> -->
		</div>
		<div class="info" v-if="isLogin">
			<img :src="'/credit-data-xypj/xypjUser/getIcon.png?id='+userInfo.id">
			<div>
				<span class="login">{{userInfo.fddbr}} {{userInfo.type == 'C' ? '法人' : '自然人'}}</span>
				<p>{{userInfo.ztmc}}</p>
			</div>
		</div>
		<div class="info" @click="toLogin" v-else>
			<img :src="defaultUser">
			<div>
				<span class="login">登录</span>
				<p>立即登录，解锁更多信用服务！</p>
			</div>
		</div>
	</div>
	<van-cell-group class="baseInfo">
		<van-cell is-link :to="{name:'BaseInfo'}">
			<template slot="title">
                <em class="ico ico-userInfo"></em>
                <span class="custom-text">个人资料</span>
            </template>
		</van-cell>
		<van-cell is-link :to="checkToAuth()">
			<template slot="title">
                <em class="ico ico-credit"></em>
                <span class="custom-text">实名认证</span>
            </template>
			<template slot="right-icon">
				<div v-if="userInfo.type == 'C'">
					<div v-if="userInfo.shzt == 'T'">
						<van-tag type="success">通过</van-tag>
					</div>
					<div v-if="userInfo.shzt == 'U'">
						<van-tag type="danger">驳回</van-tag>
						<van-icon name="arrow" color="#969799" />
					</div>
					<div v-if="userInfo.shzt == 'S'">
						<van-tag color="#f2826a">待审核</van-tag>
					</div>
				</div>
				<div v-else-if="userInfo.type == 'P'">
					<div v-if="userInfo.shzt == 'T'">
						<van-tag type="success">通过</van-tag>
					</div>
					<div v-if="userInfo.shzt == 'U'">
						<van-tag type="danger">驳回</van-tag>
						<van-icon name="arrow" color="#969799" />
					</div>
					<div v-if="userInfo.shzt == 'S'">
						<van-tag color="#f2826a">待审核</van-tag>
					</div>
				</div>

			</template>
		</van-cell>
	</van-cell-group>
	<van-cell-group class="userAction">
		<!-- <van-cell>
			<template slot="title">
                <em class="ico ico-msgPush"></em>
                <span class="custom-text">消息推送</span>
            </template>
			<template slot="right-icon">
                <van-switch v-model="userAction.msgPush" active-color="#ff8200" />
            </template>
		</van-cell> -->
		<van-cell is-link :to="{name:'EditPass'}">
			<template slot="title">
                    <em class="ico ico-editPass"></em>
                    <span class="custom-text">修改密码</span>
                </template>
		</van-cell>
		<van-cell is-link :to="{name:'EditPhone'}">
			<template slot="title">
                <em class="ico ico-editPhone"></em>
                <span class="custom-text">更换手机号</span>
            </template>
		</van-cell>
		<van-cell is-link :to="{name:'About'}">
			<template slot="title">
                <em class="ico ico-about"></em>
                <span class="custom-text">关于我们</span>
            </template>
		</van-cell>
	</van-cell-group>
	<van-button :loading="$store.state.login.status == 'loading'" :block="true" size="normal" @click="logout" v-if="isLogin">退出登录</van-button>
</div>
</template>

<script>
import Util from '../../libs/util'
import Headerlevel2 from '../../components/Headerlevel2'
import Axios from '../../libs/axios'

export default {
	data() {
		return {
			isLogin: Util.getsessionStorage('token') || '',
			userInfo: Util.getsessionStorage('userInfo') || {},
			defaultUser: require('../../assets/defaultUser.png'),
			userAction: {
				msgPush: false
			}
		}
	},
	methods: {
		toLogin() {
			this.$router.push({
				name: 'Login'
			})
		},
		checkToAuth() {
			// 通过 审核中 不用查看
			if (this.userInfo.shzt == 'T' || this.userInfo.shzt == 'S') {
				return {
					name: '',
				}
			} else {
				return {
					name: 'Authentication',
				}
			}
		},
		logout() {
			this.$store.dispatch('loginPage_login_action', {
				type: 'logout'
			}).then(() => {
				// 移除token
				Util.removesessionStorage('token')
				// 移除用户信息
				Util.removesessionStorage('userInfo')

				// 清除登陆信息
				this.isLogin = ''
				this.userInfo = {}
			}).catch((e) => {
				console.log('登出异常');
			})
		}
	},
	mounted: function() {
		// 更新登陆用户信息 接口数据来自缓存
		// Axios.axiosInstance.post('/credit-data-xypj/xypj/gateway/getCurrentXypjUser.json')
		// 	.then((response) => {
		// 		// 设置用户信息
		// 		Util.setsessionStorage('userInfo', response.data.data)
		// 	}).catch((err) => {
		// 		console.log(err);
		// 	})
	},
	components: {
		Headerlevel2
	}
}
</script>
<style lang="scss">
.userCenter {
    overflow: auto;
    height: 100%;
    background: url("../../assets/userCenterBg.png") left top no-repeat;
    background-size: contain;

    .ico {
        display: inline-block;
        padding: 0.23rem;
        background: url("../../assets/userCenterIco.png") no-repeat;
        background-size: 0.46rem;

        &.ico-userInfo {
            background-position: 0 -2.8rem;
        }
        &.ico-credit {
            background-position: 0 -1.12rem;
        }
        &.ico-msgPush {
            background-position: 0 -1.68rem;
        }
        &.ico-editPass {
            background-position: 0 -2.24rem;
        }
        &.ico-editPhone {
            background-position: 0 0;
        }
        &.ico-about {
            background-position: 0 -.56rem;
        }
    }

    .van-cell__title {
        display: flex;
        align-items: center;
        .ico {
            margin-right: 0.15rem;
        }
    }

    .userInfo {
        margin-bottom: 0.35rem;
        height: 3rem;
        .title {
            position: relative;
            display: block;
            padding: 0.3rem 0 0;
            text-align: center;
            color: #fff;
            font-size: 0.34rem;
            .msg {
                position: absolute;
                right: 0.25rem;
                top: 0.39rem;
                padding: 0.16rem 0.22rem;
                background: url("../../assets/msg.png") no-repeat;
                background-size: 0.44rem;
            }
        }
        .info {
            display: flex;
            padding: 0.4rem 0.8rem 0;
            img {
                margin-right: 0.2rem;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            div {
                color: #fff;
                font-size: 0.26rem;
                span {
                    font-size: 0.38rem;
                }
            }
        }
    }
    .baseInfo {
        margin-bottom: 0.25rem;
    }
    .userAction {
        margin-bottom: 0.25rem;
    }
}
</style>
