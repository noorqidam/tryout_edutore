(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{395:function(t,e,o){var content=o(587);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(21).default)("419267c9",content,!0,{sourceMap:!1})},586:function(t,e,o){"use strict";var n=o(395);o.n(n).a},587:function(t,e,o){(t.exports=o(20)(!1)).push([t.i,".swiper-inner[data-v-3ca566a8]{width:100%;height:400px;padding-top:50px;padding-bottom:50px}.swiper-slide[data-v-3ca566a8]{background-position:50%;background-size:cover;min-height:340px}.title-book[data-v-3ca566a8]{color:#424242}.title-book[data-v-3ca566a8],.title-rec[data-v-3ca566a8]{font-family:ElliotSans-Regular}.title-rec[data-v-3ca566a8]{font-size:21px;color:#1e9cd7}.card-campaign[data-v-3ca566a8]{border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,.4);margin-bottom:5px;margin-top:5px;background-color:#fff}",""])},676:function(t,e,o){"use strict";o.r(e);o(31);var n=o(120),r={components:{LoaderCampaign:function(){return o.e(3).then(o.bind(null,668))}},data:function(){return{swiperOption:{slidesPerView:5,pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{1024:{slidesPerView:5},768:{slidesPerView:4.6},640:{slidesPerView:1.6},320:{slidesPerView:1.6}}},pathImage:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",items:[],show:!1,pathModuleEdutore:"https://edutore.com/modules/"}},mounted:function(){this._actionGetModulRecom()},methods:{_actionGetModulRecom:function(){var t=this;return regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(n.a.get("https://api.edutore.com/api/v1/recommendations").then((function(e){var o=e.data.data.rows;"true"===e.data.success?(t.items=o[Math.floor(4*Math.random())].rekomendasi_module,t.show=!0):t.show=!1})));case 2:case"end":return e.stop()}}))}}},c=(o(586),o(19)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t.show?o("div",[t._m(0),t._v(" "),o("swiper",{attrs:{options:t.swiperOption}},[t._l(t.items,(function(e){return o("swiper-slide",{key:e.id,staticClass:"col-6 col-md-2 m-3 card-campaign"},[o("div",[o("a",{staticStyle:{"text-decoration":"none"},attrs:{href:t.pathModuleEdutore+e.modules.module_slug,target:"_blank"}},[o("div",{staticClass:"pt-2"},[o("img",{staticClass:"img-fluid",staticStyle:{"border-radius":"5px"},attrs:{src:t.pathImage+e.modules.image,alt:"index2"}})]),t._v(" "),o("div",{staticClass:"mt-1 p-1"},[o("p",{staticClass:"mb-1 title-book"},[t._v("\n                "+t._s(e.modules.name.substr(0,30))+" . . . . .\n              ")])])])])])})),t._v(" "),o("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1):o("div",[t._m(1),t._v(" "),o("LoaderCampaign")],1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{staticClass:"title-rec"},[e("b",[this._v("Rekomendasi")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{staticClass:"title-rec"},[e("b",[this._v("Rekomendasi")])])}],!1,null,"3ca566a8",null);e.default=component.exports}}]);