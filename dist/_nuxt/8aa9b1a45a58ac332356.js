(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{313:function(t,e,n){t.exports=n.p+"img/1b0cfe0.gif"},359:function(t,e,n){var content=n(505);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("372b0b1c",content,!0,{sourceMap:!1})},504:function(t,e,n){"use strict";var o=n(359);n.n(o).a},505:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,"h2[data-v-4f091dac],p[data-v-4f091dac]{color:#000}.brand[data-v-4f091dac]{height:40px;width:auto}.bd-links[data-v-4f091dac]{padding-top:1px;padding-bottom:1rem;margin-right:-15px;margin-left:-15px}.flex-container[data-v-4f091dac]{padding:0;margin:auto;list-style:none;display:-webkit-box;display:-webkit-flex;float:left;display:flex;justify-content:space-around}.flex-item[data-v-4f091dac]{background-color:grey;padding:5px;width:40px;height:40px;margin-top:10px;margin-left:1px;margin-right:1px;line-height:30px;color:#fff;font-weight:700;font-size:20px;text-align:center;cursor:pointer}.item_active[data-v-4f091dac]{background:#557cbe}.sessi-active[data-v-4f091dac]{color:#3aa03a}",""])},629:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[e("img",{staticClass:"img-fluid",attrs:{src:n(57),alt:"~/assets/img/edutore.png"}})])}],r=n(8),l=n(119),c=n.n(l),d=n(120),h=n(42);r.default.use(c.a);var f={name:"StartUjian",data:function(){return{User:null,photo:null,loadingSoal:!0,answer:[],jawabans:[],soals:[],number_nav:[],currentAnswer:null,current_soal:null,sesiUjian:[],ujianId:null,pathImages:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",pathImagesQ:"https://storage.googleapis.com/edutore-cdn/public/soal/question/",pathImagesAnswer:"https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",token:null,UserHasRegistered:!1,count_sesi_ujian:0,current_sesi:0,sesi_id:null,title:"Edutore Tryout ",content:""}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.content},{hid:"og-description",property:"og:description",content:this.content},{hid:"og-author",property:"og:author",content:"Edutore Gramedia"},{hid:"og-title",property:"og:title",content:this.content},{hid:"og-site_name",property:"og:site_name",content:this.content}]}},beforeCreate:function(){var t=this;h.a.auth().onAuthStateChanged((function(e){if(e){t.User=e.displayName,t.photo=e.photoURL,e.getIdToken(!0).then((function(e){t.token=e}));var n=t.$route.query._id,o=t.$route.query.sesi_ujian;t.ujianId=n,t.sesi_id=o,setTimeout((function(){t._actionGetQuestion(n,o)}),1e3)}else t.$router.push({path:"/login",query:{ujian_id:t.$route.query._id,slug:t.$route.query.slug}})}))},methods:{_actionGetQuestion:function(t,e){var n=this,data={ujian_id:t,sesi_id:e};d.a.post("soal-ujian-in-sesi-private",data,{headers:{"x-access-token":this.token}}).then((function(t){console.log("Response Soal in Ujian "+JSON.stringify(t.data.data)),n.loadingSoal=!1,n.UserHasRegistered=!0;var e=t.data.data;n.title+="| "+e.sesi_ujian,n.soals=t.data.data.soals,n.sesiUjian.push(e),n.current_soal=n.soals[0]._id})).catch((function(t){var e=t.response.data;n.$notify({group:"foo",type:"warn",title:e.message,text:e.data.code?e.data:null})}))},_nextSesiUjian:function(t,e){var n=this;d.a.get("peserta-soal-ujian/ujian/"+e,{headers:{"x-access-token":this.token}}).then((function(e){n.UserHasRegistered=!0,n.soals=e.data.data[t].soals,n.sesiUjian={_id:e.data.data[t]._id,name:e.data.data[t].sesi_ujian,duration:e.data.data[t].duration},n.current_soal=n.soals[t]._id,console.log(n.soals[t])})).catch((function(t){var e=t.response.data;n.$notify({group:"foo",type:"warn",title:e.message,text:e.data.code?e.data:null})}))},_actionShowAnswer:function(){var t=this;setInterval((function(){var e=t.makeid(5);t.asnswer.push({name:e});var n=document.getElementById("realAns");n.scrollTop=n.scrollHeight}),500)},_actionAnswer:function(t,e,n){console.log(this.soals.length);var o=this.soals.length;n===parseInt(o)-1?n=0:n+=1,this._actionStoreAnswer(t,e,n)},_actionStoreAnswer:function(t,e,n){var o=this,data={soal_id:t,jawaban_id:e};d.a.post("jawab-soal-ujian/sesi-ujian/"+this.current_sesi,data,{headers:{"x-access-token":this.token}}).then((function(e){if("true"===e.data.success){document.getElementById(t).className+=" item_active";var r=o.soals[n]._id;o._moveNumber(r)}}))},_moveNumber:function(t){this._actionChechExsistAnswer(t),this.current_soal=t},_actionChechExsistAnswer:function(t){var e=this;d.a.get("check-jawaban-in-sesi-ujian?sesi_id="+this.current_sesi+"&soal_id="+t,{headers:{"x-access-token":this.token}}).then((function(t){var n=t.data.data.jawaban;e.currentAnswer=n._id})).catch((function(t){console.log(t),e.currentAnswer=null}))},_actionEndUjian:function(){this.$router.push({path:"/start-ujian/nilai",query:{ujian_id:this.ujianId}})}}},_=(n(504),n(19)),component=Object(_.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("notifications",{attrs:{group:"foo"}}),t._v(" "),o("nav",{staticClass:"navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top"},[o("div",{staticClass:"container align-items-end"},[t._m(0),t._v(" "),o("b-navbar-toggle",{attrs:{target:"nav-collapse"}})],1)]),t._v(" "),t.loadingSoal?o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row"},[o("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default",title:"Mengambil Soal"},model:{value:t.loadingSoal,callback:function(e){t.loadingSoal=e},expression:"loadingSoal"}},[o("h2",{staticClass:"h5 text-center"},[t._v("\n          Mengambil Soal\n        ")]),t._v(" "),o("div",{staticClass:"row justify-content-center"},[o("div",{staticClass:"d-flex justify-content-center"},[o("img",{staticClass:"img-fluid",staticStyle:{width:"100px"},attrs:{src:n(313),alt:"~/assets/img/edu-wink.gif"}})])]),t._v(" "),o("p",{staticClass:"text-center mt-2"},[t._v("\n          Loading...\n        ")])])],1)]):o("div",[t.UserHasRegistered?o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row flex-xl-nowrap2"},[o("div",{staticClass:"bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12"},[o("nav",{staticClass:"bd-links d-none d-md-block",attrs:{id:"bd-docs-nav","aria-label":"Main navigation"}},[o("div",{staticClass:"mt-0"},[o("div",{staticStyle:{width:"70%",height:"auto","margin-left":"auto","margin-right":"auto"}},[o("b-img",{attrs:{src:t.photo,thumbnail:"",fluid:"",alt:"Image 1"}})],1)]),t._v(" "),o("div",{attrs:{target:"_self"}},[o("a",{staticClass:"bd-toc-link",attrs:{href:"/",target:"_self"}},[t._v(t._s(t.User))]),t._v(" "),t._l(t.soals,(function(e,n){return o("ul",{key:e._id,staticClass:"flex-container justify-content-center"},[o("li",{staticClass:"flex-item",attrs:{id:e._id}},[t._v("\n                  "+t._s(++n)+"\n                ")])])}))],2)])]),t._v(" "),o("div",{staticClass:"bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5"},[o("div",{staticClass:"clearfix d-block"}),t._v(" "),o("main",{staticClass:"bd-main pt-2"},t._l(t.soals,(function(e,i){return o("section",{key:e._id},[o("transition",{attrs:{"enter-active-class":"animated fadeInUp"}},[t.current_soal===e._id?o("div",[o("p",{staticStyle:{color:"black"},domProps:{innerHTML:t._s(e.soal_text)}}),t._v(" "),e.soal_image?o("b-img",{attrs:{src:t.pathImagesQ+e.soal_image,thumbnail:"",fluid:""}}):t._e(),t._v(" "),[o("ol",{staticClass:"mt-1",attrs:{type:"A"}},t._l(e.jawabans,(function(e){return o("li",{key:e._id},[t.currentAnswer===e._id?o("b-button",{staticClass:"active",staticStyle:{"margin-bottom":"2px"},attrs:{block:"",variant:"outline-secondary"},on:{click:function(n){return t._actionAnswer(e.soal_id,e._id,i)}}},[o("p",{staticStyle:{color:"black","text-align":"left"},domProps:{innerHTML:t._s(e.jawaban_text)}})]):o("b-button",{staticStyle:{"margin-bottom":"2px"},attrs:{block:"",variant:"outline-secondary"},on:{click:function(n){return t._actionAnswer(e.soal_id,e._id,i)}}},[o("p",{staticStyle:{color:"black","text-align":"left"},domProps:{innerHTML:t._s(e.jawaban_text)}})])],1)})),0)]],2):t._e()])],1)})),0),t._v(" "),o("div",{staticClass:"row justify-content-center"},[o("div",{staticClass:"col-sm-2"},[o("b-button",{attrs:{variant:"primary",pill:"",block:""},on:{click:t._actionEndUjian}},[o("font-awesome-icon",{attrs:{icon:"flag"}}),t._v(" Akhiri\n              ")],1)],1)])])])]):o("div",[o("UnauthorizedUjian")],1)])],1)}),o,!1,null,"4f091dac",null);e.default=component.exports}}]);