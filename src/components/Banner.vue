<style scoped lang="scss">
// .banner {
//     height: 3rem;
// }
</style>
<template>
<div class="banner">
	<van-swipe :autoplay="5000">
		<van-swipe-item v-for="(item, index) in banner" :key="index">
			<img :src="item.src" />
		</van-swipe-item>
	</van-swipe>
</div>
</template>

<script>
import Util from '../libs/util'

export default {
	data() {
		return {
			banner: [{
					'src': require('../assets/banner2.jpg'),
					'id': 1
				},
				{
					'src': require('../assets/banner3.jpg'),
					'id': 2
				},
				{
					'src': require('../assets/banner4.jpg'),
					'id': 3
				}
			]
		}
	},
	components: {}
}
</script>
