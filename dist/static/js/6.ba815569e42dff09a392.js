webpackJsonp([6],{"/ugG":function(e,t,a){"use strict";var o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"commonUpload"},[this.uploadFile?t("div",{staticClass:"fileBox"},[t("img",{attrs:{src:this.uploadFile}})]):this._e()])},staticRenderFns:[]};var n=a("Mz/3")({props:["file","title"],data:function(){return{uploadFile:""}},watch:{file:function(e){this.uploadFile=e}},mounted:function(){this.uploadFile=this.file}},o,!1,function(e){a("H4RY")},"data-v-96efc5b0",null);t.a=n.exports},"0nR5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("34v0"),n=a.n(o),s=a("TVG1"),i=a("4Zt/"),l=a("Cl3J"),r=a("4m8a"),d=a("/ugG"),f={data:function(){return{loading:!1,registerInfo:{payload:n()({},s.a.getsessionStorage("userInfo"),{file1:{},file2:{},file3:{}}),step2:{disabled:!0}}}},methods:{clearFun:function(e){this.registerInfo.payload[e]="",this.showNext()},showNext:function(){if(this.registerInfo.step2.disabled=!0,!this.registerInfo.payload.ztmc)return!1;if(!this.registerInfo.payload.bm)return!1;if("C"==this.registerInfo.payload.type){if(!this.registerInfo.payload.fddbr)return!1;if(!this.registerInfo.payload.file1.content)return!1;if(!this.registerInfo.payload.file2.content)return!1;if(!this.registerInfo.payload.file3.content)return!1}else{if(!this.registerInfo.payload.file1.content)return!1;if(!this.registerInfo.payload.file2.content)return!1}this.registerInfo.step2.disabled=!1},onRead1:function(e){this.registerInfo.payload.file1=e,this.showNext()},onRead2:function(e){this.registerInfo.payload.file2=e,this.showNext()},onRead3:function(e){this.registerInfo.payload.file3=e,this.showNext()},registerFun:function(){var e=this;this.loading=!0;var t=new FormData;t.append("id",this.registerInfo.payload.id),t.append("ztmc",this.registerInfo.payload.ztmc),t.append("bm",""),t.append("type",this.registerInfo.payload.type),"C"==this.registerInfo.payload.type?(t.append("fddbr",this.registerInfo.payload.fddbr),t.append("zjwj",this.registerInfo.payload.file1.file),t.append("sfzwjFront",this.registerInfo.payload.file2.file),t.append("sfzwjBack",this.registerInfo.payload.file3.file)):(t.append("sfzwjFront",this.registerInfo.payload.file1.file),t.append("sfzwjBack",this.registerInfo.payload.file2.file));i.a.axiosInstance.post("/credit-data-xypj/xypj/gateway/repeatModifyUserInfo.json",t,{headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(e){return e}]}).then(function(t){e.loading=!1,e.$toast("提交成功")}).catch(function(t){e.loading=!1})}},mounted:function(){},components:{Layout:l.a,Headerlevel2:r.a,CommonUpload:d.a}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("Headerlevel2",{attrs:{slot:"header",title:e.$route.meta.title},slot:"header"}),e._v(" "),a("div",{staticClass:"Authentication"},[a("div",{staticClass:"registerArea"},["C"==e.registerInfo.payload.type?a("div",[a("van-field",{attrs:{disabled:"",clearable:"",placeholder:"企业名称"},on:{keyup:e.showNext,clear:function(t){e.clearFun("ztmc")}},model:{value:e.registerInfo.payload.ztmc,callback:function(t){e.$set(e.registerInfo.payload,"ztmc",t)},expression:"registerInfo.payload.ztmc"}}),e._v(" "),a("van-field",{attrs:{disabled:"",clearable:"",placeholder:"统一社会信用代码"},on:{keyup:e.showNext,clear:function(t){e.clearFun("bm")}},model:{value:e.registerInfo.payload.bm,callback:function(t){e.$set(e.registerInfo.payload,"bm",t)},expression:"registerInfo.payload.bm"}}),e._v(" "),a("van-field",{attrs:{disabled:"",clearable:"",placeholder:"法定代表人"},on:{keyup:e.showNext,clear:function(t){e.clearFun("fddbr")}},model:{value:e.registerInfo.payload.fddbr,callback:function(t){e.$set(e.registerInfo.payload,"fddbr",t)},expression:"registerInfo.payload.fddbr"}}),e._v(" "),a("van-panel",{staticClass:"uploadImgField"},[a("template",{attrs:{lang:"html"},slot:"header"},[a("div",{staticClass:"header"},[a("span",[e._v("上传证照")])])]),e._v(" "),a("div",{staticClass:"uploadImgFieldImage"},[a("van-uploader",{attrs:{slot:"button","after-read":e.onRead1},slot:"button"},[a("CommonUpload",{attrs:{file:e.registerInfo.payload.file1.content}}),e._v(" "),a("span",{staticClass:"title"},[e._v("营业执照正面照")])],1),e._v(" "),a("van-uploader",{attrs:{slot:"button","after-read":e.onRead2},slot:"button"},[a("CommonUpload",{attrs:{file:e.registerInfo.payload.file2.content}}),e._v(" "),a("span",{staticClass:"title"},[e._v("法人身份证正面照")])],1),e._v(" "),a("van-uploader",{attrs:{slot:"button","after-read":e.onRead3},slot:"button"},[a("CommonUpload",{attrs:{file:e.registerInfo.payload.file3.content}}),e._v(" "),a("span",{staticClass:"title"},[e._v("法人身份证反面照")])],1)],1)],2)],1):a("div",[a("van-field",{attrs:{disabled:"",placeholder:"姓名"},model:{value:e.registerInfo.payload.ztmc,callback:function(t){e.$set(e.registerInfo.payload,"ztmc",t)},expression:"registerInfo.payload.ztmc"}}),e._v(" "),a("van-field",{attrs:{disabled:"",placeholder:"身份证号"},model:{value:e.registerInfo.payload.bm,callback:function(t){e.$set(e.registerInfo.payload,"bm",t)},expression:"registerInfo.payload.bm"}}),e._v(" "),a("van-panel",{staticClass:"uploadImgField"},[a("template",{attrs:{lang:"html"},slot:"header"},[a("div",{staticClass:"header"},[a("span",[e._v("上传证照")])])]),e._v(" "),a("div",{staticClass:"uploadImgFieldImage"},[a("van-uploader",{attrs:{slot:"button","after-read":e.onRead1},slot:"button"},[a("CommonUpload",{attrs:{file:e.registerInfo.payload.file1.content}}),e._v(" "),a("span",{staticClass:"title"},[e._v("身份证正面照")])],1),e._v(" "),a("van-uploader",{attrs:{slot:"button","after-read":e.onRead2},slot:"button"},[a("CommonUpload",{attrs:{file:e.registerInfo.payload.file2.content}}),e._v(" "),a("span",{staticClass:"title"},[e._v("身份证反面照")])],1)],1)],2)],1)]),e._v(" "),a("div",{staticClass:"registerBtn"},[a("van-button",{staticClass:"van-button--custom",attrs:{round:"",loading:e.loading,disabled:e.registerInfo.step2.disabled,block:!0,size:"normal"},on:{click:e.registerFun}},[e._v("提交实名")])],1)])],1)},staticRenderFns:[]};var c=a("Mz/3")(f,p,!1,function(e){a("PcoU")},"data-v-e57bc4c0",null);t.default=c.exports},H4RY:function(e,t){},PcoU:function(e,t){}});
//# sourceMappingURL=6.ba815569e42dff09a392.js.map