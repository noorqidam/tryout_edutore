(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{366:function(t,l,e){var content=e(519);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(21).default)("116ce4c3",content,!0,{sourceMap:!1})},518:function(t,l,e){"use strict";var n=e(366);e.n(n).a},519:function(t,l,e){(t.exports=e(20)(!1)).push([t.i,"html[data-v-66d8bf20]{scroll-behavior:smooth}.card-bottom[data-v-66d8bf20]{width:80%;padding:10px;margin-left:auto;margin-right:auto}.bg-text[data-v-66d8bf20]{text-align:left;font-family:Elliot Sans;font-style:normal;font-weight:700;font-size:25px;color:#1e9cd7}.bg-primarys[data-v-66d8bf20]{padding:6px;background-color:#1e9cd7;color:#fff;font-size:20px;text-align:center;font-weight:700}.text-black[data-v-66d8bf20]{color:#000}.tabs>ul[data-v-66d8bf20]{background-color:#1e9cd7;color:#fff}p[data-v-66d8bf20]{color:#000}.breadcrumb-item.active[data-v-66d8bf20]{color:#fff}.cont-content[data-v-66d8bf20]{background-color:#fff;border-radius:5px}.txt-datper[data-v-66d8bf20]{font-size:20px;color:#1e9cd7;font-family:ElliotSans-Bold}.div-left[data-v-66d8bf20]{border-right:2px solid #9f9f9f}@media (max-width:765.98px){.div-left[data-v-66d8bf20]{border:0}}.label-data[data-v-66d8bf20]{font-size:15px;font-family:ElliotSans-Bold;color:#3f3f3f}.txt-datper-2[data-v-66d8bf20]{font-size:15px;font-family:ElliotSans-Medium;color:grey}.title-test[data-v-66d8bf20]{font-size:20px;color:#3f3f3f;font-family:ElliotSans-Bold}.title-penyelenggara[data-v-66d8bf20]{font-size:17px;color:grey;font-family:ElliotSans-Medium}.div-nilai[data-v-66d8bf20]{border-top:2px solid #9f9f9f}.title-hasil[data-v-66d8bf20]{font-size:17px;color:#404040;font-family:ElliotSans-Medium;margin-top:5px}.txt-nilai[data-v-66d8bf20]{font-size:40px;color:#1e9cd7;font-family:ElliotSans-Bold}.btn-to-email[data-v-66d8bf20]{font-size:15px;color:#fff}.btn-back-main[data-v-66d8bf20],.btn-to-email[data-v-66d8bf20]{font-family:ElliotSans-Medium}.btn-back-main[data-v-66d8bf20]{color:#1e9cd7;font-size:12px}",""])},622:function(t,l,e){"use strict";e.r(l);var n=e(42),o={name:"ShowNilaiUjian",data:function(){return{attribute:[{key:"sesi_ujian",label:"Sesi Ujian",sortable:!0,sortDirection:"desc"},{key:"point",label:"Nilai"},{key:"count",label:"Jumlah Soal"}],nilai:null,User:null,photo:null,token:null,ujian_id:null,judul_ujian:null,ujian:{},sesiujian:[]}},beforeMount:function(){var t=this;n.a.auth().onAuthStateChanged((function(l){l?(t.User=l.displayName,t.photo=l.photoURL,t.ujian_id=t.$route.query.ujian_id,t.judul_ujian=t.$route.query.judul_ujian,l.getIdToken(!0).then((function(l){t.token=l,t._actionGetNilaiQuiz()}))):t.$router.push({path:"/login",query:{ujian_id:t.$route.query._id}})}))},methods:{_actionGetNilaiQuiz:function(){var t=this,data={ujian_id:this.ujian_id};this.$axios.post("nilai-ujian",data,{headers:{"x-access-token":this.token}}).then((function(l){"true"===l.data.success&&(t.nilai=l.data.data,t.quiz=l.data.quiz,t.sesiujian=l.data.data)})).catch((function(l){t.message=l.response.data}))}}},d=(e(518),e(19)),component=Object(d.a)(o,(function(){var t=this,l=t.$createElement,e=t._self._c||l;return e("div",{staticClass:"container-fluid",staticStyle:{"background-color":"#fafafa"}},[e("div",{staticClass:"container",staticStyle:{"margin-top":"80px"}},[e("div",{staticClass:"row bg-white",staticStyle:{"font-family":"ElliotSans"}},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"row mx-5"},[e("div",{staticClass:"col-md-6 div-left pt-3 mt-2"},[e("div",{staticClass:"row"},[t._m(0),t._v(" "),e("div",{staticClass:"col-6"},[e("img",{staticClass:"img-fluid",staticStyle:{width:"150px"},attrs:{src:t.photo,alt:t.User}}),t._v(" "),e("h1",{staticStyle:{"font-size":"20px",color:"#fff","font-family":"ElliotSans-Bold"}},[t._v("\n                  .\n                ")])]),t._v(" "),e("div",{staticClass:"col-6 col-sm-6 col-md-6"},[e("h3",{staticClass:"label-data"},[t._v("\n                  Nama Peserta\n                ")]),t._v(" "),e("h5",{staticClass:"txt-datper-2"},[t._v("\n                  "+t._s(t.User)+"\n                ")])])])]),t._v(" "),e("div",{staticClass:"col-md-6",staticStyle:{"font-family":"ElliotSans-Bold"}},[e("div",{staticClass:"text-center mt-2"},[e("h1",{staticClass:"title-test"},[t._v("\n                "+t._s(t.judul_ujian)+"\n              ")]),t._v(" "),e("h1",{staticClass:"title-penyelenggara"},[t._v("\n                Penyelenggara Ujian "+t._s(t.ujian.penyelenggara)+"\n              ")])]),t._v(" "),t._m(1),t._v(" "),t.nilai?t._e():e("div",{staticClass:"text-center"},[t._v("\n              Mengambil nilai ...\n            ")]),t._v(" "),e("div",[e("b-table",{attrs:{items:t.sesiujian,fields:t.attribute,"show-empty":"",small:"","sticky-header":"","head-variant":"dark",responsive:""}})],1),t._v(" "),e("div",{staticClass:"text-center mt-5"},[e("nuxt-link",{staticClass:"btn-back-main",attrs:{to:"/"}},[t._v("\n                Kembali ke halaman utama\n              ")])],1)])])])])]),t._v(" "),e("Footer")],1)}),[function(){var t=this.$createElement,l=this._self._c||t;return l("div",{staticClass:"col-12"},[l("h1",{staticClass:"txt-datper"},[this._v("\n                  Data Peserta\n                ")])])},function(){var t=this.$createElement,l=this._self._c||t;return l("div",{staticClass:"text-center div-nilai"},[l("h2",{staticClass:"title-hasil"},[this._v("\n                Nilai Akhir\n              ")]),this._v(" "),l("h1",{staticClass:"txt-nilai"})])}],!1,null,"66d8bf20",null);l.default=component.exports}}]);