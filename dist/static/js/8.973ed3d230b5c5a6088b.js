webpackJsonp([8],{MsVc:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=t("TVG1"),i=t("Cl3J"),s=t("4m8a"),l=t("4Zt/"),o={props:["tybm","type","customBackFun"],data:function(){return{cTybm:this.tybm,cType:this.type,detail:[],active:0,tabInfo:[]}},methods:{tabChange:function(e){this.getData(this.tabInfo[e])},getData:function(e){var a=this;if(this.detail[this.active])return!1;this.$toast.loading({message:"加载中..."});var t=void 0;t=this.cType.indexOf("fr")>-1?"/oneSearchAct/selectFrDetail.jspx":"/oneSearchAct/selectZrrDetail.jspx",l.a.axiosInstance.get(t,{params:{tybm:this.cTybm,type:e.value}}).then(function(e){if(setTimeout(function(){this.$toast.clear()}.bind(a),500),e.data){var t=e.data.data[0]||{},n=[];0==a.active?n=a.cType.indexOf("fr")>-1?[{name:"企业名称",value:t.A000001||"--"},{name:"统一社会信用代码",value:t.A000002||"--"},{name:"工商登记码",value:t.A000003||"--"},{name:"组织机构代码",value:t.A000004||"--"},{name:"税务登记号",value:t.A000005||"--"}]:[{name:"姓名",value:t.B000001||"--"},{name:"居民身份证号",value:t.B000002||"--"},{name:"住址",value:t.B000003||"--"}]:1==a.active?n=a.cType.indexOf("fr")>-1?[{name:"法定代表人姓名",value:t.XK_FDDB||"--"},{name:"行政许可决定文书号",value:t.XK_WSH||"--"},{name:"地方编码",value:t.DFBM||"--"},{name:"审批类别",value:t.XK_XKLB||"--"},{name:"许可机关",value:t.XK_XKJG||"--"},{name:"许可内容",value:t.XK_NR||"--"},{name:"许可决定日期",value:t.XK_JDRQ&&new Date(t.XK_JDRQ).format("yyyy-MM-dd")||"--"},{name:"许可截止期",value:t.XK_YXQZI&&new Date(t.XK_YXQZI).format("yyyy-MM-dd")||"--"},{name:"数据更新时间",value:t.sjgxsjc&&new Date(t.sjgxsjc).format("yyyy-MM-dd")||"--"}]:[{name:"姓名",value:t.B000001||"--"},{name:"行政许可决定文书号",value:t.XK_WSH||"--"},{name:"许可决定日期",value:t.XK_JDRQ&&new Date(t.XK_JDRQ).format("yyyy-MM-dd")||"--"},{name:"审批类别",value:t.XK_XKLB||"--"},{name:"许可机关",value:t.XK_XKJG||"--"},{name:"许可截止期",value:t.XK_YXQZI&&new Date(t.XK_YXQZI).format("yyyy-MM-dd")||"--"},{name:"许可内容",value:t.XK_NR||"--"}]:2==a.active?n=a.cType.indexOf("fr")>-1?[{name:"法定代表人姓名",value:t.CF_FDDB||"--"},{name:"行政处罚决定文书号",value:t.CF_WSH||"--"},{name:"违法事实",value:t.CF_SY||"--"},{name:"处罚类别",value:t.CF_CFLB||"--"},{name:"处罚机关",value:t.CF_CFJG||"--"},{name:"处罚内容",value:t.CF_NR||"--"},{name:"处罚决定日期",value:t.CF_JDRQ&&new Date(t.CF_JDRQ).format("yyyy-MM-dd")||"--"},{name:"处罚依据",value:t.CF_YJ&&new Date(t.CF_YJ).format("yyyy-MM-dd")||"--"},{name:"数据更新时间",value:t.sjgxsjc&&new Date(t.sjgxsjc).format("yyyy-MM-dd")||"--"}]:[{name:"姓名",value:t.B000001||"--"},{name:"违法事实",value:t.CF_SY||"--"},{name:"处罚类别",value:t.CF_CFLB||"--"},{name:"处罚机关",value:t.CF_CFJG||"--"},{name:"处罚内容",value:t.CF_NR||"--"},{name:"处罚决定日期",value:t.CF_JDRQ&&new Date(t.CF_JDRQ).format("yyyy-MM-dd")||"--"},{name:"处罚依据",value:t.CF_YJ||"--"}]:3==a.active?n=a.cType.indexOf("fr")>-1?[{name:"认定单位",value:t.IDENTIFICATION_DEPT||"--"},{name:"认定文号",value:t.IDENTIFICATION_NO||"--"},{name:"住址",value:t.B000003||"--"},{name:"注册地址",value:t.A000006||"--"},{name:"认定时间",value:t.IDENTIFICATION_DATE&&new Date(t.IDENTIFICATION_DATE).format("yyyy-MM-dd")||"--"}]:[{name:"认定单位",value:t.IDENTIFICATION_DEPT||"--"},{name:"认定文号",value:t.IDENTIFICATION_NO||"--"},{name:"住址",value:t.B000003||"--"},{name:"认定时间",value:t.IDENTIFICATION_DATE&&new Date(t.IDENTIFICATION_DATE).format("yyyy-MM-dd")||"--"}]:4==a.active?n=a.cType.indexOf("fr")>-1?[{name:"执行单位",value:t.EXECUTE_DEPT||"--"},{name:"执行依据文号",value:t.EXECUTE_REFRENCE_NO||"--"},{name:"注册地址",value:t.A000006||"--"},{name:"立案时间",value:t.REGISTER_DATE&&new Date(t.REGISTER_DATE).format("yyyy-MM-dd")||"--"}]:[{name:"执行单位",value:t.EXECUTE_DEPT||"--"},{name:"执行依据文号",value:t.EXECUTE_REFRENCE_NO||"--"},{name:"注册地址",value:t.B000003||"--"},{name:"立案时间",value:t.REGISTER_DATE&&new Date(t.REGISTER_DATE).format("yyyy-MM-dd")||"--"}]:a.active,a.detail.splice(a.active,1,n)}else a.$toast("无数据")}).catch(function(e){a.$toast.clear(),a.$toast("接口出错")})},getTableInfo:function(){return[{text:"基本信息",value:this.cType.indexOf("fr")>-1?"frBase":"zrrBase"},{text:"行政许可",value:this.cType.indexOf("fr")>-1?"frXk":"zrrXk"},{text:"行政处罚",value:this.cType.indexOf("fr")>-1?"frCf":"zrrCf"},{text:"红名单",value:this.cType.indexOf("fr")>-1?"frHon":"zrrHon"},{text:"黑名单",value:this.cType.indexOf("fr")>-1?"frHei":"zrrHei"}]}},watch:{tybm:function(e){this.cTybm=e,this.active=0,this.getData(this.tabInfo[this.active]),this.tabInfo=this.getTableInfo()},type:function(e){this.cType=e}},mounted:function(){this.tabInfo=this.getTableInfo(),this.getData(this.tabInfo[this.active])},components:{Layout:i.a,Headerlevel2:s.a}},u={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("Layout",[t("Headerlevel2",{attrs:{slot:"header",title:"一站式查询详情",customBackFun:e.customBackFun},slot:"header"}),e._v(" "),t("van-tabs",{attrs:{color:"#2795ee"},on:{change:e.tabChange},model:{value:e.active,callback:function(a){e.active=a},expression:"active"}},e._l(e.tabInfo,function(a,n){return t("van-tab",{key:n,attrs:{title:a.text}},e._l(e.detail[e.active],function(e,a){return t("van-cell",{key:a,attrs:{title:e.name,label:e.value}})}),1)}),1)],1)},staticRenderFns:[]};var r=t("Mz/3")(o,u,!1,function(e){t("e2UH")},null,null).exports,c=t("pjeT"),v={data:function(){return{show:!1,listTab:{refresh:!1,loading:!1,finished:!1,list:[]},payload:{condition:this.$route.params.keyword,type:this.$route.query.type,pageNo:0,pageSize:10},detail:{tybm:"",type:this.$route.query.type}}},methods:{customBackFun:function(){this.show=!1},showDetail:function(e){this.$route.query.type.indexOf("fr")>-1&&(this.show=!0,this.detail.tybm=e.tybm)},getData:function(){var e=this;if(this.listTab.loading)return!1;this.listTab.loading=!0,n.a.ajax.get(this.$route.query.url,{params:this.payload}).then(function(a){a.data&&(0==a.data.data.length?e.listTab.finished=!0:e.listTab.list=e.listTab.list.concat(a.data.data),e.payload.first=e.payload.first+e.payload.count),e.listTab.loading=!1,setTimeout(function(){this.listTab.refresh=!1}.bind(e),1e3)}).catch(function(a){e.$toast("接口出错"),e.listTab.loading=!1})},onLoad:function(){this.getData()}},components:{YzsDetailPage:r,Layout:i.a,Headerlevel2:s.a,List:c.a}},y={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("Layout",[t("Headerlevel2",{attrs:{slot:"header",title:e.$route.meta.title},slot:"header"}),e._v(" "),t("div",{staticClass:"searchPage"},[t("div",{staticClass:"wukai"},[t("List",{attrs:{list:e.listTab.list,loading:e.listTab.loading,finished:e.listTab.finished,onLoad:e.onLoad},scopedSlots:e._u([{key:"default",fn:function(a){return e._l(a.cList,function(a,n){return t("div",{key:n,staticClass:"listItem"},[e.$route.query.type.indexOf("fr")>-1?t("div",{on:{click:function(t){e.showDetail(a)}}},[t("span",{staticClass:"name"},[e._v(e._s(a.A000001))]),e._v(" "),t("span",{staticClass:"textOverflow"},[e._v("统一社会信用代码:"+e._s(a.tybm))]),e._v(" "),t("span",[e._v("组织机构代码:"+e._s(a.A000002))]),e._v(" "),t("span",[e._v("工商注册号:"+e._s(a.A000003))]),e._v(" "),t("span",[e._v("税务登记证号:--")])]):t("div",{on:{click:function(t){e.showDetail(a)}}},[t("span",{staticClass:"name"},[e._v(e._s(a.B000001))]),e._v(" "),t("span",{staticClass:"textOverflow"},[e._v("统一社会信用代码:"+e._s(a.TYBM))]),e._v(" "),t("span",[e._v("身份证号码:"+e._s(a.B000002))]),e._v(" "),t("span",[e._v("手机号码:--")]),e._v(" "),t("span",[e._v("家庭现住址:--")])])])})}}])})],1)]),e._v(" "),t("van-popup",{staticClass:"linesePopup",attrs:{position:"right",overlay:!1},model:{value:e.show,callback:function(a){e.show=a},expression:"show"}},[t("YzsDetailPage",{attrs:{tybm:e.detail.tybm,type:e.detail.type,customBackFun:e.customBackFun}})],1)],1)},staticRenderFns:[]};var m=t("Mz/3")(v,y,!1,function(e){t("qAWl")},null,null);a.default=m.exports},e2UH:function(e,a){},qAWl:function(e,a){}});
//# sourceMappingURL=8.973ed3d230b5c5a6088b.js.map