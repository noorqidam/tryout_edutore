(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{327:function(t,e,n){var content=n(423);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("43beeae0",content,!0,{sourceMap:!1})},422:function(t,e,n){"use strict";var o=n(327);n.n(o).a},423:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,"html[data-v-0de3a507]{scroll-behavior:smooth}.card-bottom[data-v-0de3a507]{width:80%;padding:10px;margin-left:auto;margin-right:auto}.bg-text[data-v-0de3a507]{text-align:left;font-family:Elliot Sans;font-style:normal;font-weight:700;font-size:25px;color:#1e9cd7}.bg-primarys[data-v-0de3a507]{padding:6px;background-color:#1e9cd7;color:#fff;font-size:20px;text-align:center;font-weight:700}.text-black[data-v-0de3a507]{color:#000}.tabs>ul[data-v-0de3a507]{background-color:1000000000cd7;color:#fff}p[data-v-0de3a507]{color:#000}.breadcrumb-item.active[data-v-0de3a507]{color:#fff}hr[data-v-0de3a507]{border:0;margin-bottom:1px;border-top:10px solid rgba(0,0,0,.1)}.cont-content[data-v-0de3a507]{background-color:#fff;border-radius:5px}.title-test[data-v-0de3a507]{font-size:20px;color:#3f3f3f;font-family:ElliotSans-Bold}.title-penyelenggara[data-v-0de3a507]{font-size:17px;color:grey;font-family:ElliotSans-Medium}.div-left[data-v-0de3a507]{border-top:2px solid #9f9f9f}.div-left-2[data-v-0de3a507]{border-right:2px solid #9f9f9f}@media (max-width:767.98px){.div-left-2[data-v-0de3a507]{border:0}}",""])},656:function(t,e,n){"use strict";n.r(e);var o={components:{Header:function(){return n.e(11).then(n.bind(null,669))}},data:function(){return{text:"",name:"",email:"",no:null,imageData:"https://bbpsdmp-medan.kominfo.go.id/wp-content/uploads/2019/04/Pas%20Foto%203x4.jpg"}},methods:{onFileChange:function(t){var e=t.target.files[0];this.imageData=URL.createObjectURL(e)},checkForm:function(t){if(this.text)return!0;alert("mulai"),t.preventDefault()},testAlert:function(){alert("Mulai Test")}}},l=(n(422),n(19)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid",staticStyle:{"background-color":"#fff"}},[n("Header"),t._v(" "),n("div",{staticClass:"container cont-content"},[n("section",{staticStyle:{"margin-top":"80px"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[t._m(0),t._v(" "),n("div",{staticClass:"col-md-12 mt-3 div-left"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 offset-md-1 pt-3 text-center mt-2 div-left-2"},[n("img",{staticClass:"card-img-top",staticStyle:{width:"150px"},attrs:{src:t.imageData,alt:"Card image"}}),n("br"),t._v(" "),n("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:t.onFileChange}}),t._v(" "),n("b-button",{staticClass:"btn btn-block btn-primary mt-2",on:{click:function(e){return t.$refs.fileInput.click()}}},[t._v("\n                  Unggah Foto\n                ")]),t._v(" "),n("p",[t._v("Format: .jpg, .jpeg, .png, (max 3MB).")])],1),t._v(" "),n("div",{staticClass:"col-md-5"},[n("form",{staticClass:"mt-3",attrs:{method:"POST"},on:{submit:t.checkForm}},[n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"name"}},[t._v("Nama lengkap")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{id:"name",name:"name",type:"text"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{id:"email",name:"email",type:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{attrs:{for:"no"}},[t._v("No. HP")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.no,expression:"no"}],staticClass:"form-control",attrs:{id:"no",name:"no",type:"number"},domProps:{value:t.no},on:{input:function(e){e.target.composing||(t.no=e.target.value)}}})]),t._v(" "),n("input",{ref:"formInput",staticStyle:{display:"none"},attrs:{type:"submit",value:"Submit"},on:{change:t.checkForm}}),t._v(" "),n("button",{staticClass:"btn btn-block btn-warning",on:{click:t.testAlert}},[t._v("\n                    Lanjutkan ke Tes\n                  ")])])])])])])])])])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col-md-6 text-center offset-md-3 mt-4"},[e("h1",{staticClass:"title-test"},[this._v("\n              Judul Live Test 1 yang Akan Diikuti Peserta (Full Judul Live Test)\n            ")]),this._v(" "),e("h1",{staticClass:"title-penyelenggara"},[this._v("\n              Penyelenggara Ujian\n            ")])])}],!1,null,"0de3a507",null);e.default=component.exports}}]);