<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="register">
		<h5>请输入手机号码</h5>
		<ul>
			<li class="phone van-hairline--bottom">
				<input class="customInput" type="text" v-model="registerInfo.phone" placeholder="手机号">
			</li>
		</ul>

		<van-button class="van-button--custom" round :block="true" size="normal" @click="next">下一步</van-button>
		<p class="tip">我们将向您的手机发送验证短信</p>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'

export default {
	data() {
		return {
			registerInfo: {
				phone: ''
			}
		}
	},
	methods: {
		next() {
			if (Util.verify.phone(this.registerInfo.phone)) {
				this.$router.push({
					name: 'register_step2',
					query: {
						phone: this.registerInfo.phone
					}
				})
			} else {
				this.$toast('请输入正确的手机号');
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
.register {
    padding: 0.45rem;
    height: 100%;
    background: #fff;
    h5 {
        margin-bottom: 0.7rem;
        font-weight: normal;
        font-size: 0.32rem;
    }
    ul {
        margin-bottom: 1.3rem;
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
        }
    }
    .tip {
        padding: 0.25rem;
        text-align: center;
        color: #999;
        font-size: 0.24rem;
    }
}
</style>
