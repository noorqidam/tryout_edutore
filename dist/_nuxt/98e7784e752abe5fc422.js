(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{316:function(t,e){},317:function(t,e,n){"use strict";var o=n(15),r=n(170)(6),c="findIndex",d=!0;c in[]&&Array(1)[c]((function(){d=!1})),o(o.P+o.F*d,"Array",{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(67)(c)},356:function(t,e,n){var content=n(499);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("2f4ec458",content,!0,{sourceMap:!1})},498:function(t,e,n){"use strict";var o=n(356);n.n(o).a},499:function(t,e,n){(t.exports=n(20)(!1)).push([t.i,"h2[data-v-42281dac],p[data-v-42281dac]{color:#000}.brand[data-v-42281dac]{height:40px;width:auto}.bd-links[data-v-42281dac]{padding-top:1px;padding-bottom:1rem;margin-right:-15px;margin-left:5px}.flex-container[data-v-42281dac]{padding:0;margin:auto;list-style:none;display:-webkit-box;display:-webkit-flex;float:left;display:flex;justify-content:space-around}.flex-item[data-v-42281dac]{background-color:grey;padding:5px;width:40px;height:40px;margin-top:10px;margin-left:4px;margin-right:1px;line-height:30px;color:#fff;font-weight:700;font-size:20px;-webkit-box-pack:center;justify-content:center;text-align:center;cursor:pointer}.item_active[data-v-42281dac]{background:#557cbe}.sessi-active[data-v-42281dac]{color:#3aa03a}.img-fluid[data-v-42281dac]{max-width:40%}.img-fluid[data-v-42281dac],.img-fluidphoto[data-v-42281dac]{height:auto}.bg-blues[data-v-42281dac]{background-color:#fff;border-bottom:1px solid #bbb}.btn-block[data-v-42281dac]{border-radius:8px}.detail-profile[data-v-42281dac]:hover{background-color:#007bff}.text-dropdown[data-v-42281dac]{color:#fff;margin:10px}.navbar-brand[data-v-42281dac]{width:200px}.content-body[data-v-42281dac]{padding-top:.5rem;margin-top:4rem}",""])},635:function(t,e,n){"use strict";n.r(e);n(6),n(4),n(3),n(2),n(5),n(317);var o=n(0),r=n(315),c=n.n(r),d=n(50),l=n.n(d),m=n(56);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var f={name:"WaitingRoom",data:function(){return{modalShow:!1,showtimer:!1,showButtonStart:!1,next_sesi:"",sesi_ujian:"",ujian_id:"",realtimeserver:null,jadwalsesi:{},start_time_in:"",judul_ujian:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(m.b)({photo:function(t){return t.auth.photo},user:function(t){return t.auth.user}})),mounted:function(){var t=this;this.$store.dispatch("auth/getAuth"),history.pushState(null,null,location.href),window.onpopstate=function(){t._actionModalOut(),history.go(1)},this.next_sesi=this.$route.query.sesi_id,this.ujian_id=this.$route.query.ujian_id,this.judul_ujian=this.$route.query.judul_ujian,this._actionGetJadwalSesiUjian(this.ujian_id)},methods:{_actionGetRealtimeCurrenttimeServer:function(){c()("https://api-tryout.edutore.net").on("show_timer",function(data){data&&(this.realtimeserver=data)}.bind(this))},_actionModalOut:function(){this.modalShow=!0},_actionLogout:function(){clearInterval(this.countDowntime),this.$router.push({path:"/"}),this.modalShow=!1},_actionGetJadwalSesiUjian:function(t){var e=this;this.$axios.get("jadwal-sesi-ujian/"+t).then((function(t){e.jadwalsesi=t.data.data;var n=t.data.data.schedule;n.sort((function(a,b){return a.position>b.position?1:b.position>a.position?-1:0})),n.forEach((function(element){if(element.sesi_id===e.next_sesi){e.start_time_in=element.start_time,e.sesi_ujian=element.sesi_ujian;var t=l()(),o=l()().format("YYYY-MM-DD"),r=e.start_time_in.substring(0,2),c=e.start_time_in.substring(3,5);console.log(r+":"+c);var d=l()(o).add(r,"h").add(c,"m");console.log("Sesi di mulai pada "+l()(d).format("YYYY-MM-DD HH:mm")),console.log("bandingkan "+l()(t).format("YYYY-MM-DD HH:mm")+"="+l()(d).format("YYYY-MM-DD HH:mm"));var m=l()(d).add(element.duration,"m");if(console.log("Max Pengerjaan sampai "+l()(m).format("YYYY-MM-DD HH:mm")),l()(t).isAfter(d)&&l()(m).isAfter(t))e.showButtonStart=!0;else if(l()(t).isBefore(d)){console.log("Is after "+t+"="+d),e._actionGetRealtimeCurrenttimeServer(),e.showtimer=!0;var h=d;e._counterTimes(h)}else if(l()(m).isBefore(t)){var f=n,v=f.length-1,_=f.findIndex((function(t){return t.sesi_id===e.next_sesi}));if(_===v)console.log("tidak ada sesi lanjutan"),e.$swal({icon:"error",title:"Oops...",text:"Waktu Sudah Habis"}),e.$router.push({path:"/start-ujian/finish",query:{ujian_id:e.ujian_id,judul_ujian:e.judul_ujian}});else{console.log(" sesi sekarang di position "+_);var w=_+1;console.log("ada sesi berikut nya "+w);var j=f[w];console.log("ada sesi berikut nya "+JSON.stringify(j)),e.next_sesi=j}}}}))}))},_counterTimes:function(t){var e=this;clearInterval(this.countDowntime),this.countDowntime=setInterval((function(){var n=l()(t)-l()(e.realtimeserver),o=Math.floor(n%864e5/36e5),r=Math.floor(n%36e5/6e4),c=Math.floor(n%6e4/1e3);document.getElementById("hour").innerHTML=o>0?o+" Jam :":null,document.getElementById("minute").innerHTML=r>0?r+" Menit :":null,document.getElementById("second").innerHTML=c+" Detik";var d=e;o<0&&r<0&&c<0&&(clearInterval(e.countDowntime),d.showtimer=!1,d.showButtonStart=!0)}),1e3)},startUjian:function(){clearInterval(this.countDowntime),window.href="",this.$router.push({path:"/start-ujian/bersama/",params:{id:this.ujian_id},query:{type:"bersama",_id:this.ujian_id,sesi_ujian:this.next_sesi}})}}},v=(n(498),n(19)),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("b-modal",{attrs:{size:"md",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.modalShow,callback:function(e){t.modalShow=e},expression:"modalShow"}},[o("div",{staticClass:"row justify-content-center"},[o("div",{staticClass:"col-md-12 justify-content-center"},[o("h3",{staticClass:"text-center"},[t._v("\n          Apakah anda yakin mau keluar dari tes ?\n        ")])]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col md-6"},[o("button",{staticClass:"btn btn-warning btn-lg btn-block",staticStyle:{width:"120px"},on:{click:function(e){t.modalShow=!1}}},[t._v("\n            Tidak\n          ")])]),t._v(" "),o("div",{staticClass:"col md-6"},[o("button",{staticClass:"btn btn-primary btn-lg btn-block",staticStyle:{width:"120px"},on:{click:t._actionLogout}},[t._v("\n            Ya\n          ")])])])])]),t._v(" "),o("nav",{staticClass:"navbar navbar-expand-sm navbar-light bg-blues is-desktop fixed-top"},[o("div",{staticClass:"align-items-end"},[o("a",{staticClass:"navbar-brand",on:{click:t._actionModalOut}},[o("img",{staticClass:"img-fluid",attrs:{src:n(57),alt:"~/assets/img/edutore.png"}})])])]),t._v(" "),o("div",{staticClass:"content-body"},[o("div",{staticClass:"row flex-xl-nowrap2"},[o("div",{staticClass:"bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12"},[o("nav",{staticClass:"bd-links d-none d-md-block text-center",attrs:{id:"bd-docs-nav","aria-label":"Main navigation"}},[o("div",{staticClass:"mt-0"},[o("div",{staticStyle:{width:"70%",height:"auto","margin-left":"auto","margin-right":"auto","margin-top":"5px"}},[o("b-img",{attrs:{src:t.photo,alt:t.user,thumbnail:"",fluidphoto:""}})],1)]),t._v(" "),o("div",{attrs:{target:"_self"}},[o("a",{staticClass:"bd-toc-link",attrs:{href:"/",target:"_self"}},[t._v(t._s(t.user))])])])]),t._v(" "),o("div",{staticClass:"bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5"},[o("div",{staticClass:"clearfix d-block"}),t._v(" "),o("main",{staticClass:"bd-main pt-2",attrs:{id:"soals"}},[t.showButtonStart?o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-12"},[o("h2",{staticClass:"h2 text-center"},[t._v("\n                Silahkan Klik tombol Start untuk memulai Sesi\n                "),o("br"),t._v(t._s(t.sesi_ujian)+"\n              ")])]),t._v(" "),o("div",{staticClass:"col-md-12"},[o("div",{staticClass:"row justify-content-center"},[o("div",{staticClass:"col-md-3"},[o("router-link",{staticClass:"btn btn-block btn-primary",attrs:{to:{path:"/start-ujian/bersama/",params:{id:t.ujian_id},query:{type:"bersama",_id:t.ujian_id,sesi_ujian:t.next_sesi}}}},[o("font-awesome-icon",{attrs:{icon:"play"}}),t._v("\n                    Mulai\n                  ")],1)],1)])])]):o("div",[o("h2",{staticClass:"h2 text-center"},[t._v("\n              Menunggu Sesi Ujian Berikutnya\n              "),o("br"),t._v("\n              "+t._s(t.sesi_ujian)+"\n              "),o("br")]),t._v(" "),o("h4",{staticClass:"h3 text-center"},[t._v("\n              dimulai pada jam "),o("font-awesome-icon",{attrs:{icon:"clock"}}),t._v(" "+t._s(t.start_time_in)+"\n            ")],1)]),t._v(" "),o("div",{staticClass:"row justify-content-center timer"},[t.showtimer?o("div",{staticClass:"text-center sub-timer"},[o("span",{staticClass:"hours text-timer",attrs:{id:"hour"}}),t._v(" "),o("span",{staticClass:"minutes text-timer",attrs:{id:"minute"}}),t._v(" "),o("span",{staticClass:"seconds text-timer",attrs:{id:"second"}})]):t._e()])])])])])],1)}),[],!1,null,"42281dac",null);e.default=component.exports}}]);