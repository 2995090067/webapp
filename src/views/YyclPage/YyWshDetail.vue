<template>
<Layout>
	<Headerlevel2 slot="header" :customBackFun="customBackFun"></Headerlevel2>

	<div class="detailPage">
		<ul>
			<li v-for="(item, index) in newObj" :key="index">
				<div>
					{{item.name}}
				</div>
				<div>
					{{item.value || '--'}}
				</div>
			</li>
		</ul>
	</div>

	<van-button class="van-button--custom" :block="true" size="normal" @click="close">选择</van-button>
</Layout>
</template>

<script>
import Util from '../../libs/util'
import Layout from '../../components/Layout'
import Headerlevel2 from '../../components/Headerlevel2'

export default {
	props: ['tableType', 'detail', 'close', 'customBackFun'],
	data() {
		return {
			frxk: [{
					name: '企业名称',
					field: 'A000001'
				},
				{
					name: '统一社会信用代码',
					field: 'A000002'
				},
				{
					name: '工商登记码',
					field: 'A000003'
				},
				{
					name: '组织机构代码',
					field: 'A000004'
				},
				{
					name: '税务登记号',
					field: 'A000005'
				},
				{
					name: '注册地址',
					field: 'A000006'
				},
				{
					name: '行政相对人名称',
					field: 'XK_XDR_MC'
				},
				{
					name: '事业单位证书号',
					field: 'XK_XDR_SYDW'
				},
				{
					name: '社会组织登记证号',
					field: 'XK_XDR_SHZZ'
				},
				{
					name: '法定代表人',
					field: 'XK_FDDB'
				},
				{
					name: '法定代表人身份证号',
					field: 'XK_FR_SFZH'
				},
				{
					name: '行政许可决定文书名称',
					field: 'XK_XKWS'
				},
				{
					name: '行政许可决定文书号',
					field: 'XK_WSH'
				},
				{
					name: '许可类别',
					field: 'XK_XKLB'
				},
				{
					name: '许可证书名称',
					field: 'XK_XKZS'
				},
				{
					name: '许可编号',
					field: 'XK_XKBH'
				},
				{
					name: '许可内容',
					field: 'XK_NR'
				},
				{
					name: '许可决定日期',
					field: 'XK_JDRQ',
					type: 'date'
				},
				{
					name: '有效期自',
					field: 'XK_YXQZ',
					type: 'date'
				},
				{
					name: '有效期至',
					field: 'XK_YXQZI',
					type: 'date'
				},
				{
					name: '许可机关',
					field: 'XK_XKJG'
				},
				{
					name: '许可机关统一社会信用代码',
					field: 'XK_XKJGDM'
				},
				{
					name: '当前状态',
					field: 'XK_ZT'
				},
				{
					name: '数据来源单位',
					field: 'XK_LYDW'
				},
				{
					name: '数据来源单位统一社会信用代码',
					field: 'XK_LYDWDM'
				},
				{
					name: '备注',
					field: 'BZ'
				},
			],
			frcf: [{
					name: '企业名称',
					field: 'A000001'
				},
				{
					name: '统一社会信用代码',
					field: 'A000002'
				},
				{
					name: '工商登记码',
					field: 'A000003'
				},
				{
					name: '组织机构代码',
					field: 'A000004'
				},
				{
					name: '税务登记号',
					field: 'A000005'
				},
				{
					name: '注册地址',
					field: 'A000006'
				},
				{
					name: '行政相对人名称',
					field: 'CF_XDR_MC'
				},
				{
					name: '事业单位证书号',
					field: 'CF_XDR_SYDW'
				},
				{
					name: '社会组织登记证号',
					field: 'CF_XDR_SHZZ'
				},
				{
					name: '法定代表人',
					field: 'CF_FDDB'
				},
				{
					name: '法定代表人身份证号',
					field: 'CF_FR_SFZH'
				},
				{
					name: '行政处罚决定文书号',
					field: 'CF_WSH'
				},
				{
					name: '违法行为类型',
					field: 'CF_WFXW'
				},
				{
					name: '违法事实',
					field: 'CF_SY'
				},
				{
					name: '处罚依据',
					field: 'CF_YJ'
				},
				{
					name: '处罚类别',
					field: 'CF_CFLB'
				},
				{
					name: '处罚内容',
					field: 'CF_NR'
				},
				{
					name: '罚款金额（万元）',
					field: 'CF_NR_FK'
				},
				{
					name: '没收违法所得、没收非法财物的金额（万元）',
					field: 'CF_NR_WFFF'
				},
				{
					name: '暂扣或吊销证照名称及编号',
					field: 'CF_NR_ZKDX'
				},
				{
					name: '处罚决定日期',
					field: 'CF_JDRQ',
					type: 'date'
				},
				{
					name: '处罚有效期',
					field: 'CF_YXQ',
					type: 'date'
				},
				{
					name: '公示截止期',
					field: 'CF_GSJZQ',
					type: 'date'
				},
				{
					name: '处罚机关',
					field: 'CF_CFJG'
				},
				{
					name: '处罚机关统一社会信用代码',
					field: 'CF_CFJGDM'
				},
				{
					name: '数据来源单位',
					field: 'CF_SJLY'
				},
				{
					name: '数据来源单位统一社会信用代码',
					field: 'CF_SJLYDM'
				},
				{
					name: '备注',
					field: 'BZ'
				},
			],
			zzrxk: [{
					name: '行政相对人名称',
					field: 'B000001'
				},
				{
					name: '居民身份证号',
					field: 'B000002'
				},
				{
					name: '住址',
					field: 'B000003'
				},
				{
					name: '证件类型',
					field: 'XK_XDR_ZJLX'
				},
				{
					name: '证件号码',
					field: 'XK_XDR_ZJHM'
				},
				{
					name: '行政许可决定文书名称',
					field: 'XK_XKWS'
				},
				{
					name: '行政许可决定书文号',
					field: 'XK_WSH'
				},
				{
					name: '许可类别',
					field: 'XK_XKLB'
				},
				{
					name: '许可证书名称',
					field: 'XK_XKZS'
				},
				{
					name: '许可编号',
					field: 'XK_XKBH'
				},
				{
					name: '许可内容',
					field: 'XK_NR'
				},
				{
					name: '许可决定日期',
					field: 'XK_JDRQ',
					type: 'date'
				},
				{
					name: '有效期自',
					field: 'XK_YXQZ',
					type: 'date'
				},
				{
					name: '许可机关',
					field: 'XK_XKJG'
				},
				{
					name: '许可机关统一社会信用代码',
					field: 'XK_XKJGDM'
				},
				{
					name: '当前状态',
					field: 'XK_ZT'
				},
				{
					name: '数据来源单位',
					field: 'XK_LYDW'
				},
				{
					name: '数据来源单位统一社会信用代码',
					field: 'XK_LYDWDM'
				},
				{
					name: '备注',
					field: 'BZ'
				},
				{
					name: '信息使用范围',
					field: 'XK_SYFW'
				},
				{
					name: '数据生产部门编码',
					field: 'SCBMBM'
				},
				{
					name: '采集日期',
					field: 'ADD_TIME',
					type: 'date'
				},
			],
			zzrcf: [{
					name: '行政相对人名称',
					field: 'B000001'
				},
				{
					name: '居民身份证号',
					field: 'B000002'
				},
				{
					name: '住址',
					field: 'B000003'
				},
				{
					name: '证件类型',
					field: 'CF_XDR_ZJLX'
				},
				{
					name: '证件号码',
					field: 'CF_XDR_ZJHM'
				},
				{
					name: '行政处罚决定书文号',
					field: 'CF_WSH'
				},
				{
					name: '违法行为类型',
					field: 'CF_WFXW'
				},
				{
					name: '违法事实',
					field: 'CF_SY'
				},
				{
					name: '处罚依据',
					field: 'CF_YJ'
				},
				{
					name: '处罚类别',
					field: 'CF_CFLB'
				},
				{
					name: '处罚内容',
					field: 'CF_NR'
				},
				{
					name: '罚款金额（万元）',
					field: 'CF_NR_FK'
				},
				{
					name: '没收违法所得、没收非法财物的金额（万元）',
					field: 'CF_NR_WFFF'
				},
				{
					name: '暂扣或吊销证照名称及编号',
					field: 'CF_NR_ZKDX'
				},
				{
					name: '处罚决定日期',
					field: 'CF_JDRQ',
					type: 'date'
				},
				{
					name: '处罚有效期',
					field: 'CF_YXQ',
					type: 'date'
				},
				{
					name: '公示截止期',
					field: 'CF_GSJZQ',
					type: 'date'
				},
				{
					name: '处罚机关',
					field: 'CF_XKJG'
				},
				{
					name: '处罚机关统一社会信用代码',
					field: 'CF_CFJGDM'
				},
				{
					name: '数据来源单位',
					field: 'CF_SJLY'
				},
				{
					name: '数据来源单位统一社会信用代码',
					field: 'CF_SJLYDM'
				},
				{
					name: '备注',
					field: 'BZ'
				},
				{
					name: '信息使用范围',
					field: 'CF_SYFW'
				},
				{
					name: '数据生产部门编码',
					field: 'SCBMBM'
				},
				{
					name: '采集日期',
					field: 'ADD_TIME',
					type: 'date'
				},
			],
			zrrHon: [{
					name: '姓名',
					field: 'B000001'
				},
				{
					name: '居民身份证号',
					field: 'B000002'
				},
				{
					name: '住址',
					field: 'B000003'
				},
				{
					name: '数据来源',
					field: 'DATA_SOURCE'
				},
				{
					name: '数据类别',
					field: 'DATA_CATEGORY'
				},
				{
					name: '评价年度',
					field: 'COMMENT_YEAR'
				},
				{
					name: '认定文号',
					field: 'IDENTIFICATION_NO'
				},
				{
					name: '认定时间',
					field: 'IDENTIFICATION_DATE',
					type: 'date'
				},
				{
					name: '认定单位',
					field: 'IDENTIFICATION_DEPT'
				},
				{
					name: '文件名',
					field: 'FILE_NAME'
				},
				{
					name: '有限期限',
					field: 'EXPIRATION_DATE'
				},
			],
			zrrHei: [{
					name: '姓名',
					field: 'B000001'
				},
				{
					name: '居民身份证号',
					field: 'B000002'
				},
				{
					name: '住址',
					field: 'B000003'
				},
				{
					name: '数据来源',
					field: 'DATA_SOURCE'
				},
				{
					name: '数据类别',
					field: 'DATA_CATEGORY'
				},
				{
					name: '案号',
					field: 'CASE_NO'
				},
				{
					name: '执行单位',
					field: 'EXECUTE_DEPT'
				},
				{
					name: '地域名称',
					field: 'AREA_NAME'
				},
				{
					name: '执行依据文号',
					field: 'EXECUTE_REFRENCE_NO'
				},
				{
					name: '发布时间',
					field: 'PUBLISH_DATE',
					type: 'date'
				},
				{
					name: '立案时间',
					field: 'REGISTER_DATE',
					type: 'date'
				},
				{
					name: '有限期限',
					field: 'EXPIRATION_DATE'
				},
			],
			frHon: [{
					name: '企业名称',
					field: 'A000001'
				},
				{
					name: '统一社会信用代码',
					field: 'A000002'
				},
				{
					name: '工商登记码',
					field: 'A000003'
				},
				{
					name: '组织机构代码',
					field: 'A000004'
				},
				{
					name: '税务登记号',
					field: 'A000005'
				},
				{
					name: '注册地址',
					field: 'A000006'
				},
				{
					name: '数据来源',
					field: 'DATA_SOURCE'
				},
				{
					name: '数据类别',
					field: 'DATA_CATEGORY'
				},
				{
					name: '评价年度',
					field: 'COMMENT_YEAR'
				},
				{
					name: '认定文号',
					field: 'IDENTIFICATION_NO'
				},
				{
					name: '认定时间',
					field: 'IDENTIFICATION_DATE',
					type: 'date'
				},
				{
					name: '认定单位',
					field: 'IDENTIFICATION_DEPT'
				},
				{
					name: '文件名',
					field: 'FILE_NAME'
				},
				{
					name: '有效期限',
					field: 'EXPIRATION_DATE'
				},
			],
			frHei: [{
					name: '企业名称',
					field: 'A000001'
				},
				{
					name: '统一社会信用代码',
					field: 'A000002'
				},
				{
					name: '工商登记码',
					field: 'A000003'
				},
				{
					name: '组织机构代码',
					field: 'A000004'
				},
				{
					name: '税务登记号',
					field: 'A000005'
				},
				{
					name: '注册地址',
					field: 'A000006'
				},
				{
					name: '数据来源',
					field: 'DATA_SOURCE'
				},
				{
					name: '数据类别',
					field: 'DATA_CATEGORY'
				},
				{
					name: '案号',
					field: 'CASE_NO'
				},
				{
					name: '企业法人姓名',
					field: 'LEGAL_REPRESENTATIVE'
				},
				{
					name: '执行单位',
					field: 'EXECUTE_DEPT'
				},
				{
					name: '地域名称',
					field: 'AREA_NAME',
					type: 'date'
				},
				{
					name: '执行依据文号',
					field: 'EXECUTE_REFRENCE_NO'
				},
				{
					name: '发布时间',
					field: 'PUBLISH_DATE',
					type: 'date'
				},
				{
					name: '立案时间',
					field: 'REGISTER_DATE',
					type: 'date'
				},
				{
					name: '有效期限',
					field: 'EXPIRATION_DATE'
				},
			],
			newTableType: this.tableType,
			newDetail: this.detail,
			newObj: []
		}
	},
	watch: {
		detail(val) {
			this.newDetail = val
			this.showDetail()
		},
		tableType(val) {
			this.newTableType = val
		},
	},
	methods: {
		showDetail() {
			let obj = this[this.newTableType];
			this.newObj = []

			for (let ckey in this.newDetail) {
				obj.map((item, index) => {
					if (ckey == item.field) {
						if (item.type == 'date') {
							this.newObj.push({
								name: item.name,
								value: new Date(this.newDetail[ckey]).format('yyyy-MM-dd')
							})
						} else {
							this.newObj.push({
								name: item.name,
								value: this.newDetail[ckey]
							})
						}
					}
				})
			}
		}
	},
	mounted: function() {
		this.showDetail()
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
    flex: 1;
    display: flex;
    flex-direction: column;
    ul {
        flex: 1;
        li {
            line-height: 0.7rem;
            background: #fff;
            div {
                padding: 0 0.25rem;
                &:nth-child(odd) {
                    background-color: #f7f7f7;
                }
            }
        }
    }
}
</style>
