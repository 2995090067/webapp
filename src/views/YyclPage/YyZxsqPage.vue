<template>
<div class="zxsqPage">
	<h5>异议内容</h5>
	<div class="content">
		<van-cell-group>
			<van-field placeholder="异议类型" disabled @click-icon="yyList.show = true">
				<span slot="icon">
					<div class="fieldFormat">
						{{form.tableName}}<van-icon name="arrow" />
					</div>
				</span>
			</van-field>
			<van-field placeholder="决定文书号" disabled @click-icon="showWshList">
				<span slot="icon">
					<div class="fieldFormat">
						{{form.wsh}}<van-icon name="arrow" />
					</div>
				</span>
			</van-field>
			<van-field v-model="form.yynr" type="textarea" placeholder="请详情填写异议内容" />
			<van-field placeholder="上传文件" disabled>
				<span slot="icon">
					<van-uploader accept="*" slot="button" :after-read="onFileRead">
						<div class="fieldFormat">
							<em class="van-ellipsis">
								{{form.fileName}}
							</em>
							<van-icon name="arrow" />
						</div>
					</van-uploader>
				</span>
			</van-field>
		</van-cell-group>
	</div>

	<van-button class="van-button--custom" :block="true" size="normal" @click="submit">提交</van-button>

	<!-- 选择异议类型 -->
	<van-actionsheet title="支持以下证件类型" v-model="yyList.show">
		<van-picker :columns="modifyyTypes" value-key="" @change="yyTypesChange" />
	</van-actionsheet>

	<!-- 文书号列表 -->
	<van-popup v-model="wshType.show1" position="right" :overlay="false" class="linesePopup">
		<YyWshList :tableId="form.tableId" :tableType="form.tableType" :showDetail="showWshDetail" :customBackFun="yyWshListBackFun"></YyWshList>
	</van-popup>

	<!-- 文书号详情 -->
	<van-popup v-model="wshType.show2" position="right" :overlay="false" class="linesePopup">
		<YyWshDetail :tableType="form.tableType" :detail="wshType.detail" :customBackFun="yyWshDetailBackFun" :close="closeWshDetail"></YyWshDetail>
	</van-popup>
</div>
</template>

<script>
import Util from '../../libs/util'
import Axios from '../../libs/axios'
import YyWshList from './YyWshList'
import YyWshDetail from './YyWshDetail'

export default {
	data() {
		let userInfo = Util.getsessionStorage('userInfo') || {}

		// 当前异议类型是法人还是自然人
		let currentYytype
		if (userInfo.type == 'C') {
			currentYytype = [{
				name: '请选择',
				value: '',
				type: ''
			}, {
				name: '法人行政许可',
				value: '210000',
				type: 'frxk'
			}, {
				name: '法人行政处罚',
				value: '210001',
				type: 'frcf'
			}, {
				name: '法人红名单',
				value: '210004',
				type: 'frHon'
			}, {
				name: '法人黑名单',
				value: '210006',
				type: 'frHei'
			}]
		} else {
			currentYytype = [{
				name: '请选择',
				value: '',
				type: ''
			}, {
				name: '自然人行政处罚',
				value: '210002',
				type: 'zrrxk'
			}, {
				name: '自然人行政许可',
				value: '210003',
				type: 'zrrcf'
			}, {
				name: '自然人红名单',
				value: '210005',
				type: 'zrrHon'
			}, {
				name: '自然人黑名单',
				value: '210007',
				type: 'zrrHei'
			}]
		}
		return {
			userInfo: userInfo,
			form: {
				tableName: '请选择',
				tableId: '',
				tableType: '',
				qymc: userInfo.ztmc,
				wsh: '请选择',
				fddbr: userInfo.fddbr,
				tyshxydm: userInfo.tybm,
				recordId: '',
				yynr: '',
				fileName: '请上传',
				file: ''
			},
			yyList: {
				column: [],
				yyTypes: currentYytype,
				show: false
			},
			wshType: {
				show1: false,
				show2: false,
				detail: {}
			},
		}
	},
	computed: {
		// 计算属性的 getter
		modifyyTypes: function() {
			return this.yyList.yyTypes.map((item) => {
				return item.name
			})
		}
	},
	methods: {
		yyWshListBackFun() {
			this.wshType.show1 = false
		},
		yyWshDetailBackFun() {
			this.wshType.show2 = false
		},
		yyTypesChange(picker, value, index) {
			this.form.tableName = this.yyList.yyTypes[index].name
			this.form.tableId = this.yyList.yyTypes[index].value
			this.form.tableType = this.yyList.yyTypes[index].type
			// this.getTableColumn(this.form.tableId)
		},
		showWshList() {
			if (!this.form.tableId) {
				this.$toast('请选择选择异议类型')
				return false;
			}
			this.wshType.show1 = true
		},
		showWshDetail(item) {
			this.wshType.detail = item
			this.wshType.show2 = true
			this.form.recordId = item.record_id
		},
		closeWshDetail() {
			this.wshType.show1 = false
			this.wshType.show2 = false
			// 书文号用第一个字段代替
			// let key = this.form.tableType.indexOf('fr') > -1 ? 'A000001' : 'B000001'
			let key = ''
			if (this.form.tableType == 'frxk' || this.form.tableType == 'zzrxk') {
				key = 'XK_WSH'
			} else if (this.form.tableType == 'frcf' || this.form.tableType == 'zzrcf') {
				key = 'CF_WSH'
			} else if (this.form.tableType == 'zrrHon' || this.form.tableType == 'frHon') {
				key = 'IDENTIFICATION_NO'
			} else if (this.form.tableType == 'zrrHei' || this.form.tableType == 'frHei') {
				key = 'EXECUTE_REFRENCE_NO'
			}
			this.form.wsh = this.wshType.detail[key]
		},
		onFileRead(obj) {
			this.form.fileName = obj.file.name
			this.form.file = obj.file
		},
		submit() {
			if (!this.form.tableId || !this.form.recordId || !this.form.yynr || !this.form.file) {
				this.$toast('请完善异议信息')
				return false
			}

			let formData = new FormData()
			formData.append('qymc', this.form.qymc)
			formData.append('tyshxydm', this.form.tyshxydm)
			formData.append('fddbr', this.form.fddbr)
			formData.append('tableId', this.form.tableId)
			formData.append('recordId', this.form.recordId)
			formData.append('yynr', this.form.yynr)
			formData.append('file', this.form.file)

			let config = {
				//添加请求头
				headers: {
					"Content-Type": "multipart/form-data"
				},
				transformRequest: [function(data) {
					return data;
				}],
			}
			Axios.axiosInstance.post('/credit-data-platform/dissentProcess/add.json', formData, config)
				.then((response) => {
					this.$toast('提交成功')
					setTimeout(function() {
						this.$router.push({
							name: 'SecondPage'
						})
					}.bind(this), 1000);
				})
		},
		// getTableColumn(tableId) {
		// 	Axios.axiosInstance.post('/credit-data-platform/dissentProcess/getColumns.json', {
		// 			tableId: tableId
		// 		})
		// 		.then((response) => {
		// 			this.yyList.column = response.data.data
		// 		})
		// }
	},
	mounted: function() {},
	components: {
		YyWshList,
		YyWshDetail,
	}
}
</script>
<style scoped>
/* 文件上传 */

.uploadImgField>>>.van-field__body {
	flex-direction: column;
	align-items: flex-end;
}
</style>
<style scoped lang="scss">
.linesePopup {
    width: 100%;
    height: 100%;
}
.zxsqPage {
    display: flex;
    flex: 1;
    flex-direction: column;
    h5 {
        padding-left: 0.3rem;
        line-height: 0.7rem;
        background: #e8e8e8;
        color: #333;
        font-weight: normal;
        font-size: 0.28rem;
    }
    .content {
        flex: 1;
    }
}
</style>
