<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="about">
		信用APP是一款综合信用一站式查询、信用公示、信用承诺的移动系统服务软件，提供异议处理和信用核查等服务，实时掌握最新信用动态，体验最新在线服务大厅。
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

	},
	mounted: function() {},
	components: {
		Layout,
		Headerlevel2
	}
}
</script>
<style lang="scss" scoped>
.about {
    flex: 1;
    padding: 0.2rem;
    background-color: #fff;
    font-size: 0.34rem;
}
</style>
