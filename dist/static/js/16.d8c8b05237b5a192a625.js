webpackJsonp([16],{"8B22":function(t,s){},"9vqM":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("TVG1"),e=a("pjeT"),n=a("4Zt/"),l={data:function(){return{listTab:{refresh:!1,loading:!1,finished:!1,list:[]},payload:{bm:(i.a.getsessionStorage("userInfo")||{}).bm,limit:10,page:1,type:"",startTime:"",endTime:""},customStyle:{height:window.bodyHeightToRem-.9-.3-.56+"rem"}}},methods:{getData:function(){var t=this;if(this.listTab.loading)return!1;this.listTab.loading=!0,n.a.axiosInstance.post("/credit-data-platform/dissentProcess/selectHistoryList.json",this.payload).then(function(s){s.data&&(0==s.data.data.length?t.listTab.finished=!0:t.listTab.list=t.listTab.list.concat(s.data.data),t.payload.page=t.payload.page+t.payload.limit),t.listTab.loading=!1,setTimeout(function(){this.listTab.refresh=!1}.bind(t),2e3)}).catch(function(s){t.$toast("接口出错"),t.listTab.loading=!1})},onRefresh:function(){this.listTab.refresh=!0,this.listTab.list=[],this.payload.page=1,this.getData()},onLoad:function(){this.getData()},showDetail:function(t){"D"!=t.status&&this.$router.push({name:"YyJdcx_detailPage",params:{id:t.id,key:t.accessKey}})}},components:{List:e.a}},o={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"listPage"},[a("div",{staticClass:"wukai",style:t.customStyle},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.listTab.refresh,callback:function(s){t.$set(t.listTab,"refresh",s)},expression:"listTab.refresh"}},[a("List",{staticClass:"list",attrs:{list:t.listTab.list,loading:t.listTab.loading,finished:t.listTab.finished,onLoad:t.onLoad},scopedSlots:t._u([{key:"default",fn:function(s){return t._l(s.cList,function(s,i){return a("div",{key:i,staticClass:"listItem van-hairline--bottom",on:{click:function(a){t.showDetail(s)}}},[a("span",[t._v(t._s(s.fddbr))]),t._v(" "),a("p",[t._v(t._s(s.qymc))]),t._v(" "),"D"==s.status?a("span",{staticClass:"status",staticStyle:{color:"#fea100"}},[t._v("待审批")]):"Y"==s.status?a("span",{staticClass:"status",staticStyle:{color:"#42a966"}},[t._v("已通过")]):"N"==s.status?a("span",{staticClass:"status",staticStyle:{color:"#d13d3d"}},[t._v("已驳回")]):t._e()])})}}])})],1)],1)])},staticRenderFns:[]};var r=a("Mz/3")(l,o,!1,function(t){a("8B22")},null,null);s.default=r.exports}});
//# sourceMappingURL=16.d8c8b05237b5a192a625.js.map