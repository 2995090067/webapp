webpackJsonp([28],{"96Dk":function(t,e){},p5Xl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("TVG1"),a("4Zt/");var n=a("Cl3J"),c=a("4m8a"),r={data:function(){return{active:0,hcbgPage:[{title:"在线申请",name:"ZxsqPage"},{title:"进度查询",name:"JdcxPage"}],currentTab:{}}},methods:{customBackFun:function(){this.$router.push({name:"SecondPage"})},changeTab:function(t,e){this.currentTab=this.hcbgPage[t],this.$router.push({name:this.currentTab.name,query:this.$route.query})}},mounted:function(){this.currentTab=this.hcbgPage[0]},components:{Layout:n.a,Headerlevel2:c.a}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layout"},[a("Headerlevel2",{attrs:{slot:"header",title:"核查报告",customBackFun:t.customBackFun},slot:"header"}),t._v(" "),a("div",{staticClass:"customTab"},[a("van-tabs",{attrs:{type:"card"},on:{click:t.changeTab},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.hcbgPage,function(t,e){return a("van-tab",{key:e,attrs:{title:t.title}})}),1)],1),t._v(" "),a("router-view")],1)},staticRenderFns:[]};var s=a("Mz/3")(r,u,!1,function(t){a("96Dk")},"data-v-1f323289",null);e.default=s.exports}});
//# sourceMappingURL=28.1c295c46816ba63e16a5.js.map