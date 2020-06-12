<template>
<div class="zxsqPage">
	<h5>信用主体信息</h5>
	<van-cell-group>
		<van-field v-model="form.qymc1" clearable placeholder="企业名称" />
		<van-field v-model="form.qymc2" clearable placeholder="统一社会信用代码" />
		<van-field v-model="form.qymc3" clearable placeholder="法定代表人姓名" />
	</van-cell-group>
	<h5>基本信息</h5>
	<van-cell-group>
		<van-field v-model="form.qymc4" clearable placeholder="联系人姓名" />
		<van-field v-model="form.phone5" clearable placeholder="联系电话" error-message="手机号格式错误" />
		<van-field v-model="form.qymc7" placeholder="有效证件类型" disabled @click-icon="showReport">
			<span slot="icon">
				<div class="fieldFormat">
					请选择<van-icon name="arrow" />
				</div>
			</span>
		</van-field>
		<van-field v-model="form.qymc6" clearable placeholder="有效证件号码" />
		<van-field class="uploadImgField" placeholder="上传照片" disabled>
			<van-uploader slot="button" :after-read="onRead1">
				<CommonUpload :file="form.file1.content"></CommonUpload>
				<span class="title">有效证件正面照</span>
			</van-uploader>
			<van-uploader slot="button" :after-read="onRead2">
				<CommonUpload :file="form.file2.content"></CommonUpload>
				<span class="title">有效证件正面照</span>
			</van-uploader>
		</van-field>

	</van-cell-group>
	<h5>异议内容</h5>
	<van-cell-group style="margin-bottom:1.2rem;">
		<van-field v-model="form.bz" type="textarea" placeholder="请填写备注信息" />
		<van-field placeholder="上传文件" disabled>
			<span slot="icon">
				<van-uploader accept="*" slot="button" :after-read="onRead3">
					<div class="fieldFormat">
						<em class="van-ellipsis">
							{{form.file3.file.name}}
						</em>
						<van-icon name="arrow" />
					</div>
				</van-uploader>
			</span>
		</van-field>
	</van-cell-group>
	<van-button class="van-button--custom" :block="true" size="normal">提交</van-button>

	<van-actionsheet title="支持以下证件类型" v-model="report.show">
		<van-picker :columns="columns" @change="reportChange" />
	</van-actionsheet>
</div>
</template>

<script>
import Util from '../../libs/util'
import Axios from '../../libs/axios'
import CommonUpload from '../../components/CommonUpload'

export default {
	data() {
		return {
			form: {
				qymc1: '',
				qymc2: '',
				qymc3: '',
				qymc4: '',
				phone5: '',
				qymc5: '',
				qymc6: '',
				qymc7: '',
				bz: '',
				file1: '',
				file2: '',
				file3: {
					file: {
						name: '请上传'
					}
				}
			},
			columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
			report: {
				show: false
			}
		}
	},
	methods: {
		showReport() {
			this.report.show = true
		},
		reportChange(picker, value, index) {
			console.log(picker, value, index);
			this.form.qymc7 = value
		},
		onRead1(file) {
			console.log(file)
			this.form.file1 = file
		},
		onRead2(file) {
			this.form.file2 = file
			console.log(file)
		},
		onRead3(file) {
			console.log(file);
			this.form.file3 = file
		}
	},
	mounted: function() {},
	components: {
		CommonUpload
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
    .uploadImgField {
        .commonUpload {
            margin: 0 0.3rem;
        }
        .title {
            display: block;
            text-align: center;
            font-size: 0.24rem;
        }
    }
}
</style>
