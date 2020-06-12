<template>
<header class="header">
	<div class="head">
		<slot>
			信用APP
		</slot>
		<slot name="right"></slot>
	</div>
</header>
</template>

<script>
import Util from '../libs/util'

export default {
	data() {
		return {
			auth: Util.getsessionStorage('auth') || {}
		}
	},
	mounted: function() {
		// console.log(this.$route);
	},
}
</script>
<style scoped lang="scss">
.head {
    .right {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        // justify-content: center;
        // align-items: center;
        .search {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 0.3rem;
            height: 100%;
            color: #fff;
        }
    }
}
</style>
