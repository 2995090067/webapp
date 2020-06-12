<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="RegisterType">
		<p>请选择注册类型</p>
		<ul>
			<li class="van-hairline--bottom">
				<h5 class="van-hairline--bottom">自然人</h5>
				<div class="type ">
					<van-button class="van-button--custom " :block="true " size="normal " @click="RegisterTypeFun( 'zrr') ">个人注册>></van-button>
				</div>
			</li>
			<li>
				<h5 class="van-hairline--bottom">企业法人</h5>
				<div class="type ">
					<van-button class="van-button--custom " :block="true " size="normal " @click="RegisterTypeFun( 'fr') ">企业法人注册>></van-button>
				</div>
			</li>
		</ul>
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

		}
	},
	methods: {
		RegisterTypeFun(type) {
			this.$router.push({
				name: 'RegisterPage',
				query: {
					type: type,
				}
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
.RegisterType {
    p {
        padding: 0.15rem 0 0.15rem 0.4rem;
        background-color: #e8e8e8;
        font-size: 0.28rem;
    }
    .van-hairline--bottom {
        border-color: #e6e6e6;
    }
    ul {
        li {
            padding: 0 0 0.6rem;
            background-color: #fff;
            // border-bottom: 1px solid #e6e6e6;
            h5 {
                padding: 0.2rem 0 0.2rem 0.4rem;
                background-color: #f7f7f7;
                // border-bottom: 1px solid #e6e6e6;
                font-size: 0.32rem;
            }
            .type {
                padding: 3.4rem 0.45rem 0;
                background-size: 2.46rem;
                background-position: center 0.55rem;
                background-repeat: no-repeat;
            }
            &:first-child {
                .type {
                    background-image: url("../assets/Authentication_zrr.png");
                }

            }
            &:last-child {
                .type {
                    background-image: url("../assets/Authentication_fr.png");
                }
            }
        }
    }
}
</style>
