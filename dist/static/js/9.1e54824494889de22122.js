webpackJsonp([9],{"+BXW":function(a,e){},KrOR:function(a,e){},NC7H:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});t("TVG1");var n=t("Cl3J"),s=t("4m8a"),l=t("4Zt/"),o={data:function(){return{headInfo:{},bodyInfo:{},status:"",payload:{key:this.$route.params.key,id:this.$route.params.id},yyTypes:[{name:"法人行政许可",value:"210000"},{name:"法人行政处罚",value:"210001"},{name:"法人红名单",value:"210004"},{name:"法人黑名单",value:"210006"},{name:"自然人行政处罚",value:"210002"},{name:"自然人行政许可",value:"210003"},{name:"自然人红名单",value:"210005"},{name:"自然人黑名单",value:"210007"}]}},computed:{},methods:{getDetail:function(){var a=this;l.a.axiosInstance.post("/credit-data-platform/dissentProcess/selectHistoryDetail.json",this.payload).then(function(e){e.data&&(a.headInfo=e.data.data.head,a.bodyInfo=e.data.data.body,a.yyTypes.map(function(e){e.value==a.bodyInfo.tableId&&(a.bodyInfo.tableName=e.name)}),"Y"==a.bodyInfo.status?(a.status="status pass",a.headInfo.finishTime=a.headInfo.finishTime&&new Date(a.headInfo.finishTime).format("yyyy-MM-dd")):"N"==a.bodyInfo.status&&(a.status="status reject",a.headInfo.finishTime="--",a.headInfo.remark="--"))})}},mounted:function(){this.getDetail()},components:{Layout:n.a,Headerlevel2:s.a}},d={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("Layout",[t("Headerlevel2",{attrs:{slot:"header",title:this.$route.meta.title},slot:"header"}),a._v(" "),t("div",{staticClass:"detailPage"},[t("div",{staticClass:"baseInfo"},[t("div",{staticClass:"info"},[t("h1",[a._v(a._s(a.bodyInfo.qymc))]),a._v(" "),"Y"==a.bodyInfo.status?t("p",[a._v("已通过")]):"N"==a.bodyInfo.status?t("p",[a._v("已驳回")]):a._e()]),a._v(" "),t("van-field",{attrs:{label:"审批时间",value:a.headInfo.finishTime,disabled:""}}),a._v(" "),t("van-field",{attrs:{label:"审批原因",value:a.headInfo.remark,disabled:""}}),a._v(" "),t("div",{class:a.status})],1),a._v(" "),t("div",[t("van-cell",{attrs:{title:"企业名称",label:a.bodyInfo.qymc}}),a._v(" "),t("van-cell",{attrs:{title:"统一社会信用代码",label:a.bodyInfo.tyshxydm}}),a._v(" "),t("van-cell",{attrs:{title:"法定代表人",label:a.bodyInfo.fddbr}}),a._v(" "),t("van-cell",{attrs:{title:"异议类型",label:a.bodyInfo.tableName}}),a._v(" "),t("van-cell",{attrs:{title:"异议内容",label:a.bodyInfo.yynr}})],1)])],1)},staticRenderFns:[]};var i=t("Mz/3")(o,d,!1,function(a){t("KrOR"),t("+BXW")},"data-v-076fa004",null);e.default=i.exports}});
//# sourceMappingURL=9.1e54824494889de22122.js.map