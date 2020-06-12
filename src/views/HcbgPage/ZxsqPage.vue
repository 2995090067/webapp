<template>
<div class="zxsqPage">
	<h5>信用主体信息</h5>
	<van-cell-group>
		<van-field v-model="form.ztmc" clearable placeholder="企业名称" />
		<van-field v-model="form.tyshxydm" clearable placeholder="统一社会信用代码" />
		<van-field v-model="form.tybm" clearable placeholder="统一编码" />
		<van-field v-model="form.fddbr" clearable placeholder="法定代表人姓名" />
	</van-cell-group>
	<h5>基本信息</h5>
	<van-cell-group style="margin-bottom:1.2rem;">
		<van-field v-model="form.lxr" clearable placeholder="联系人姓名" />
		<van-field v-model="form.lxrdh" clearable placeholder="联系电话" />
		<van-field v-model="form.yx" clearable placeholder="邮箱地址" />
		<van-field v-model="form.purposeText" placeholder="报告用途" @click-icon="report.show = true">
			<span slot="icon">
				<div class="fieldFormat">
					请选择<van-icon name="arrow" />
				</div>
			</span>
		</van-field>
	</van-cell-group>
	<van-button class="van-button--custom" :block="true" size="normal" @click="submit">提交</van-button>

	<van-actionsheet title="支持以下报告用途" v-model="report.show">
		<van-picker :columns="modifyHcetList" @change="actionsheetChange" />
	</van-actionsheet>
</div>
</template>

<script>
import Util from '../../libs/util'
import Axios from '../../libs/axios'

export default {
	data() {
		let userInfo = Util.getsessionStorage('userInfo') || {}
		return {
			userInfo: userInfo,
			form: {
				ztmc: userInfo.ztmc,
				tyshxydm: userInfo.bm,
				tybm: userInfo.tybm,
				fddbr: userInfo.fddbr,
				lxr: userInfo.lxr,
				lxrdh: userInfo.sjhm,
				yx: userInfo.dzyx,
				purpose: '',
				purposeText: '',
			},
			hcetList: [],
			report: {
				show: false
			}
		}
	},
	computed: {
		// 计算属性的 getter
		modifyHcetList: function() {
			return this.hcetList.map((item) => {
				return item.dtlValue
			})
		}
	},
	methods: {
		actionsheetChange(picker, value, index) {
			this.form.purpose = this.hcetList[index].dtlKey
			this.form.purposeText = this.hcetList[index].dtlValue
		},
		getHCYT() {
			// 核查用途
			Axios.axiosInstance.post('/jd-framework-service/sysdict/getDictDetails?dictKey=HCYT')
				.then((response) => {
					this.hcetList = response.data.data
				})
		},
		submit() {
			if (!this.form.purposeText) {
				this.$toast('请选择报告用途')
				return false;
			}
			// 核查用途
			Axios.axiosInstance.post('/credit-data-xypj/checkReport/addCheck.do', this.form)
				.then((response) => {
					this.$toast('提交成功')
					setTimeout(function() {
						this.$router.push({
							name: 'SecondPage'
						})
					}.bind(this), 1000);
				})
		}
	},
	mounted: function() {
		this.getHCYT()
	},
	components: {}
}
</script>
<style scoped lang="scss">
.zxsqPage {
    overflow: auto;
    h5 {
        padding-left: 0.4rem;
        line-height: 0.7rem;
        background: #e8e8e8;
        color: #333;
        font-weight: normal;
        font-size: 0.28rem;
    }
}
</style>
