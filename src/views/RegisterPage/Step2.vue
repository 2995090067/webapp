<template>
<div class="step2Page">
	<div class="stepBox">
		<ul>
			<li class="step"><span class="success"></span><span class="ico">1</span>创建用户</li>
			<li class="line"></li>
			<li class="step active"><span class="success"></span><span class="ico">2</span>实名认证</li>
			<li class="line"></li>
			<li class="step"><span class="success"></span><span class="ico">3</span>等待验证</li>
		</ul>
	</div>
	<div class="registerArea">
		<div v-if="$route.query.type == 'fr'">
			<van-field @keyup="showNext" @clear="clearFun('ztmc')" v-model="registerInfo.payload.ztmc" clearable placeholder="企业名称" />
			<van-field @keyup="showNext" @clear="clearFun('bm')" v-model="registerInfo.payload.bm" clearable placeholder="统一社会信用代码" />
			<van-field @keyup="showNext" @clear="clearFun('fddbr')" v-model="registerInfo.payload.fddbr" clearable placeholder="法定代表人" />
			<van-panel class="uploadImgField">
				<template slot="header" lang="html">
					<div class="header">
		        		<span>上传证照</span>
		    		</div>
				</template>
				<div class="uploadImgFieldImage">
					<van-uploader slot="button" :after-read="onRead1">
						<CommonUpload :file="registerInfo.payload.file1.content"></CommonUpload>
						<span class="title">营业执照正面照</span>
					</van-uploader>
					<van-uploader slot="button" :after-read="onRead2">
						<CommonUpload :file="registerInfo.payload.file2.content"></CommonUpload>
						<span class="title">法人身份证正面照</span>
					</van-uploader>
					<van-uploader slot="button" :after-read="onRead3">
						<CommonUpload :file="registerInfo.payload.file3.content"></CommonUpload>
						<span class="title">法人身份证反面照</span>
					</van-uploader>
				</div>
			</van-panel>
		</div>
		<div v-else>
			<van-field @keyup="showNext" @clear="clearFun('ztmc')" v-model="registerInfo.payload.ztmc" clearable placeholder="姓名" />
			<van-field @keyup="showNext" @clear="clearFun('bm')" v-model="registerInfo.payload.bm" clearable placeholder="身份证号" />
			<van-panel class="uploadImgField">
				<template slot="header" lang="html">
					<div class="header">
		        		<span>上传证照</span>
		    		</div>
				</template>
				<div class="uploadImgFieldImage">
					<van-uploader slot="button" :after-read="onRead1">
						<CommonUpload :file="registerInfo.payload.file1.content"></CommonUpload>
						<span class="title">身份证正面照</span>
					</van-uploader>
					<van-uploader slot="button" :after-read="onRead2">
						<CommonUpload :file="registerInfo.payload.file2.content"></CommonUpload>
						<span class="title">身份证反面照</span>
					</van-uploader>
				</div>
			</van-panel>
		</div>
	</div>

	<div class="registerBtn">
		<van-button class="van-button--custom" round :loading="loading" :disabled="registerInfo.step2.disabled" :block="true" size="normal" @click="registerFun">注册</van-button>
	</div>
</div>
</template>

<script>
import Util from '../../libs/util'
import CommonUpload from '../../components/CommonUpload'
import md5 from 'js-md5'
import Axios from '../../libs/axios'

export default {
	data() {
		return {
			loading: false,
			// sendSms: {
			// 	disabled: true,
			// 	loading: false,
			// 	countTime: 60
			// },
			registerInfo: this.$store.state.register,
		}
	},
	methods: {
		clearFun(field) {
			this.registerInfo.payload[field] = ''
			this.showNext()
		},
		showNext() {
			// 保存信息
			this.$store.dispatch('registerPage_saveData_action', {
				type: 'save',
				data: this.registerInfo.payload
			})
			// 禁止点击
			this.$store.dispatch('registerPage_saveData_action', {
				type: 'changeStatus',
				data: {
					step: 'step2',
					value: true
				}
			})

			if (!this.registerInfo.payload.ztmc) {
				return false;
			}
			if (!this.registerInfo.payload.phone) {
				return false;
			}
			if (!this.registerInfo.payload.bm) {
				return false;
			}
			if (this.$route.query.type == 'fr') {
				if (!this.registerInfo.payload.fddbr) {
					return false;
				}
				if (!this.registerInfo.payload.file1.content) {
					return false;
				}
				if (!this.registerInfo.payload.file2.content) {
					return false;
				}
				if (!this.registerInfo.payload.file3.content) {
					return false;
				}
			} else {
				if (!this.registerInfo.payload.file1.content) {
					return false;
				}
				if (!this.registerInfo.payload.file2.content) {
					return false;
				}
			}

			// 允许点击
			this.$store.dispatch('registerPage_saveData_action', {
				type: 'changeStatus',
				data: {
					step: 'step2',
					value: false
				}
			})
		},
		onRead1(file) {
			this.registerInfo.payload.file1 = file
			this.showNext()
		},
		onRead2(file) {
			this.registerInfo.payload.file2 = file
			this.showNext()
		},
		onRead3(file) {
			this.registerInfo.payload.file3 = file
			this.showNext()
		},
		registerFun() {
			this.loading = true
			let formData = new FormData()

			formData.append('ztmc', this.registerInfo.payload.ztmc)
			formData.append('sjhm', this.registerInfo.payload.phone)
			formData.append('username', this.registerInfo.payload.phone)
			formData.append('password', md5(this.registerInfo.payload.password))
			formData.append('bm', this.registerInfo.payload.bm)
			if (this.$route.query.type == 'fr') {
				formData.append('type', 'C')
				formData.append('fddbr', this.registerInfo.payload.fddbr)
				formData.append('zjwj', this.registerInfo.payload.file1.file)
				formData.append('sfzwjFront', this.registerInfo.payload.file2.file)
				formData.append('sfzwjBack', this.registerInfo.payload.file3.file)
			} else {
				formData.append('type', 'P')
				formData.append('sfzwjFront', this.registerInfo.payload.file1.file)
				formData.append('sfzwjBack', this.registerInfo.payload.file2.file)
			}
			formData.append('dzyx', '')
			formData.append('lxr', '')

			let config = {
				//添加请求头
				headers: {
					"Content-Type": "multipart/form-data"
				},
				transformRequest: [function(data) {
					return data;
				}],
			}
			Axios.axiosInstance.post('/credit-data-xypj/xypjUser/regist.json', formData, config)
				.then((response) => {
					this.loading = false

					this.$router.replace({
						name: 'RegisterPage3',
					})
				}).catch((err) => {
					console.log(err);
					this.loading = false
				})
		},
	},
	mounted: function() {
		this.registerInfo = this.$store.state.register
	},
	components: {
		CommonUpload
	}
}
</script>
<style lang="scss" scoped>
.step2Page {
    flex: 1;
    display: flex;
    flex-direction: column;
    .registerArea {
        flex: 1;
        // .sendSms {
        //     color: #2795ee;
        //     background: none;
        //     border: none;
        //     // font-size: 0.26rem;
        // }
        .uploadImgField {
            // margin-top: 0.2rem;
            &:after {
                display: none;
            }
            .header {
                padding: 0.2rem 0.3rem;
                color: #9d9e9f;
                font-size: 0.3rem;
            }
            .uploadImgFieldImage {
                display: flex;
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
    }
    .registerBtn {
        padding: 0.25rem;
    }
}
</style>
