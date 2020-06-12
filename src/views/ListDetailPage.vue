<template>
<Layout>
	<Headerlevel2 slot="header" :customBackFun="customBackFun"></Headerlevel2>

	<div class="listDetailPage">
		<!-- <h1 class="title">{{articleTitle}}</h1> -->
		<div class="content">
			<van-loading v-show="loading.show" />
			<iframe :src="articleUrl"></iframe>
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'

export default {
	props: ['customBackFun', 'url', 'title'],
	data() {
		return {
			loading: {
				show: true
			},
			articleUrl: '',
			articleTitle: '',
		}
	},
	methods: {
		toggleLoading() {
			this.loading.show = true;
			setTimeout(function() {
				this.loading.show = false;
			}.bind(this), 1000);
		}
	},
	watch: {
		url(val) {
			this.articleUrl = val
			this.toggleLoading()
		},
		// title(val) {
		// 	this.articleTitle = val
		// 	this.toggleLoading()
		// },
	},
	mounted: function() {
		this.articleUrl = this.url || this.$route.query.url
		// this.articleTitle = this.title || this.$route.params.title

		this.toggleLoading()
	},
	components: {
		Layout,
		Headerlevel2
	}
}
</script>
<style scoped lang="scss">
.listDetailPage {
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #fff;
    .title {
        padding: 0.1rem 0.5rem;
        font-size: 0.5rem;
        text-align: center;
        font-weight: normal;
        color: #333;
    }
    .content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        iframe {
            border: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }

}
</style>
