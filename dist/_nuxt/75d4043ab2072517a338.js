(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{379:function(t,e,n){t.exports=n.p+"img/22e2b8f.png"},381:function(t,e,n){var content=n(555);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("455fe32e",content,!0,{sourceMap:!1})},554:function(t,e,n){"use strict";var o=n(381);n.n(o).a},555:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,".pelajaran[data-v-6bb188b4]{font-size:30px;margin-bottom:0;font-family:ElliotSans-Bold;color:#404040}.kelas[data-v-6bb188b4]{font-size:23px}",""])},654:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"koreksi-img"},[e("img",{staticClass:"img-fluid",attrs:{src:n(379)}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n          Pengatur Waktu\n          "),e("label",{staticClass:"switch ml-3"},[e("input",{attrs:{type:"checkbox"}}),this._v(" "),e("span",{staticClass:"slider round"})])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"mt-3"},[e("a",{staticClass:"link-underline",attrs:{href:"javascript:void(0)"}},[this._v("Keluar")])])}],l=n(42),r={name:"KonfirmasiTest",data:function(){return{token:null,isLoading:!1,jmlSoal:"Load jumlah soal...",tipeSoal:"Single Choice",modules:{},soals:{},themas:{},FilteredThema:[],idSubscription:null,paketSoalId:null,ModuleId:null,subscription_id:null}},beforeCreate:function(){var t=this;l.a.auth().onAuthStateChanged((function(e){e&&e.getIdToken(!0).then((function(e){t.token=e;var n=t.$route.params.id;console.log("INI ID"+n);var o=t.$route.query.paket_soal,l=t.$route.query.subscription_id;t.subscription_id=l,t._actionGetSoals(n,o,l);var r=t.$route.query.ModuleId;t.idSubscription=r,t.paketSoalId=o,t.ModuleId=n}))}))},mounted:function(){var t=this.$route.query.slug;this._actionGetModules(t);var e=this.$route.params.konfirmasiTest;console.log("INI ID THEMA"+e)},methods:{_actionGetModules:function(t){var e=this;this.$axios.get("https://api.edutore.com/api/v1/modules/"+t).then((function(t){var n=t.data;if("true"===t.data.success){e.modules=n.data.rows,e.themas=n.data.theme;var o=e.themas.filter((function(t){return t.id===parseInt(e.$route.params.konfirmasiTest)}));e.FilteredThema=o,console.log(o),console.log(JSON.stringify(e.thema))}}))},_actionGetSoals:function(t,e,n){var o=this;this.isLoading=!0,this.$axios.get("https://api.edutore.com/api/v1/my-subscribe-soal/"+n+"/modules/"+t+"/paket_soal/"+e,{headers:{"x-access-token":this.token}}).then((function(t){var e=t.data;"true"===t.data.success&&(o.soals=e.data,console.log("INI DATA SOALS"+o.soals))}))}}},c=(n(554),n(19)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"padding-top":"70px"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"row align-items-center"},[n("div",{staticClass:"col-md-6"},[t._m(0),t._v(" "),n("div",{staticClass:"koreksi-txt"},[n("p",{staticClass:"pelajaran"},[t._v("\n            "+t._s(t.modules.name)+"\n          ")]),t._v(" "),n("hr"),t._v(" "),n("p",{staticClass:"kelas"},[t._v("\n            Kelas "+t._s(t.modules.kelas?t.modules.kelas.name:"")+"\n          ")])])]),t._v(" "),n("div",{staticClass:"col-md-6 text-center"},[t._l(t.FilteredThema,(function(e){return n("div",{key:e.id},[n("p",{staticStyle:{"font-weight":"bold"}},[t._v("\n            "+t._s(e.theme_name)+"\n          ")]),t._v(" "),t._l(e.paket_soals,(function(e){return n("div",{key:e.id},[e.id==t.paketSoalId?n("p",[t._v("\n              "+t._s(e.name)+"\n            ")]):t._e()])}))],2)})),t._v(" "),n("p",{staticClass:"mb-0"},[t._v("\n          Jumlah Soal\n        ")]),t._v(" "),n("p",{staticClass:"mb-4"},[t._v("\n          "+t._s(t.soals.count)+"\n        ")]),t._v(" "),n("p",{staticClass:"mb-0"},[t._v("\n          Tipe Soal\n        ")]),t._v(" "),n("p",{staticClass:"mb-5"},[t._v("\n          "+t._s(t.tipeSoal)+"\n        ")]),t._v(" "),t._m(1),t._v(" "),n("nuxt-link",{staticClass:"btn btn-primary mt-5",attrs:{to:{path:"/my-modules/start-test/"+t.ModuleId+"/"+t.paketSoalId,query:{subscription:t.subscription_id}}}},[t._v("\n          Mulai\n        ")]),t._v(" "),t._m(2)],2)])])])}),o,!1,null,"6bb188b4",null);e.default=component.exports}}]);