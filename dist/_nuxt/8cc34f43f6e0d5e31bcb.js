(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{386:function(t,e,r){var content=r(569);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(21).default)("40537289",content,!0,{sourceMap:!1})},568:function(t,e,r){"use strict";var n=r(386);r.n(n).a},569:function(t,e,r){(t.exports=r(20)(!1)).push([t.i,".card[data-v-6ace97c8]{min-height:376px;width:100%;box-shadow:0 4px 8px rgba(0,0,0,.5);margin-bottom:24px}.card[data-v-6ace97c8],.img-fluid[data-v-6ace97c8]{border-radius:12px}.img-fluid[data-v-6ace97c8]{max-height:218px;min-height:218px}.title-book[data-v-6ace97c8]{font-size:13px;color:#404040;font-family:ElliotSans-Medium;min-height:40px}.title-penyelenggara[data-v-6ace97c8]{font-size:12px;color:grey;font-family:ElliotSans-Medium;min-height:0!important}.title-date[data-v-6ace97c8]{color:#557cbf;font-size:11px;border:1px solid #557cbf;font-family:ElliotSans-Medium;padding:5px;border-radius:8px}.button-detail[data-v-6ace97c8]{background-color:#557cbf;max-width:97px;height:30px;border-radius:8px}.button-detail[data-v-6ace97c8]:hover{background-color:#0069d9}.title-button-detail[data-v-6ace97c8]{font-size:10px;color:#fff;font-family:ElliotSans-Medium}@media (max-width:330.98px){.title-button-detail[data-v-6ace97c8]{margin-top:-5px}.button-detail[data-v-6ace97c8]{height:30px}}@media (max-width:375.98px){.title-date[data-v-6ace97c8]{margin-top:-10px}}@media (max-width:464.98px){.text-date[data-v-6ace97c8]{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:center;justify-content:center}.title-book[data-v-6ace97c8]{min-height:55px!important}.title-penyelenggara[data-v-6ace97c8]{min-height:40px!important}}@media (max-width:575.98px){.button-detail[data-v-6ace97c8]{height:20px}.title-button-detail[data-v-6ace97c8]{margin-top:-3px}.title-date[data-v-6ace97c8]{padding:3px;margin-top:-10px}.title-book[data-v-6ace97c8]{min-height:35px}.title-penyelenggara[data-v-6ace97c8]{min-height:40px}}@media (max-width:767.98px){.card[data-v-6ace97c8]{min-height:100%;margin-bottom:5px}.img-fluid[data-v-6ace97c8]{min-height:100px}.title-date[data-v-6ace97c8]{min-height:0!important;padding:3px}}@media (min-width:768px){.card[data-v-6ace97c8]{min-height:100%;margin-bottom:5px}.img-fluid[data-v-6ace97c8]{min-height:100px}.title-penyelenggara[data-v-6ace97c8]{min-height:35px}.title-book[data-v-6ace97c8]{min-height:55px}}@media (max-width:1199.98px){.title-date[data-v-6ace97c8]{min-height:40px}}img[lazy=loading][data-v-6ace97c8]{background-color:#c2c2c2}img[lazy=error][data-v-6ace97c8]{background-color:#906969}",""])},675:function(t,e,r){"use strict";r.r(e);r(6),r(4),r(3),r(2),r(5);var n=r(0),c=r(118),o=r(50),d=r.n(o),l=r(56);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var h={name:"HomePage",components:{ContentLoader:c.a},data:function(){return{pathBanner:"https://storage.googleapis.com/edutore-cdn/tryout/",v:8}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)({items:function(t){return t.quiz.quizs},showDatas:function(t){return t.quiz.showDatas}})),mounted:function(){this.$store.dispatch("quiz/getQuiz")},methods:{_formatDate:function(t){return d()(t).format("DD MMM YYYY")}}},x=(r(568),r(19)),component=Object(x.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row mb-3"},[r("div",{staticClass:"col-md-12"},[t.showDatas?r("div",{staticClass:"row"},t._l(t.items,(function(e){return r("div",{key:e._id,staticClass:"col-6 col-xm-6 col-md-3",staticStyle:{"margin-top":"24px"}},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-body"},[r("div",{staticClass:"text-center",staticStyle:{"margin-bottom":"10px"}},[e.quiz_banner?r("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathBanner+e.quiz_banner,expression:"pathBanner + item.quiz_banner",modifiers:{container:!0}}],staticClass:"img-fluid",attrs:{alt:e.quiz_banner}}):r("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathBanner+"edutore.jpg",expression:"pathBanner + 'edutore.jpg'",modifiers:{container:!0}}],staticClass:"img-fluid",attrs:{alt:"'Edutore'"}})]),t._v(" "),r("p",{staticClass:"card-title title-book"},[t._v("\n                "+t._s(e.judul_quiz)+"\n              ")]),t._v(" "),e.is_private?r("div",[r("i",{staticClass:"fa fa-lock"}),t._v(" "),r("span",{staticClass:"badge badge-pill badge-primary"},[t._v(" Quiz ")])]):r("div",[r("i",{staticClass:"fa fa-users"}),t._v(" "),r("span",{staticClass:"badge badge-pill badge-primary"},[t._v(" Quiz ")])]),t._v(" "),r("p",{staticClass:"card-text title-penyelenggara"},[t._v("\n                "+t._s(e.penyelenggara)+"\n              ")]),t._v(" "),r("div",{staticStyle:{}},[r("p",{staticClass:"text-center title-date"},[r("i",{staticClass:"fa fa-calendar-alt"}),t._v("\n                  "+t._s(t._formatDate(e.start_date))+"\n                  "),r("span",{staticClass:"text-date"},[t._v("( "+t._s(e.times)+"-"+t._s(e.end_times)+")")])])]),t._v(" "),r("div",{staticClass:"text-center"},[r("router-link",{staticClass:"btn button-detail",attrs:{to:{path:"/quiz/"+e._id,query:{slug:e.quiz_slug,publisher:e.penyelenggara,id:e._id}}}},[r("p",{staticClass:"text-center title-button-detail"},[t._v("\n                    Lihat Detail\n                  ")])])],1)])])])})),0):r("div",{staticClass:"row mt-4 pt-3"},t._l(t.v,(function(i){return r("div",{key:i,staticClass:"col-md-3"},[r("content-loader",{attrs:{height:475,width:400,speed:2,"primary-color":"#f3f3f3","secondary-color":"#ecebeb"}},[r("rect",{attrs:{x:"12",y:"210",rx:"4",ry:"4",width:"269",height:"13"}}),t._v(" "),r("rect",{attrs:{x:"-51",y:"-223",rx:"5",ry:"5",width:"416",height:"416"}}),t._v(" "),r("rect",{attrs:{x:"37.56",y:"317.61",rx:"0",ry:"0",width:"316",height:"7.53"}}),t._v(" "),r("rect",{attrs:{x:"11",y:"237",rx:"4",ry:"4",width:"269",height:"13"}}),t._v(" "),r("rect",{attrs:{x:"37.56",y:"335.61",rx:"0",ry:"0",width:"316",height:"7.53"}}),t._v(" "),r("rect",{attrs:{x:"38.56",y:"356.61",rx:"0",ry:"0",width:"316",height:"7.53"}}),t._v(" "),r("rect",{attrs:{x:"37.56",y:"376.61",rx:"0",ry:"0",width:"316",height:"7.53"}})])],1)})),0)])])])}),[],!1,null,"6ace97c8",null);e.default=component.exports}}]);