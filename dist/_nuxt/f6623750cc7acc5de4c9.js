(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{387:function(t,e,n){var content=n(571);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("6106b604",content,!0,{sourceMap:!1})},570:function(t,e,n){"use strict";var r=n(387);n.n(r).a},571:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,".card[data-v-7feffef3]{min-height:376px;width:100%;box-shadow:0 4px 8px rgba(0,0,0,.5);margin-bottom:24px}.card[data-v-7feffef3],.img-fluid[data-v-7feffef3]{border-radius:12px}.img-fluid[data-v-7feffef3]{max-height:218px;min-height:218px}.title-book[data-v-7feffef3]{font-size:13px;color:#404040;font-family:ElliotSans-Medium;min-height:40px}.title-penyelenggara[data-v-7feffef3]{font-size:12px;color:grey;font-family:ElliotSans-Medium;min-height:0!important}.title-date[data-v-7feffef3]{color:#557cbf;font-size:11px;border:1px solid #557cbf;font-family:ElliotSans-Medium;padding:5px;border-radius:8px}.button-detail[data-v-7feffef3]{background-color:#557cbf;max-width:97px;height:30px;border-radius:8px}.button-detail[data-v-7feffef3]:hover{background-color:#0069d9}.title-button-detail[data-v-7feffef3]{font-size:10px;color:#fff;font-family:ElliotSans-Medium}@media (max-width:330.98px){.title-button-detail[data-v-7feffef3]{margin-top:-5px}.button-detail[data-v-7feffef3]{height:30px}}@media (max-width:375.98px){.title-date[data-v-7feffef3]{margin-top:-10px}}@media (max-width:464.98px){.text-date[data-v-7feffef3]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:center;justify-content:center}.title-book[data-v-7feffef3]{min-height:55px!important}.title-penyelenggara[data-v-7feffef3]{min-height:40px!important}}@media (max-width:575.98px){.button-detail[data-v-7feffef3]{height:20px}.title-button-detail[data-v-7feffef3]{margin-top:-3px}.title-date[data-v-7feffef3]{padding:3px;margin-top:-10px}.title-book[data-v-7feffef3]{min-height:35px}.title-penyelenggara[data-v-7feffef3]{min-height:40px}}@media (max-width:767.98px){.card[data-v-7feffef3]{min-height:100%;margin-bottom:5px}.img-fluid[data-v-7feffef3]{min-height:100px}.title-date[data-v-7feffef3]{min-height:0!important;padding:3px}}@media (min-width:768px){.card[data-v-7feffef3]{min-height:100%;margin-bottom:5px}.img-fluid[data-v-7feffef3]{min-height:100px}.title-penyelenggara[data-v-7feffef3]{min-height:35px}.title-book[data-v-7feffef3]{min-height:55px}}@media (max-width:1199.98px){.title-date[data-v-7feffef3]{min-height:40px}}img[lazy=loading][data-v-7feffef3]{background-color:#c2c2c2}img[lazy=error][data-v-7feffef3]{background-color:#906969}",""])},684:function(t,e,n){"use strict";n.r(e);n(6),n(4),n(3),n(2),n(5);var r=n(0),f=n(118),o=n(50),d=n.n(o),l=n(56);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h={name:"UjianComponent",components:{ContentLoader:f.a},data:function(){return{pathBanner:"https://storage.googleapis.com/edutore-cdn/tryout/",v:8}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)({items:function(t){return t.ujian.ujians},showDatas:function(t){return t.ujian.showDatas}})),mounted:function(){this.$store.dispatch("ujian/getUjians")},methods:{_formatDate:function(t){return d()(t).format("DD MMM YYYY")}}},m=(n(570),n(19)),component=Object(m.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row mb-3"},[n("div",{staticClass:"col-md-12"},[t.showDatas?n("div",{staticClass:"row"},t._l(t.items,(function(e){return n("div",{key:e._id,staticClass:"col-md-3 col-6",staticStyle:{"margin-top":"24px"}},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-body"},[n("div",{staticClass:"text-center",staticStyle:{"margin-bottom":"10px"}},[e.ujian_banner?n("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathBanner+e.ujian_banner,expression:"pathBanner + item.ujian_banner",modifiers:{container:!0}}],staticClass:"img-fluid",attrs:{alt:e.ujian_banner}}):n("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathBanner+"edutore.jpg",expression:"pathBanner + 'edutore.jpg'",modifiers:{container:!0}}],staticClass:"img-fluid",attrs:{alt:"'Edutore'"}})]),t._v(" "),n("p",{staticClass:"card-title title-book"},[t._v("\n                "+t._s(e.judul_ujian)+"\n              ")]),t._v(" "),e.is_private?n("div",[n("i",{staticClass:"fa fa-lock"}),t._v(" "),n("span",{staticClass:"badge badge-pill badge-primary"},[t._v(" Ujian ")])]):n("div",[n("i",{staticClass:"fa fa-users"}),t._v(" "),n("span",{staticClass:"badge badge-pill badge-primary"},[t._v(" Ujian ")])]),t._v(" "),n("p",{staticClass:"card-text title-penyelenggara"},[t._v("\n                "+t._s(e.penyelenggara)+"\n              ")]),t._v(" "),n("div",{staticStyle:{}},[n("p",{staticClass:"text-center title-date"},[n("i",{staticClass:"fa fa-calendar-alt"}),t._v("\n                  "+t._s(t._formatDate(e.start_date))+"\n                  "),n("span",{staticClass:"text-date"},[t._v("( "+t._s(e.times)+"-"+t._s(e.end_times)+")")])])]),t._v(" "),n("div",{staticClass:"text-center"},["BERSAMA"==e.type_ujian?n("router-link",{staticClass:"btn button-detail",attrs:{to:{path:"/ujian/"+e.ujian_slug,query:{slug:e.ujian_slug,id:e._id,publisher:e.penyelenggara}}}},[n("p",{staticClass:"text-center title-button-detail"},[t._v("\n                    Lihat Detail\n                  ")])]):n("router-link",{staticClass:"btn button-detail",attrs:{to:{path:"/ujian/mandiri/"+e.ujian_slug,query:{slug:e.ujian_slug,id:e._id,publisher:e.penyelenggara}}}},[n("p",{staticClass:"text-center title-button-detail"},[t._v("\n                    Lihat Detail\n                  ")])])],1)])])])})),0):n("div",{staticClass:"row"},t._l(t.v,(function(i){return n("div",{key:i,staticClass:"col-md-3"},[n("content-loader",{attrs:{height:475,width:400,speed:2,"primary-color":"#f3f3f3","secondary-color":"#ecebeb"}},[n("rect",{attrs:{x:"12",y:"210",rx:"4",ry:"4",width:"269",height:"13"}}),t._v(" "),n("rect",{attrs:{x:"-51",y:"-223",rx:"5",ry:"5",width:"416",height:"416"}}),t._v(" "),n("rect",{attrs:{x:"37.56",y:"317.61",rx:"0",ry:"0",width:"316",height:"7.53"}}),t._v(" "),n("rect",{attrs:{x:"11",y:"237",rx:"4",ry:"4",width:"269",height:"13"}}),t._v(" "),n("rect",{attrs:{x:"37.56",y:"335.61",rx:"0",ry:"0",width:"316",height:"7.53"}}),t._v(" "),n("rect",{attrs:{x:"38.56",y:"356.61",rx:"0",ry:"0",width:"316",height:"7.53"}}),t._v(" "),n("rect",{attrs:{x:"37.56",y:"376.61",rx:"0",ry:"0",width:"316",height:"7.53"}})])],1)})),0)])])])}),[],!1,null,"7feffef3",null);e.default=component.exports}}]);