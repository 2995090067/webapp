<template>
<Layout>
	<Headerlevel2 slot="header" :title="this.$route.meta.title"></Headerlevel2>
	<div class="detailPage">
		<div class="baseInfo">
			<div class="info">
				<h1>{{bodyInfo.qymc}}</h1>
				<p v-if="bodyInfo.status == 'Y'">已通过</p>
				<p v-else-if="bodyInfo.status == 'N'">已驳回</p>
			</div>

			<!-- <van-field label="审批编号" :value="headInfo.accessKey" disabled /> -->
			<van-field label="审批时间" :value="headInfo.finishTime" disabled />
			<van-field label="审批原因" :value="headInfo.remark" disabled />
			<div :class="status"></div>
		</div>

		<div>
			<van-cell title="企业名称" :label="bodyInfo.qymc" />
			<van-cell title="统一社会信用代码" :label="bodyInfo.tyshxydm" />
			<van-cell title="法定代表人" :label="bodyInfo.fddbr" />
			<van-cell title="异议类型" :label="bodyInfo.tableName" />
			<!-- <van-cell title="联系人姓名" label="{{bodyInfo.fddbr}}" /> -->
			<!-- <van-cell title="联系人电话" label="{{bodyInfo.qymc}}" /> -->
			<!-- <van-cell title="有效证件类型" label="{{bodyInfo.qymc}}" /> -->
			<!-- <van-cell title="有效证件号码" label="{{bodyInfo.qymc}}" /> -->
			<!-- <van-cell title="异议主题" label="{{bodyInfo.qymc}}" /> -->
			<van-cell title="异议内容" :label="bodyInfo.yynr" />
			<!-- <van-cell>
				<template slot="title">
					<span>上传文件</span>
    				<div class="van-cell__label">
    					销售电子计算机及软硬件设备
    				</div>
				</template>
			</van-cell> -->
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../../libs/util'
import Layout from '../../components/Layout'
import Headerlevel2 from '../../components/Headerlevel2'
import Axios from '../../libs/axios'

export default {
	data() {
		return {
			headInfo: {},
			bodyInfo: {},
			status: '',
			payload: {
				key: this.$route.params.key,
				id: this.$route.params.id
			},
			yyTypes: [{
				name: '法人行政许可',
				value: '210000'
			}, {
				name: '法人行政处罚',
				value: '210001'
			}, {
				name: '法人红名单',
				value: '210004'
			}, {
				name: '法人黑名单',
				value: '210006'
			}, {
				name: '自然人行政处罚',
				value: '210002'
			}, {
				name: '自然人行政许可',
				value: '210003'
			}, {
				name: '自然人红名单',
				value: '210005'
			}, {
				name: '自然人黑名单',
				value: '210007'
			}]
		}
	},
	computed: {

	},
	methods: {
		getDetail() {
			Axios.axiosInstance.post('/credit-data-platform/dissentProcess/selectHistoryDetail.json', this.payload)
				.then((response) => {
					if (response.data) {
						this.headInfo = response.data.data.head

						this.bodyInfo = response.data.data.body

						this.yyTypes.map((item) => {
							if (item.value == this.bodyInfo.tableId) {
								this.bodyInfo.tableName = item.name
							}
						})
						this.headInfo.finishTime = this.headInfo.finishTime && new Date(this.headInfo.finishTime).format('yyyy-MM-dd')
						if (this.bodyInfo.status == 'Y') {
							this.status = 'status pass'

							// 审批时间
							// this.headInfo.finishTime = this.headInfo.finishTime && new Date(this.headInfo.finishTime).format('yyyy-MM-dd')
						} else if (this.bodyInfo.status == 'N') {
							this.status = 'status reject'
							// 不显示审批时间及备注
							// this.headInfo.finishTime = '--'
							// this.headInfo.remark = '--'
						}
					}
				})
		}
	},
	mounted: function() {
		this.getDetail()
	},
	components: {
		Layout,
		Headerlevel2,
	}
}
</script>
<style scoped>
.van-cell>>>.van-cell__title span {
	color: #8d8d8d;
}

.van-cell>>>.van-cell__label {
	color: #333;
}
</style>
<style scoped lang="scss">
.detailPage {
    overflow: auto;
    height: 100%;
    padding-bottom: 0.2rem;
    .van-cell {
        padding: 0.1rem 0.3rem;
    }
    .baseInfo {
        position: relative;
        margin-bottom: 0.25rem;
        background: #fff;
        .info {
            padding: 0.15rem 0.6rem;
            background: url("../../assets/company.png") #fff 0.1rem 0.25rem/.34rem no-repeat;
            font-size: 0.26rem;
            h1 {
                font-size: 0.36rem;
            }
            p {
                color: #8b8b8b;
            }
        }
        .status {
            position: absolute;
            right: 0.2rem;
            top: 0.15rem;
            width: 2.17rem;
            height: 1.81rem;
            background-repeat: no-repeat;
            background-size: 2.17rem;
            &.pass {
                background-image: url("../../assets/statusPass.png");
            }
            &.reject {
                background-image: url("../../assets/statusReject.png");
            }
        }
    }
}
</style>
