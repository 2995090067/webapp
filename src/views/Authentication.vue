<template>
<Layout>
	<Headerlevel2 slot="header" :title="$route.meta.title"></Headerlevel2>

	<div class="Authentication">
		<div class="registerArea">
			<div v-if="registerInfo.payload.type == 'C'">
				<van-field disabled @keyup="showNext" @clear="clearFun('ztmc')" v-model="registerInfo.payload.ztmc" clearable placeholder="企业名称" />
				<van-field disabled @keyup="showNext" @clear="clearFun('bm')" v-model="registerInfo.payload.bm" clearable placeholder="统一社会信用代码" />
				<van-field disabled @keyup="showNext" @clear="clearFun('fddbr')" v-model="registerInfo.payload.fddbr" clearable placeholder="法定代表人" />
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
				<van-field disabled v-model="registerInfo.payload.ztmc" placeholder="姓名" />
				<van-field disabled v-model="registerInfo.payload.bm" placeholder="身份证号" />
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
			<van-button class="van-button--custom" round :loading="loading" :disabled="registerInfo.step2.disabled" :block="true" size="normal" @click="registerFun">提交实名</van-button>
		</div>
	</div>
</Layout>
</template>

<script>
import Util from '../libs/util'
import Axios from '../libs/axios'
import Layout from '../components/Layout'
import Headerlevel2 from '../components/Headerlevel2'
import CommonUpload from '../components/CommonUpload'

export default {
	data() {
		return {
			loading: false,
			registerInfo: {
				payload: {
					...Util.getsessionStorage('userInfo'),
					file1: {},
					file2: {},
					file3: {},
				},
				step2: {
					disabled: true
				}
			},
		}
	},
	methods: {
		clearFun(field) {
			this.registerInfo.payload[field] = ''
			this.showNext()
		},
		showNext() {
			// 禁止点击
			this.registerInfo.step2.disabled = true


			if (!this.registerInfo.payload.ztmc) {
				return false;
			}
			// if (!this.registerInfo.payload.phone) {
			// 	return false;
			// }
			if (!this.registerInfo.payload.bm) {
				return false;
			}
			if (this.registerInfo.payload.type == 'C') {
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
			this.registerInfo.step2.disabled = false
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

			formData.append('id', this.registerInfo.payload.id)
			formData.append('ztmc', this.registerInfo.payload.ztmc)
			formData.append('bm', '')
			formData.append('type', this.registerInfo.payload.type)
			if (this.registerInfo.payload.type == 'C') {
				formData.append('fddbr', this.registerInfo.payload.fddbr)
				formData.append('zjwj', this.registerInfo.payload.file1.file)
				formData.append('sfzwjFront', this.registerInfo.payload.file2.file)
				formData.append('sfzwjBack', this.registerInfo.payload.file3.file)
			} else {
				formData.append('sfzwjFront', this.registerInfo.payload.file1.file)
				formData.append('sfzwjBack', this.registerInfo.payload.file2.file)
			}

			let config = {
				//添加请求头
				headers: {
					"Content-Type": "multipart/form-data"
				},
				transformRequest: [function(data) {
					return data;
				}],
			}
			Axios.axiosInstance.post('/credit-data-xypj/xypj/gateway/repeatModifyUserInfo.json', formData, config)
				.then((response) => {
					this.loading = false
					this.$toast('提交成功')
				}).catch((err) => {
					console.log(err);
					this.loading = false
				})
		},
	},
	mounted: function() {},
	components: {
		Layout,
		Headerlevel2,
		CommonUpload
	}
}
</script>
<style lang="scss" scoped>
.Authentication {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #fff;
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
