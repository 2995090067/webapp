<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title" :customBackFun="customBackFun"></Headerlevel2>

	<div class="register">
		<router-view></router-view>
	</div>
</Layout>
</template>

<script>
import Util from '../../libs/util'
import Layout from '../../components/Layout'
import Headerlevel2 from '../../components/Headerlevel2'

export default {
	data() {
		return {}
	},
	methods: {
		customBackFun() {
			if (this.$route.name == 'RegisterPage3') {
				this.$router.replace({
					name: 'Login'
				})
			} else if (this.$route.name == 'RegisterPage2') {
				this.$router.replace({
					name: 'RegisterPage1'
				})
			} else if (this.$route.name == 'RegisterPage1') {
				this.$router.replace({
					name: 'Register'
				})
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
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #fff;
}
</style>
