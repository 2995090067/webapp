<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>
	<div class="yzsPage">
		<div class="customTab">
			<van-tabs v-model="$store.state.yzsPage.active" type="card" @click="changeTab">
				<van-tab :title="item.title" v-for="(item,index) in pageInfo" :key="index"></van-tab>
			</van-tabs>
		</div>

		<div class="infoSearch">
			<div class="icoSign">
				<img :src="pageInfo[$store.state.yzsPage.active].img">
				<span>{{pageInfo[$store.state.yzsPage.active].imgTitle}}</span>
			</div>
			<van-cell-group>
				<van-field v-model="pageInfo[$store.state.yzsPage.active].keyword1" :placeholder="pageInfo[$store.state.yzsPage.active].placeholder1" />
			</van-cell-group>
			<!-- <van-cell-group>
				<van-field v-model="pageInfo[$store.state.yzsPage.active].keyword2" :placeholder="pageInfo[$store.state.yzsPage.active].placeholder2" />
			</van-cell-group> -->
			<van-button :loading="loading" class="van-button--custom" :block="true" size="normal" @click="submit">查 询</van-button>
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Axios from '../libs/axios'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'

export default {
	data() {
		return {
			loading: false,
			pageInfo: [{
				img: require('../assets/frInfo.jpg'),
				title: '法人查询',
				imgTitle: '法人信用信息查询',
				placeholder1: '请输入企业名称',
				placeholder2: '请输入统一社会信用代码',
				keyword1: '',
				keyword2: '',
				type: 'frBase',
				url: '/oneSearchAct/selectFrList.jspx'
			}, 
//			{
//				img: require('../assets/zrrInfo.jpg'),
//				title: '自然人查询',
//				imgTitle: '自然人信用信息查询',
//				placeholder1: '请输入用户名',
//				placeholder2: '请输入输入身份证号码',
//				keyword1: '',
//				keyword2: '',
//				type: 'zrrBase',
//				url: '/oneSearchAct/selectZrrList.jspx'
//			}
			],

		}
	},
	methods: {
		changeTab(index, title) {
			this.$store.dispatch('yzsPage_change_action', {
				active: index
			})
		},
		submit() {
			if (!this.pageInfo[this.$store.state.yzsPage.active].keyword1) {
				this.$toast('请输入查询关键词')

				return false;
			}

			this.loading = true
			setTimeout(function() {
				this.loading = false
				this.$router.push({
					name: 'YzsListPage',
					params: {
						keyword: this.pageInfo[this.$store.state.yzsPage.active].keyword1,
					},
					query: {
						type: this.pageInfo[this.$store.state.yzsPage.active].type,
						url: this.pageInfo[this.$store.state.yzsPage.active].url,
					}
				})
			}.bind(this), 500);

			// console.log(this.pageInfo[this.$store.state.yzsPage.active]);
			// return false;
		}
	},
	mounted: function() {},
	components: {
		Layout,
		Headerlevel2,
	}
}
</script>
<style scoped lang="scss">
.yzsPage {
    background-color: #f7f7f7;

    .infoSearch {
        .icoSign {
            padding: 0.8rem 0;
            text-align: center;
            background: #fff;
            color: #0f73c5;
            font-size: 0.36rem;
            img {
                display: block;
                margin: 0 auto 0.3rem;
                width: 1.45rem;
                height: 1.4rem;
            }
        }
        input {
            display: block;
            padding-left: 0.2rem;
            width: 100%;
            height: 1rem;
            box-sizing: border-box;
            border: 0;
            border-bottom: 1px solid #ccc;
            font-size: 0.3rem;
        }
        button {
            display: block;
            margin-top: 0.6rem;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            border: 0;
            background-color: #2795ee;
            color: #fff;
            font-size: 0.34rem;
        }
    }
}
</style>
