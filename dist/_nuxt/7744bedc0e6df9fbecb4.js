(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{379:function(t,e,n){t.exports=n.p+"img/22e2b8f.png"},380:function(t,e,n){var content=n(553);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("671422b4",content,!0,{sourceMap:!1})},552:function(t,e,n){"use strict";var o=n(380);n.n(o).a},553:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,".pelajaran[data-v-f0e505ce]{font-size:30px;margin-bottom:0;font-family:ElliotSans-Bold;color:#404040}.kelas[data-v-f0e505ce]{font-size:23px}",""])},655:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"koreksi-img"},[e("img",{staticClass:"img-fluid",attrs:{src:n(379)}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n          Pengatur Waktu\n          "),e("label",{staticClass:"switch ml-3"},[e("input",{attrs:{type:"checkbox"}}),this._v(" "),e("span",{staticClass:"slider round"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mt-3"},[e("a",{staticClass:"link-underline",attrs:{href:"javascript:void(0)"}},[this._v("Keluar")])])}],l=n(42),r={name:"KonfirmasiTest",data:function(){return{token:null,isLoading:!1,jmlSoal:"Load jumlah soal...",tipeSoal:"Single Choice",modules:{},soals:{},themas:{},FilteredThema:[],idSubscription:null,paketSoalId:null,ModuleId:null,subscription_id:null,module_slug:null,jumlah_soal:0}},beforeCreate:function(){var t=this;this.module_slug=this.$route.query.slug,l.a.auth().onAuthStateChanged((function(e){e&&e.getIdToken(!0).then((function(e){t.token=e;var n=t.$route.params.id;console.log("INI ID"+n);var o=t.$route.query.paket_soal;t._actionGetCountSoals(n,o);var l=t.$route.query.ModuleId;t.idSubscription=l,t.paketSoalId=o,t.ModuleId=n}))}))},mounted:function(){var t=this.$route.query.slug;this._actionGetModules(t);var e=this.$route.params.konfirmasiTest;console.log("INI ID THEMA"+e)},methods:{_actionGetModules:function(t){var e=this;this.$axios.get("https://api.edutore.com/api/v1/modules/"+t).then((function(t){var n=t.data;if("true"===t.data.success){e.modules=n.data.rows,e.themas=n.data.theme;var o=e.themas.filter((function(t){return t.id===parseInt(e.$route.params.konfirmasiTest)}));e.FilteredThema=o,console.log(o),console.log(JSON.stringify(e.thema))}}))},_actionGetCountSoals:function(t,e){var n=this;this.isLoading=!0,this.$axios.get("/count-my-module-soal/"+t+"/paket-soal/"+e,{headers:{"x-access-token":this.token}}).then((function(t){"true"===t.data.success&&(n.jumlah_soal=t.data.data)}))},StartLatihan:function(){localStorage.getItem("test_"+this.paketSoalId)&&localStorage.removeItem("test_"+this.paketSoalId),this.$router.push({path:"/my-modules/start-test/"+this.ModuleId+"/"+this.paketSoalId,query:{subscription:this.subscription_id,module_slug:this.$route.query.slug}})}}},c=(n(552),n(19)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"padding-top":"70px"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"row align-items-center"},[n("div",{staticClass:"col-md-6"},[t._m(0),t._v(" "),n("div",{staticClass:"koreksi-txt"},[n("p",{staticClass:"pelajaran"},[t._v("\n            "+t._s(t.modules.name)+"\n          ")]),t._v(" "),n("hr"),t._v(" "),n("p",{staticClass:"kelas"},[t._v("\n            Kelas "+t._s(t.modules.kelas?t.modules.kelas.name:"")+"\n          ")])])]),t._v(" "),n("div",{staticClass:"col-md-6 text-center"},[t._l(t.FilteredThema,(function(e){return n("div",{key:e.id},[n("p",{staticStyle:{"font-weight":"bold"}},[t._v("\n            "+t._s(e.theme_name)+"\n          ")]),t._v(" "),t._l(e.paket_soals,(function(e){return n("div",{key:e.id},[e.id==t.paketSoalId?n("p",[t._v("\n              "+t._s(e.name)+"\n            ")]):t._e()])}))],2)})),t._v(" "),n("p",{staticClass:"mb-0"},[t._v("\n          Jumlah Soal\n        ")]),t._v(" "),n("p",{staticClass:"mb-4"},[t._v("\n          "+t._s(t.jumlah_soal)+"\n        ")]),t._v(" "),n("p",{staticClass:"mb-0"},[t._v("\n          Tipe Soal\n        ")]),t._v(" "),n("p",{staticClass:"mb-5"},[t._v("\n          "+t._s(t.tipeSoal)+"\n        ")]),t._v(" "),t._m(1),t._v(" "),n("button",{staticClass:"btn btn-md btn-primary mt-5",on:{click:t.StartLatihan}},[n("i",{staticClass:"fa fa-play"}),t._v(" Mulai\n        ")]),t._v(" "),t._m(2)],2)])])])}),o,!1,null,"f0e505ce",null);e.default=component.exports}}]);