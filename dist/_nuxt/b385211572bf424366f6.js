(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{314:function(t,e,o){t.exports=o.p+"img/554696d.png"},350:function(t,e,o){var content=o(487);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(21).default)("3e9c1492",content,!0,{sourceMap:!1})},486:function(t,e,o){"use strict";var n=o(350);o.n(n).a},487:function(t,e,o){(t.exports=o(20)(!1)).push([t.i,".card-table[data-v-437ea4a4]{min-height:410px;border-radius:12px;box-shadow:0 4px 8px rgba(0,0,0,.5);margin-bottom:24px;padding-bottom:10px}.title-konten[data-v-437ea4a4]{padding:30px 30px 0;font-size:25px;color:#1e9cd7;font-family:ElliotSans-Regular}.row-book[data-v-437ea4a4]{padding:15px}.books[data-v-437ea4a4]{margin-bottom:10px}.title-book[data-v-437ea4a4]{text-decoration:none}.title-book[data-v-437ea4a4],.title-book[data-v-437ea4a4]:hover{font-size:13px;color:#404040;margin:14px 0;font-family:ElliotSans-Regular}.default-image[data-v-437ea4a4]{width:100%;min-height:155.5px;border-radius:5px}.keranjang-kosong[data-v-437ea4a4]{text-align:center;width:100%;margin:0 auto}",""])},642:function(t,e,o){"use strict";o.r(e);var n=o(42),l={components:{LoaderHistori2:function(){return o.e(92).then(o.bind(null,689))}},data:function(){return{myModule:[],show:!1,User:null,pathImage:"https://cdn.edutore.com/public/module/thumb/"}},beforeCreate:function(){var t=this;n.a.auth().onAuthStateChanged((function(e){e&&(t.User=e.displayName,e.getIdToken(!0).then((function(e){t._actionGetHistoryUjian(e)})))}))},methods:{_actionGetHistoryUjian:function(t){var e=this;this.$axios.get("https://api.edutore.com/api/v1/my-modules",{headers:{"x-access-token":t}}).then((function(t){var o=t.data.data.rows;"true"===t.data.success?(e.myModule=o,e.show=!0):e.show=!1}))}}},r=(o(486),o(19)),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.show?n("div",{staticClass:"col card-table"},[t._m(0),t._v(" "),0!==t.myModule.length?n("div",{staticClass:"row"},t._l(t.myModule,(function(e,o){return n("div",{key:o,staticClass:"col-6 col-lg-2 col-sm-4"},[n("div",{staticClass:"books"},[n("div",{staticClass:"detail-buku"},[n("img",{staticClass:"img-thumbnail",attrs:{src:t.pathImage+e.module.image}}),t._v(" "),n("a",{staticClass:"title-book",attrs:{href:"#"}},[t._v(t._s(e.module.name))])])])])})),0):n("div",{staticClass:"keranjang-kosong",staticStyle:{"font-family":"ElliotSans-Regular"}},[n("img",{staticStyle:{width:"30%"},attrs:{src:o(314)}}),t._v(" "),n("h6",{staticClass:"mt-3"},[t._v("\n        Anda belum memiliki history ujian. Silahkan mulai ujian untuk melihat history ujian.\n      ")]),t._v(" "),n("nuxt-link",{attrs:{to:"/"}},[n("h6",[t._v("Ujian Sekarang")])])],1)]):n("div",{staticClass:"card-table p-2"},[n("LoaderHistori2")],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("h2",{staticClass:"title-konten"},[this._v("\n        Koleksi Modul Saya\n      ")])])}],!1,null,"437ea4a4",null);e.default=component.exports}}]);