<template>
<div class="listPage">

	<!-- 列表组件 -->
	<div class="wukai" :style="customStyle">
		<van-pull-refresh v-model="listTab.refresh" @refresh="onRefresh">
			<template slot="loading">
				<div class="refreshLoading"></div>
			</template>
			<List class="list" :list="listTab.list" :loading="listTab.loading" :finished="listTab.finished" :onLoad="onLoad">
				<template slot-scope="slotProps">
					<div class="listItem van-hairline--bottom" v-for="(item, index) in slotProps.cList" :key="index" @click="showDetail(item)">
						<span>{{item.bgmc}}</span>
						<p>{{item.addTime}}</p>

						<span class="status" style="color:#fea100" v-if="item.checkStatus == 'P'">审核中</span>
						<span class="status" style="color:#2795ee" v-else-if="item.checkStatus == 'Y'">通过</span>
						<span class="status" style="color:#d13d3d" v-else-if="item.checkStatus == 'N'">退回</span>
					</div>
				</template>
			</List>
		</van-pull-refresh>
	</div>
</div>
</template>

<script>
import Util from '../../libs/util'
import List from '../../components/list'
import Axios from '../../libs/axios'

export default {
	data() {
		let userInfo = Util.getsessionStorage('userInfo') || {}
		return {
			listTab: {
				refresh: false,
				loading: false,
				finished: false,
				list: [],
			},
			payload: {
				page: 1,
				pageSize: 10,
				checkStatus: '',
				addTimeStart: '',
				addTimeEnd: ''
			},
			customStyle: {
				height: (window.bodyHeightToRem - .9 - .3 - .56) + 'rem'
			}
		}
	},
	methods: {
		getData() {
			if (this.listTab.loading) {
				return false;
			}
			this.listTab.loading = true
			Axios.axiosInstance.post('/credit-data-xypj/checkReport/selectCheckReportInfoList.json', this.payload)
				.then((response) => {
					if (response.data) {
						if (response.data.data.length == 0) {
							this.listTab.finished = true
						} else {
							this.listTab.list = this.listTab.list.concat(response.data.data)
						}
						this.payload.page = this.payload.page + this.payload.pageSize
					}
					this.listTab.loading = false
					this.listTab.refresh = false
					// setTimeout(function() {
					// 	this.listTab.refresh = false
					// }.bind(this), 500);
				}).catch((err) => {
					this.$toast('接口出错')
					this.listTab.loading = false
				})
		},
		onRefresh() {
			this.listTab.refresh = true
			this.listTab.list = []
			this.payload.page = 1
			this.getData()
		},
		onLoad() {
			this.getData()
		},
		showDetail(item) {
			this.$router.push({
				name: 'Jdcx_detailPage',
				params: {
					id: item.id
				}
			})
		}
	},
	components: {
		List,
	}
}
</script>
<style lang="scss">
.listPage {
    position: relative;
    flex: 1;

    .wukai {
        overflow: auto;

        .list {
            .listItem {
                position: relative;
                padding: 0.2rem 1.4rem 0.2rem 0.7rem;

                background: url("../../assets/company.png") 0.2rem 0.3rem #fff no-repeat;
                background-size: 0.34rem;
                .status {
                    position: absolute;
                    top: 30%;
                    right: 0.2rem;
                    font-size: 0.28rem;
                }
                span {
                    font-size: 0.32rem;
                }
                p {
                    color: #9a9a9a;
                    font-size: 0.26rem;
                }
            }
        }
    }
}
</style>
